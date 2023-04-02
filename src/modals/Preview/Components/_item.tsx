import { useState } from "react";
import { Avatar, Text, Media, Button, Icon, Box, Flex } from "brainly-style-guide";
import Attachments from "./_attachments";
import reportMenu from "@modals/Report/report";

export default function Item({ id, data, users, type }) {
  const [commentVis, setVis] = useState(false);
  const [iconStr, setStr] = useState("comment_outlined");
  let user = userById(users, data.user_id);
  let userId = `https://brainly.com/profile/${user.nick}-${user.id}`;
  let content = data.content;
  let reported = data.settings.is_marked_abuse;

  return (
    <Box 
      border 
      className = {
        `item id-${id} ${data.settings.is_marked_abuse ? "reported" : ""}` + "sg-flex sg-flex--column" 
      }
      padding = "s"
      style = {{ marginBottom: "8px" }}
    >
      <Media
        noPadding
        small
        className = "sg-flex sg-flex--align-items-center"
        aside={
          <Avatar
            imgSrc={user.avatar?.[64] || null}
            link= {userId}
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
      <Text breakWords className = "content" dangerouslySetInnerHTML={{ __html: content }}/>
      <Attachments attachments = {data.attachments} />
      <Flex
        direction = "row"
        justifyContent="flex-end"
        className="preview-actions"
        style={{ gap:"4px" }}
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
                  <Icon color="icon-red-50" size={24} type="report_flag"/> :
                  <Icon color="adaptive" size={24} type="report_flag_outlined"/>
              }
              iconOnly
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
          (type === "task" && !data.settings.is_deleted) ? (
            <Button
              icon={<Icon color="adaptive" type="plus"/>}
              target="_blank"
              disabled={data.responses >= 2}
              onClick={()=> {
                document.querySelector("#modal.preview").remove();
              }}
              type={"button"}
              variant="outline"
              href = {`https://brainly.com/question/${id}?answering=true`}
            >
          Answer
            </Button>
          ) : ""
        }
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
        link={`https://brainly.com/app/profile/${user.id}`}
        size="xs"
      />
      <Text size="small" breakWords>{data.content}</Text>
      {
        !data.is_marked_abuse && data.can_mark_abuse ? (
          <Button
            className = "rep-button"
            icon={<Icon color="adaptive" size={16} type="report_flag_outlined"/>}
            iconOnly
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