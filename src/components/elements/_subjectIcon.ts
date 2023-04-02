import { SubjectIconType } from "brainly-style-guide";
import clsx from "clsx";

export type iconTypes = {
  size: "small" | "medium" | "normal",
  type: SubjectIconType,
  color: 
  | "adaptive" 
  | "black" 
  | "white" 
  | "blue-50" 
  | "green-50" 
  | "indigo-50" 
  | "yellow-50" 
  | "gray-50" 
  | "gray-40" 
  | "gray-70"
}

export default (data:iconTypes):HTMLElement => {
  let icon = document.createElement("svg");

  icon.classList.add(...clsx({
    [`sg-subject-icon sg-subject-icon--icon-${data.color} sg-subject-icon--${data.size}`] : true
  }).split(" "));
  
  icon.innerHTML = /*html*/`<use xlink:href="#icon-subject-${data.type}"></use>`;
    
  return icon;
};