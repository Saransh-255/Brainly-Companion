import { addSpinner } from "@lib/spinner";
import clsx from "clsx";
import iconElem, { IconTypes } from "./_icon";

import { ButtonPropsType } from "brainly-style-guide";

export default (data: {
  text?: string,
  icon?: IconTypes,
  type: ButtonPropsType["variant"],
  size: "l" | "m" | "s",
  loading?: boolean,
  disabled?: boolean,
  classes?: string[],
  href?: string,
  iconOnly: boolean,
  id?: string,
  attributes?:{
    item:string, 
    value:string
  }[]
  clickEvent?: (e) => void,
}) => {
  let button : HTMLElement;

  if (data.href) {
    button = document.createElement("a");
    (<HTMLAnchorElement>button).href = data.href;
    (<HTMLAnchorElement>button).target = "_blank";
  } else {
    button = document.createElement("button");
  }

  button.classList.add(...clsx({
    [`sg-button sg-button--${data.type} sg-button--${data.size}`] : true,
    ["sg-button--disabled"] : data.disabled,
    ["sg-button--loading"] : data.loading,
    
  }).split(" "));

  data.classes && button.classList.add(...data.classes);
  button.onclick = data.clickEvent ?? null;

  data.attributes?.forEach(item => button.setAttribute(item.item, item.value));

  button.id = data.id ?? "";

  data.loading && addSpinner(button, "white", "small");

  if (data.icon) { 
    button.insertAdjacentElement("afterbegin", iconElem(data.icon));
    
    if (!data.iconOnly) button.querySelector(".sg-icon").classList.add("sg-button__icon");
    else button.classList.add("sg-button--icon-only");
  }
  data.text && button.insertAdjacentHTML("beforeend",
    `<span class="sg-button__text">${data.text}</span>`
  );

  return button;
};