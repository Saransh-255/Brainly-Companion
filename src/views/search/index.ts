import { buttonElem } from "@components";
import getId from "@lib/getId";
import observeMutation from "@lib/observeMutation";
import runForElem from "@lib/runForElem";
import showPreview from "@modals/Preview/Preview";
import site from "@lib/market";

runForElem(
  "[data-testid='search_stream_wrapper']",
  () => {
    observeMutation({
      target: site.locals.market === "us" ?
        "[data-testid='search_tabs_container']" : "#main-content[role='main']",
      hookInterval: 0,
      settings: {
        attributes: false,
        childList: true,
        subtree: true,
        characterData: false
      },
      itemFn: () => {
        let mutateArr = Array.from(document.querySelectorAll("[data-testid='search_stream_wrapper']"));

        observeMutation({
          target: mutateArr[1],
          hookInterval: 0,
          itemFn: () => {
            mutateArr.forEach(elem => {
              Array.from(elem.querySelectorAll("[data-testid='search-item-facade-wrapper']"))
                .forEach((item: HTMLElement) => {
                  if (item.dataset.modified) return;
                  item.dataset.modified = "true";

                  let id = getId(
                    (item.querySelector("a.sg-text") as HTMLAnchorElement).href,
                    "question"
                  );

                  item.querySelector(".sg-flex .sg-flex:nth-child(2)").appendChild(
                    buttonElem({
                      iconOnly: true,
                      icon: {
                        type: "seen",
                        color: "icon-gray-50",
                        size: 24
                      },
                      type: "transparent",
                      size: "m",
                      attributes: [{
                        item: "style",
                        value: "margin-left: 0px!important"
                      }],
                      clickEvent: () => {
                        showPreview(id);
                      }
                    })
                  );
                });
            });
          },
          settings: {
            attributes: false,
            childList: true,
            subtree: true,
            characterData: false
          }
        });
      }
    });
  }
);