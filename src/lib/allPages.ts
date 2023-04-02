import { makeChunks } from "./arrOps";
import parsePage from "./parsePage";

export default async function allPages(
  pgCount: number | string,
  url: (page:string|number) => string,
  pageFn: (doc:Document) => boolean,
  chunkCount: number
) {
  let run = true;
  let page;

  //if selector is passed
  if (typeof pgCount === "string") {
    let fpg = await parsePage(url(1))
      .then(doc => +doc.querySelector(pgCount + "").innerHTML)
      .then(pg => {
        return (pg); 
      });
    pgCount = fpg;
  }
  
  const chunks = makeChunks([...Array(pgCount).keys()], chunkCount);

  for await (const chunk of chunks) {
    if (!run) break;
    await Promise.all(
      chunk.map(async num => {
        num++;
  
        const pageDom = await parsePage(url(num));
        run = pageFn(pageDom);
      })
    );
  }
  return page;
}