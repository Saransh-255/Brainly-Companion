import { box, icon } from "@components";
import observeMutation from "@lib/observeMutation";
import runForElem from "@lib/runForElem";
import site from "@lib/market";
import locals from "@config/localization";
import PickColor from "@modals/Color/Color";

export default function gameBox() {
  function addGbButs(elem: HTMLElement) {
    if (document.querySelector(".comp-gb")) return;

    elem.insertAdjacentHTML("afterend", "<div class = 'sg-box comp-gb'></div>");
    const gbox = document.querySelector(".comp-gb");

    gbox.appendChild(
      gBoxElem(locals.answering, "#133191", "star", `${site.url}/companion/answering`)
    );
    gbox.appendChild(
      gBoxElem(locals.modals.theme.title, "#000000", "globe", "", PickColor)
    );
    gbox.appendChild(
      box({
        padding: "s",
        border: true,
        borderColor: "gray-20",
        borderRadius: true,
        classes: ["sg-flex cws-rate tooltip"],
        children: (
          `<img src="https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg">`
        ),
        attributes: [{
          key: "data-tooltip",
          value: locals.rate
        }],
        // eslint-disable-next-line max-len
        href: "https://chromewebstore.google.com/detail/brainly-companion/cplddgdncahafjjpimjjbghigkeabiod"
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