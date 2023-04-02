import React from "react";
import ReactDOM from "react-dom/client";

export default function createPage(
  page: React.ReactNode,
  title?: string
) {
  document.querySelector("html").insertAdjacentHTML("afterbegin", `<div class = "companion-app"></div>`);
  
  let root = ReactDOM.createRoot(document.querySelector(".companion-app"));
  root.render(page);

  window.onload = () => {
    document.title = title || "Brainly Companion";
  };
}