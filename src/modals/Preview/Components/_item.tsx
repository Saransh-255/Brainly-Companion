import { useState } from "react";
import { Avatar, Text, Media, Button, Icon, Box, Flex } from "brainly-style-guide";
import Attachments from "./_attachments";
import Verified from "./_verifiedHead";
import reportMenu from "@modals/Report/report";
import local from "@config/localization";
import site from "@lib/market";
import clsx from "clsx";
import ToLatex from "@lib/_toLatex";
import { Legacy } from "@lib/api/brainly";

export default function Item({ id, data, users, type }) {
  const [commentVis, setVis] = useState(false);
  const [iconStr, setStr] = useState("comment_outlined");
  const [thank, setThank] = useState(false);
  const [tyCount, setCount] = useState(data.thanks);

  let user = userById(users, data.user_id);
  let userId = `${site.url}/app/profile/${user.id}`;
  let content: string = data.content;
  let reported = data.settings.is_marked_abuse;

  return (
    <Box 
      border 
      className = {
        clsx({
          [`item id-${id} sg-flex sg-flex--column`]: true,
          ["reported"]: data.settings.is_marked_abuse,
          ["approved"]: data.approved?.approver
        })
      }
      padding = "s"
      style = {{ marginBottom: "8px" }}
    >
      {
        !!(type !== "task" && data.approved.approver) && (
          <Verified Approver={data.approved.approver} />
        )
      }
      <Media
        noPadding
        small
        className = "sg-flex sg-flex--align-items-center"
        aside={
          <Avatar
            imgSrc={user.avatar?.[64] || null}
            link= {userId}
            target="_blank"
          />}
        contentArray={[
          <Text 
            weight="bold"
          >
            {user.nick}
          </Text>,
                    
          <Text
            style = {{
              color: user.ranks.color,
              fontSize: "1rem",
              lineHeight: "1rem"
            }}
          >
            {user.ranks.names[0]}
          </Text>
        ]}
      />
      { 
        type === "response" ? 
          <Flex 
            className="content scroll-container"
            direction="column"
            style={{ gap:"0.5rem" }}
          >
            {
              ToLatex(content).map(item => <Text breakWords>{item}</Text>)
            }
          </Flex> : 
          <Text className="content scroll-container" breakWords dangerouslySetInnerHTML={{ __html: content }} />
      }
      <Attachments attachments = {data.attachments} />
      <Flex
        direction = "row"
        justifyContent="space-between"
        className="preview-actions"
        style={{ gap:"4px" }}
      >
        {
          !!(type === "response") && (
            <Button
              className="thank-response"
              icon={
                <Icon color="icon-red-50" size={24} type={thank ? "heart" : "heart_outlined"} > </Icon>
              } 
              variant="transparent-red"
              disabled={thank}
              style= {{ padding:"0px 16px" }}
              onClick={()=> {
                Legacy.ThankResponse(id)
                  .then(res => {
                    if (res) setCount(n => n + 1);
                  });
                setThank(true);
              }}       
            >{local.modals.preview.thank} ({tyCount})</Button>
          )
        }
        <Flex
          style={{ gap: "4px" }}
        >
          {
            data.comments.count ? (
              <Button
                className="show-comments"
                icon={<Icon color="adaptive" size={24} type={iconStr} > </Icon>} 
                variant="transparent-light"
                style= {{ padding:"0px 16px" }}
                onClick={()=> {
                  setVis(!commentVis); 
                  setStr(iconStr == "comment_outlined" ? "comment" : "comment_outlined");
                }}       
              >{data.comments.items.length}</Button>
            ) : ""
          }
          {
            !data.settings.is_deleted ? (
              <Button
                className = "report-button"
                icon={
                  reported ?  
                    <Icon color="icon-red-50" size={24} type="report_flag" aria-label="report-icon"/> :
                    <Icon color="adaptive" size={24} type="report_flag_outlined" aria-label="report-icon" />
                }
                iconOnly
                aria-label="report-button"
                size="m"
                disabled={reported}
                variant="transparent-light"
                onClick = {(e) => {
                  reportMenu(id, type, e.target);
                }}
              /> 
            ) : ""
          }
          {
            (type === "task" && data.settings.is_answer_button) ? (
              <Button
                icon={<Icon color="adaptive" type="plus"/>}
                target="_blank"
                disabled={data.responses >= 2}
                onClick={()=> {
                  document.querySelector("#modal.preview").remove();
                }}
                type={"button"}
                variant="outline"
                href = {`${site.url}/${site.locals.question}/${id}?answering=true`}
              >
                {local.modals.preview.answer}
              </Button>
            ) : ""
          }
        </Flex>
      </Flex>
      {
        commentVis ? (
          <Flex direction="column" className="preview-comments">
            {
              data.comments.items.map(comment => {
                return <CommentItem data={comment} users={users} key={comment.id} />;
              })
            }
          </Flex>
        ) : ""
      }
    </Box>
  );
}

function CommentItem({ data, users }) {
  let user = userById(users, data.user_id);
  return (
    <Flex
      className="comment-item"
      style={{ gap:"8px" }}
      alignItems="center"
    >
      <Avatar
        imgSrc={user.avatar?.[64] || null}
        link={`${site.url}/app/profile/${user.id}`}
        size="xs"
      />
      <Text size="small" breakWords>{data.content}</Text>
      {
        !data.is_marked_abuse && data.can_mark_abuse ? (
          <Button
            className = "rep-button"
            icon={
              <Icon aria-label="report-flag" color="adaptive" size={16} type="report_flag_outlined"/>
            }
            iconOnly
            aria-label="report-button"
            size="s"
            variant="transparent-light"
            onClick = {(e) => {
              if (!document.querySelector(".loading-ext#report")) {
                reportMenu(data.id, "comment", e.target);
              }
            }}
          /> 
        ) : ""
      }
    </Flex>
  );
}

function userById(arr, user) {
  return arr.find(({ id }) => id === user);
}