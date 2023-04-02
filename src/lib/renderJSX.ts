import ReactDOM from "react-dom/client";

export default function renderJSX(
  content: JSX.Element,
  classNames: string,
  id?: string
) {
  document.body.insertAdjacentHTML("afterbegin", 
    `<div class = "comp-react ${classNames}" id=${id ?? ""}></div>`
  );

  let root = ReactDOM.createRoot(
    document.querySelector(`.${classNames.replaceAll(" ", ".")}.comp-react`)
  );
  
  root.render(content);
}