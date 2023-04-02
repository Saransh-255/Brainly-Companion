import { TextPropsType } from "brainly-style-guide";
import clsx from "clsx";

export default function (data:{
  text: string,
  color: TextPropsType["color"],
  size?: TextPropsType["size"],
  as?: TextPropsType["as"],
  weight?: TextPropsType["weight"],
  transform?: TextPropsType["transform"],
  align?: TextPropsType["align"],
  wrap?: "wrap" | "no-wrap",
  breakWords?: boolean,
  style?: string,
  variant?: "sg-headline" | "sg-text-bit"
}) {
  let Text = document.createElement(data.as || "div");
  let variant = data?.variant || "sg-text";

  Text.classList.add(...clsx({
    [`${variant}`]: true,
    [`${variant}--${data.color}`]: data.color,
    [`${variant}--${data.size}`]: data.size,
    [`${variant}--${data.weight}`]: data.weight,
    [`${variant}--${data.transform}`]: data.transform,
    [`${variant}--${data.align}`]: data.align,
    [`${variant}--${data.wrap}`]: data.wrap,
    [`${variant}--${data.breakWords ? "word-break-normal" : "break-words"}`]: data.breakWords
  }).split(" "));

  Text.setAttribute("style", data.style || "");
  Text.innerText = data.text;

  return Text;
}