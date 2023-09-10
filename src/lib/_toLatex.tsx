import { Text } from "brainly-style-guide";

export default function ToLatex(content: string): JSX.Element[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  let latex: JSX.Element[] = [];

  doc.querySelector("body").childNodes.forEach((node) => {
    if (!node.childNodes.length) return latex.push(<span>{node.textContent}</span>);

    node.childNodes.forEach(child => {
      const tex = child.textContent.replaceAll("[tex]", "").replaceAll("[/tex]", "");

      latex.push(
        child.textContent.includes("[tex]") ? (
          <img 
            src={"https://tex.z-dn.net/?f=" + encodeURIComponent(tex)}
          />
        ) : createMarkup(child.textContent, child.nodeName)
      );
    });
  });
  return latex;
}

function createMarkup(content: string, tag: string): JSX.Element {
  console.log(tag);
  if (tag === "#text") tag = "span";
  else if (tag === "EM") tag = "em";
  else if (tag === "STRONG") tag = "strong";
  else tag = "span";

  return <Text as={tag as "span" | "em" | "strong"} >{content}</Text>;
}