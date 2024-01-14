import observeMutation from "@lib/observeMutation";
import { buttonElem } from "@components";
import createModal from "@lib/createModal";
import { TextBit } from "brainly-style-guide";
import Profanity from "@config/profanity";
import Chart from "chart.js/auto";
import gameBox from "@utils/gameBox";

import locals from "@config/localization";

import ginnySB, { toggleGinnySB } from "@utils/ginnySB";
import site from "@lib/market";

gameBox();

//answering box observer
observeMutation({
  target: "div[data-testid = 'question_box_actions']",
  hookInterval: 100,
  settings: {
    attributes: false,
    childList: true,
    subtree: true,
    characterData: true
  },
  itemFn: () => {
    let answerBox = document.querySelector(".brn-answer-editor-layer") as HTMLElement;
    if (!answerBox || answerBox.dataset.modified) return;
    answerBox.dataset.modified = "true";

    const toolbar = answerBox.querySelector("div[data-testid = 'rich_text_editor_toolbar']");

    if (site.locals.market === "us") {
      ginnySB();
      toolbar.classList.add("toolbar-ginny");
      toolbar.appendChild(
        buttonElem({
          text: locals.ginny.button,
          size: "s",
          icon: {
            type: "spark",
            size: 16,
            color: "icon-black"
          },
          type: "transparent",
          iconOnly: false,
          clickEvent() {
            toggleGinnySB();
          },
          classes: ["ginny-sb-answer"]
        })
      );
    }

    toolbar.appendChild(buttonElem({
      icon: {
        type: "draw",
        size: 24,
        color: "icon-black"
      },
      type: "transparent",
      size: "m",
      iconOnly: true,
      clickEvent: () => {
        createModal({
          element: <>
            <TextBit size="small">graphing calculator</TextBit>
            <iframe 
              id="calculator" 
              src="https://www.geogebra.org/classic" 
            />
          </>,
          className: "graph",
          minWidth: "90vw"
        });
      }
    }));

    document.querySelector("div[data-testid='add_answer_box'] > div > div")
      .insertAdjacentHTML("beforeend", `
      <div class = "answer-word-count">
        <canvas id = "acount"></canvas>
        <div class = "sg-text remaining-count"></div>
      </div>
      `);
    let numChart = new Chart("acount", {
      type: "doughnut",
      data: {
        labels: ["", ""],
        datasets: [{
          label: "# of words",
          data: [0, 100],
          backgroundColor: [
            "#0089e3",
            "#e1eaf1",
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
        },
        cutout: "70%"
      }
    });
    observeMutation({
      target: "#slate-editable",
      hookInterval: 0,
      settings: {
        attributes: false,
        characterData: true,
        subtree: true,
        childList: true
      },
      itemFn: () => {
        let answerLines = document.querySelectorAll("p[data-slate-node='element'"); 
  
        document.querySelectorAll(".highlight").forEach(
          item => item.classList.remove("highlight")
        );
        let aStr = "";
        answerLines.forEach(line => {
          let texSelector = "img[data-testid='tex_image']";
          let text = "span[data-slate-string = 'true']";

          if (line.querySelector(text)) aStr += (line.querySelector(text) as HTMLElement).innerText;

          if (line.querySelector(texSelector)) {
            Array.from(line.querySelectorAll(texSelector)).forEach(tex => {
              let query = new URLSearchParams(tex.getAttribute("src").split("?")[1]);
              aStr += query.get("f");
            });
          }
          if (Profanity.test(line.innerHTML)) {
            return line.querySelector("span[data-slate-node = 'text']").classList.add("highlight");
          }
          //aStr += "<p></p>";
        });

        let count = document.querySelector(".remaining-count") as HTMLElement;
        count.innerText = "";
        if (aStr.length <= 5000) {
          numChart.data.datasets[0].backgroundColor[0] = "#0089e3";
          if (aStr.length > 4900) count.innerText = (5000 - aStr.length) + "";
          numChart.data.datasets[0].data = [aStr.length / 5000, 1 - (aStr.length / 5000)];
        } else {
          numChart.data.datasets[0].data = [1, 0];
          numChart.data.datasets[0].backgroundColor[0] = "#ff341a";
        }
        numChart.update();
      }
    });
  } 
});