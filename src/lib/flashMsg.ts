import clsx from "clsx";

export default function flashMsg(
  message:string, 
  type: "success" | "error" | "info",
  close?: () => void,
  timeout?: number
) {
  let flashbox = document.querySelector(".comp-messages-container")
    || document.querySelector(".flash-messages-container") 
    || document.querySelector("#flash-msg");

  let flashmsg = document.createElement("div");
  flashmsg.classList.add(...clsx({
    ["sg-flash sg-flash__message"]: true,
    [`sg-flash__message--${type}`]: type
  }).split(" "));

  const onClose = () => {
    flashmsg.remove();
    if (close) close();
  };
  
  flashmsg.innerHTML = /*html*/`
    <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${message}</div>
  `;

  flashmsg.addEventListener("click", onClose);
  if (timeout) setTimeout(() => onClose, timeout);
  
  flashbox.appendChild(flashmsg);
}