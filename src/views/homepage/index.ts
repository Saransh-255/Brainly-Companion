/* eslint-disable max-lines */
/* eslint-disable max-len */
import getId from "@lib/getId";
import observeMutation from "@lib/observeMutation";
import runForElem from "@lib/runForElem";
import { Legacy } from "@brainly";
import { buttonElem } from "components/elements";
import reportMenu from "@modals/Report/report";
import Preview from "@modals/Preview/Preview";
import gameBox from "@utils/gameBox";
import site from "@lib/market";
import locals from "@config/localization";
import ginnySB, { toggleGinnySB } from "@utils/ginnySB";

runForElem("meta[name='user_data']", () => {
  // Preview buttons
  observeMutation({
    target: ".js-feed-stream",
    hookInterval: 0,
    itemFn: async () => {
      const items = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");

      for await (let item of Array.from(items)) {
        if ((<HTMLElement>item).dataset.modified) continue;
        (<HTMLElement>item).dataset.modified = "true";

        let anchor: HTMLAnchorElement = item.querySelector("a[data-test=feed-item-link]");
        let questionId = +getId(anchor.href, "question");

        item.querySelector(".brn-feed-item__points > div > div")
          .insertAdjacentElement("afterbegin", buttonElem({
            size: "m",
            iconOnly: true,
            icon: {
              size: 24,
              type: "report_flag_outlined",
              color: "icon-gray-50"
            },
            type: "transparent",
            classes: ["report-flag"],
            clickEvent: (e) => {
              reportMenu(questionId, "task", e.target);
            }
          }));

        let actionMenu = document.createElement("div");
        actionMenu.classList.add("action-menu");
        item.querySelector(".brn-feed-item__footer div").insertAdjacentElement("beforeend", actionMenu);

        if (item.querySelector("a.sg-button")) {
          item.querySelector("a.sg-button").remove();

          actionMenu.insertAdjacentElement("afterbegin", buttonElem({
            type: "solid",
            icon: {
              type: "answer",
              size: 24,
              color: "icon-white"
            },
            iconOnly: true,
            href: `/${site.locals.question}/${questionId}?answering=true`,
            size: "m"
          }));
        }
        actionMenu.insertAdjacentElement("afterbegin", buttonElem({
          type: "solid-indigo",
          icon: {
            type: "seen",
            size: 24,
            color: "adaptive"
          },
          iconOnly: true,
          size: "m",
          clickEvent: () => {
            Preview(
              questionId + "",
              async () => {
                for await (let item of Array.from(items)) {
                  let anchor: HTMLAnchorElement = item.querySelector("a[data-test=feed-item-link]");
                  let question = await Legacy.GetQuestion(+getId(anchor.href, "question"));
                  if (question.data.task.settings.is_marked_abuse) {
                    item.classList.add("reported");
                    item.querySelector(".report-flag").classList.add("sg-button--disabled");
                    item.querySelector(".report-flag use").setAttribute("xlink:href", "#icon-report_flag");
                  }
                }
              }
            );
          },
          attributes: [{
            item: "style",
            value: `
            margin-right:4px;
            background: #bdc7fb;
          `
          }]
        }));

        let question = await Legacy.GetQuestion(questionId);
        if (question.data.task.settings.is_marked_abuse) {
          item.classList.add("reported");
          item.querySelector(".report-flag").classList.add("sg-button--disabled");
          item.querySelector(".report-flag use").setAttribute("xlink:href", "#icon-report_flag");
        }
      }
    },
    settings: {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }
  });
});


//game box detection
observeMutation({
  target: ".sg-layout__container",
  hookInterval: 0,
  itemFn: () => {
    if (!document.querySelector(".sg-layout__container .sg-layout__aside-content")) return;
    gameBox();
  },
  settings: {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  }
});


//ginny sidebar header
if (site.locals.market === "us") {
  runForElem(".sg-layout__container div[data-testid='feed_ask_your_question_box']", (elem) => {
    ginnySB();
  
    elem.querySelector("h1").innerText = locals.ginny.headline;
    elem.querySelector("button").remove();
  
    elem.insertAdjacentElement("beforeend", buttonElem({
      text: locals.ginny.button,
      size: "m",
      type: "solid-indigo",
      icon: {
        type: "spark",
        size: 24,
        color: "icon-white"
      },
      clickEvent: () => toggleGinnySB(),
      iconOnly: false
    }));
  });
}