import { box, icon } from "@components";
import locals from "@lib/market";
import observeMutation from "@lib/observeMutation";
import runForElem from "@lib/runForElem";
import PickColor from "@modals/Color/Color";

export default function gameBox() {

  function addGbButs(elem: HTMLElement) {
    if (document.querySelector(".comp-gb")) return;

    elem.insertAdjacentHTML("afterend", "<div class = 'sg-box comp-gb'></div>");
    const gbox = document.querySelector(".comp-gb");

    gbox.appendChild(
      gBoxElem("Answering Dashboard", "#133191", "star", `${locals.url}/companion/answering`)
    );
    gbox.appendChild(
      gBoxElem("Change Theme", "#000000", "globe", "", () => {
        PickColor();
      })
    );
  }

  const selector = "[data-testid='aside_content']";
  runForElem(selector, () => {
    observeMutation({
      target: selector,
      hookInterval: 0,
      itemFn: async () => {
        //slight delay in render, need to await the element first
        runForElem("[data-testid='game_box_inner_container']", addGbButs); //old user
        runForElem("[data-testid='game_box_intro_header']", addGbButs); //new user
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
  text: string, color: string, iconType?: string, link?: string, clickEvent?: () => void
): HTMLAnchorElement | HTMLDivElement {
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