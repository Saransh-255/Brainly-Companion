type spinnerColor = 
| "black"
| "white"
| "gray-70"
| "gray-50"
| "red-40"
| "red-50"
| "yellow-40"
| "blue-40"
| "blue-60"
| "indigo-50"
type spinnerSize = 
| "small"
| "xsmall"
| "xxsmall"

export function addSpinner(
  element: HTMLElement,
  color: spinnerColor | "black",
  size: spinnerSize | "small",
) {
  element.insertAdjacentHTML("afterbegin", /*html*/`
        <div class="sg-spinner sg-spinner--${color} sg-spinner--${size}">
            <span class="sg-visually-hidden">loading</span>
        </div>
    `);
}
export function removeSpinner(element: HTMLElement) {
  element.querySelector(".sg-spinner").remove();
}