import { box, icon } from "@components";
import observeMutation from "@lib/observeMutation";
import runForElem from "@lib/runForElem";
import PickColor from "@modals/Color/Color";

export default function gameBox() {

  //different class names for different pages
  const selector = window.location.href.includes("https://brainly.com/question") 
    ? ".js-aside-content" : ".sg-layout__aside-content";

  runForElem(selector, () => {
    observeMutation({
      target: selector,
      hookInterval: 0,
      itemFn: async () => {
      //slight delay in render, need to await the element first
        runForElem("[data-testid='game_box_current_plan']", (elem) => {
          if (document.querySelector(".comp-gb")) return;
  
          elem.insertAdjacentHTML("afterend", "<div class = 'sg-box comp-gb'></div>");
          const gbox = document.querySelector(".comp-gb");
  
          gbox.appendChild(
            gBoxElem("Answering Dashboard", "#133191", "star", "https://brainly.com/companion/answering")
          );
          gbox.appendChild(
            gBoxElem("Change Theme", "#000000", "globe", "", () => {
              PickColor();
            })
          );
        });
      },
      settings: {
        attributes: false,
        childList: true,
        subtree: false,
        characterData: false
      }
    });
  });
}

function gBoxElem(
  text:string, color:string, iconType?:string, link?:string, clickEvent?: () => void
):HTMLAnchorElement | HTMLDivElement {
  return box({
    padding: "s",
    border: true,
    borderRadius: true,
    classes: ["sg-flex tooltip"],
    href: link ?? null,
    onClick: () => clickEvent?.(),
    borderColor: "white",
    attributes: [
      {
        key: "data-tooltip",
        value: text
      },
      {
        key: "style",
        value: `background:${color}`
      }
    ],
    children: (
      icon({
        type: iconType,
        size: 16,
        color: "icon-white",
      }).outerHTML
    )
  });
}