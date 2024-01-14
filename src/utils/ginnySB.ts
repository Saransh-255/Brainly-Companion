import { buttonElem } from "@components";

import site from "@lib/market";

export default function ginnySB() {
  if (site.locals.market !== "us") return; 
  //only for US market
  const mainContainer = document.querySelector("html");
  if (mainContainer.querySelector("iframe[testid=ginny-sb]")) return;
  mainContainer.classList.add("ginny-sb-active");

  mainContainer.insertAdjacentHTML("afterbegin", /*html*/`
    <div class="ginny-sb">
    <iframe testid="ginny-sb" src="${site.url}/tutor-ai" />
    </div>
  `);

  document.querySelector(".ginny-sb").insertAdjacentElement("afterbegin", buttonElem({
    iconOnly: true,
    icon: {
      type: "close",
      size: 24,
      color: "icon-black"
    },
    type: "transparent",
    size: "m",
    classes: ["close-ginny"],
    clickEvent: () => toggleGinnySB()
  }));
}

export function toggleGinnySB() {
  document.querySelector(".ginny-sb").classList.toggle("open");
}