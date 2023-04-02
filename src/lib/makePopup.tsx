import renderJSX from "@lib/renderJSX";
import { useRef, useEffect } from "react";

export default function makePopup(elem:HTMLElement, content:React.ReactNode) {
  renderJSX(
    <>
      <div 
        className = "comp-close-area" 
        onClick = {() => document.querySelector(".comp-popup").remove()}
        style={{
          height: "100%",
          width:"100%",
          zIndex: "998"
        }}
      ></div>
      <FluidPopup 
        elem={elem} 
        content={content}
      />
    </>,
    "comp-popup sg-overlay"
  );
}

function FluidPopup({ elem, content } : { elem: HTMLElement, content: React.ReactNode }) {
  const rect = elem.getBoundingClientRect();
  const popupRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const popup = popupRef?.current;
    if (!popup) return;
    
    const resizeObserver = new ResizeObserver(() => {
      popup.setAttribute("style", `
      margin-top: 
      ${rect.y >= popup.offsetHeight ? rect.bottom : rect.y - popup.offsetHeight}px; 
      margin-left:
      ${rect.x - 1.5 * popup.offsetWidth}px`);
    });
    resizeObserver.observe(popupRef.current);
    resizeObserver.observe(document.body);
  }, []);

  return (
    <div ref={popupRef} className="comp-popup-content">
      {content}
    </div>
  );
}
