export default async function parsePage(
  url:string
) {
  const parser = new DOMParser();
  
  let page = await fetch(url).then(data => data.text());
  return parser.parseFromString(page, "text/html");
}