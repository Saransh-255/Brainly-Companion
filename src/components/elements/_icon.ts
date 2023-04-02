import { IconPropsType } from "brainly-style-guide";
import clsx from "clsx";

export type IconTypes = {
  type: IconPropsType["type"],
  size: IconPropsType["size"],
  color: IconPropsType["color"],
  classNames?: string,
  title?: string
}

export default (data:IconTypes):HTMLElement => {
  let icon = document.createElement("div");

  icon.classList.add(...clsx({
    [`sg-icon sg-icon--${data.color} sg-icon--x${data.size}`]: true,
    [data.classNames] : data.classNames
  }).split(" "));

  icon.innerHTML = /*html*/`
  <svg class="sg-icon__svg">
    <use xlink:href="#icon-${data.type}"></use>
  </svg>`;
    
  return icon;
};