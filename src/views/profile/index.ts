import { buttonElem } from "@components";
import getId from "@lib/getId";
import site from "@lib/market";
import observeMutation from "@lib/observeMutation";
import showPreview from "@modals/Preview/Preview";

observeMutation({
  target: "[data-testid = 'profile_page_content']",
  hookInterval: 0,
  settings: {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  },
  itemFn() {
    if (document.querySelector("[data-testid = 'user_content_items_placeholder']")) return;
    document.querySelectorAll("[data-testid = 'profile_page_content'] .sg-box")
      .forEach((item: HTMLElement) => {
        if (item.dataset.modified) return;
        item.dataset.modified = "true";

        const headDiv = item.querySelector("div:nth-child(1)");
        const Id = getId(
          item.querySelector(`a[href ^= '/${site.locals.question}/']`).getAttribute("href"),
          "question"
        );

        headDiv.appendChild(
          buttonElem({
            type: "solid-indigo-inverted",
            size: "m",
            iconOnly: true,
            icon: {
              type: "seen",
              size: 24,
              color: "icon-gray-50"
            },
            attributes: [{
              item: "style",
              value: "width: 50px;"
            }],
            clickEvent: () => {
              showPreview(Id);
            },
          })
        );
      });
  },
});