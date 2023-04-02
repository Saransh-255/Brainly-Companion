export default function getId(
  url: string,
  type: "question" | "profile"
) {
  if (type === "question") {
    return url
      .replace("https://brainly.com/question/", "")
      .split("?")[0];  
  } else if (type === "profile") {
    return url
      .replace("https://brainly.com/", "")
      .replace("app/", "")
      .replace("profile/", "")
      .split("/")[0]
      .split("-")[1];
  }
}