import market from "./market";

export default function getId(
  url: string,
  type: "question" | "profile"
) {

  if (type === "question") {
    return url
      .replace(`${market.url}/${market.locals.question}/`, "")
      .replace(`/${market.locals.question}/`, "")
      .split("?")[0];
  } else if (type === "profile") {
    return url
      .replace(market.url + "/", "")
      .replace("app/", "")
      .replace("profile/", "")
      .split("/")[0]
      .split("-")[1];
  }
}