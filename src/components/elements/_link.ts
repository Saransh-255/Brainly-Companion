import clsx from "clsx";

export default (data:{
  href: string,
  text: string,
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge",
  weight?: "regular" | "bold",
  transform?: "lowercase" | "uppercase" | "capitalize",
  align?: "to-center" | "to-right" | "to-left" | "justify",
  noWrap?: boolean,
  breakWords?: boolean,
  target?: "_blank" | "_self" | "_parent" | "_top",
  classNames?: string[],
  color?: "text-black" 
  | "text-white" 
  | "text-gray-70" 
  | "text-gray-60" 
  | "text-gray-50" 
  | "text-gray-40" 
  | "text-blue-60" 
  | "text-blue-40" 
  | "text-green-60" 
  | "text-green-40" 
  | "text-indigo-60" 
  | "text-indigo-40" 
  | "text-red-60" 
  | "text-red-40" 
  | "text-yellow-60" 
  | "text-yellow-40"
}) => {
  let elem = document.createElement("a") as HTMLAnchorElement;
  elem.href = data.href;
  elem.classList.add(...clsx({
    [`sg-text--${data.size}`] : data.size,
    [`sg-text sg-text--link`] : true,
    [`sg-text--${data.weight}`] : data.weight,
    [`sg-text--${data.transform}`] : data.transform,
    [`sg-text--${data.align}`] : data.align,
    [`sg-text--no-wrap`] : data.noWrap,
    [`sg-text--break-words`] : data.breakWords,
    [data.classNames.join(" ")] : data.classNames,
    [`sg-text--${data.color}`] : data.color
  }).split(" "));
  data.target && elem.setAttribute("target", data.target);

  elem.innerText = data.text;

  return elem;
};