/* eslint-disable max-len */
import runForElem from "./runForElem";
import iconStr from "@config/brainlyIcons";

export default function addStyleguides() {
  runForElem(
    "body",
    (elem) => {
      elem.insertAdjacentHTML("afterbegin", `
        <link href='https://styleguide.brainly.com/223.0.0/style-guide.css' rel='stylesheet'/>
        <div style='display:none'>${iconStr}</div>
      `);
    }
  );
}