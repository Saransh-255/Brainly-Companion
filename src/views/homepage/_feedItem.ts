/* eslint-disable indent */
import { ptsLabel, avatar, buttonElem, subjectIcon, icon } from "components/elements";

export default function feedItem({ question }) {
  let qid = atob(question.id).split(":")[1];
  let box = /*html*/`
    <div class="fyp-feed-item sg-box sg-box--transparent sg-box--no-shadow sg-box--border-radius sg-box--padding-m">

      <div class="sg-flex headrow" style = "gap: 8px">
        <a class="sg-text sg-text--link-unstyled sg-text--bold" 
          href = "https://brainly.com/question/${qid}"
        >
          <div class = "sg-text sg-text--medium sg-text--break-words fyp-content">
            ${question.content.trim().replaceAll("<br />\n", " ")}
          </div>
        </a>
        <div class="sg-flex report-pts">
          ${
            buttonElem({
              type: "transparent",
              size: "s",
              iconOnly: true,
              icon: {
                type: "report_flag_outlined",
                color: "icon-gray-50",
                size: 24
              },
              id: "rep" + qid,
              classes: ["report"]
            }).outerHTML
          }
          ${
            ptsLabel("+" + question.pointsForAnswer)
          }
        </div>
      </div>

      <div class="sg-flex info" style="position:relative">
        <div class="sg-flex user" style = "gap: 4px; height:32px;">
          ${avatar({ 
            id: atob(question.author.id).split(":")[1] + "", 
            avatarURL: question.author.avatar?.thumbnailUrl
          })}
          <div class = "sg-flex">
            ${
              subjectIcon({
                size: "medium",
                type: question.subject.icon,
                color: "adaptive"
              }).outerHTML
            }
            ${
              question.attachments.length ? icon({
                size: 24,
                type: "attachment",
                color: "icon-gray-50",
                classNames: "centerElem"
              }).outerHTML : ""
            }
          </div>
        </div>
        <div class="sg-flex fyp-buttons" style = "gap: 0.5rem">
        ${
            buttonElem({
              icon: {
                type: "seen",
                size: 24,
                color: "icon-white"
              },
              classes: ["fyp"],
              type: "solid",
              size: "m",
              iconOnly: true,
              id: "id" + qid
            }).outerHTML
          }
          ${
              buttonElem({
                icon: {
                  type: "answer",
                  size: 24,
                  color: "icon-white",
                },
                type: "solid",
                size: "m",
                iconOnly: true,
                classes: ["fyp"],
                href: `https://brainly.com/question/${qid}?answering=true`,
              }).outerHTML
            }
        </div>
      </div>
    </div>
  `;

  return box;
}