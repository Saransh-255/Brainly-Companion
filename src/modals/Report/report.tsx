import createModal from "@lib/createModal";
import { Headline } from "brainly-style-guide";
import { Legacy } from "@brainly";
import ReportReasons from "./Components/ReasonList";
import showLoading from "@lib/showLoading";
import locals from "@config/localization";

export default async function reportMenu(
  id:number,
  type: "task" | "response" | "comment",
  target,
  successFn?: () => void
) {
  if (document.querySelector(".loading-ext#report")) return;
  let reasons;
  await showLoading("Fetching Report Reasons", "report", async () => {
    reasons = await Legacy.ReportReasons(id, type);
  }, document.querySelector("#modal .sg-box"));
  createModal({
    element: (<>
      <Headline
        color="text-black"
        size="medium"
        extraBold
      >
        {locals.modals.report.title}
      </Headline>

      <ReportReasons success={successFn} target={target} reasons={reasons} id={id} type={type} key={id}/>
    </>
    ),
    className: "report",
    minWidth: "500px"
  });
}