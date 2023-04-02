import { Flex, Button, Icon } from "brainly-style-guide";
import { useState } from "react";

export default function Attachments({ attachments }) {
  const [attachment, setAttachment] = useState(0);
  if (attachments.length) return (
    <div className = "attachments">
      <div className = "attachment-view">
        <img src={attachments[attachment].full} alt="" />
        <Button 
          variant="solid-light"
          icon={<Icon color="icon-black" type="open_in_new_tab"> </Icon>}
          href={attachments[attachment].full}
          target="_blank"
          className="newtab-tool"
          iconOnly
        />
      </div>
      <SelectList 
        attachments={attachments} 
        changeAtt = {setAttachment} 
        selectedAtt = {attachment} 
      />
    </div>
  );
}

function SelectList({ attachments, changeAtt, selectedAtt }) {
  if (attachments.length > 1) return (
    <Flex className = "thumbnails">
      {
        attachments.map((item, index) => {
          return (
            <div 
              className={`attachment-thumb ${selectedAtt === index ? "selected-thumb" : ""}`}
              onClick={
                () => {
                  changeAtt(index);
                }
              }
            >
              <img id = {index} src = {item.thumbnail} />
            </div>
          );
        })
      }
    </Flex>
  );
}