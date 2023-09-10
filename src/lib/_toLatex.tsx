export default function ToLatex(content: string): JSX.Element[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  let latex: JSX.Element[] = [];

  doc.querySelector("body").childNodes.forEach((node) => {
    node.childNodes.forEach(child => {
      const tex = child.textContent.replaceAll("[tex]", "").replaceAll("[/tex]", "");

      latex.push(
        child.textContent.includes("[tex]") ? (
          <img 
            src={"https://tex.z-dn.net/?f=" + encodeURIComponent(tex)}
          />
        ) : <span>{child.textContent}</span>
      );
    });
  });

  return latex;
}