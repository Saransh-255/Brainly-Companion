import { Legacy } from "@brainly";
import { RadioGroup, Button, Flex, Radio, Textarea } from "brainly-style-guide";
import { useState } from "react";
import { ReportData } from "@typings/brainly";
import Subcategories from "./Subcategory";

export default function ReportReasons(
  { reasons, id, type, target, success } : 
  { reasons: ReportData, id: number, type: "task" | "response" | "comment", 
  target: HTMLElement, success:()=> void } 
) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(0);
  const [repData, setRepData] = useState("");
  return (
    <RadioGroup 
      name ="report-menu"
      className ="reportRadiogrp sg-flex"
      value={category}
      onChange={({ target }) => {
        let eventTarget = target as HTMLInputElement;

        let reason = reasons.data.find((item) => {
          return (item.id === +eventTarget.id);
        });

        setCategory(reason.id + "");
        setSubcategory(reason.subcategories?.[0].id ?? null);
      }} >
      {
        reasons.data.map((reason) => {
          return (
            <Flex 
              direction = "column"
              key = {reason.id}
              className = {reason.id === +category ? "select" : ""}
            >
              <Radio
                labelSize = "small"
                key = {reason.id}
                id={reason.id + ""}
                value={reason.id + ""}
              >
                {reason.text}
              </Radio>
              {
                reason.data?.type === "textarea" && (
                  <Textarea
                    type="text" 
                    className = "reportData" 
                    
                    onChange = { ({ target }) => setRepData((target as HTMLInputElement).value) }
                    value = { repData } 
                  />
                )
              }
              {
                reason.subcategories &&
                  <Subcategories 
                    reason={reason} 
                    subcategory={subcategory} 
                    setSubcategory={setSubcategory} 
                    repData = {repData}
                    setRep = {setRepData}
                  />
              }
            </Flex>
          );
        })
      }
      <Button 
        size="m" 
        variant={"solid"}
        onClick = {
          () => {
            let res = Legacy.ReportContent({
              id: id,
              type: type,
              categoryId: +category,
              subId: subcategory || null,
              data: repData || null
            });
            if (res) {
              target.style.color = "red";
              if (!target.querySelector("use")) {
                target.setAttribute("xlink:href", "#icon-report_flag");
              } else {
                target.querySelector("use").setAttribute("xlink:href", "#icon-report_flag");
              }

              target.closest(".sg-button").classList.add("sg-button--disabled");
              target.closest(".sg-button").setAttribute("disabled", "true");
              if (success) success();
            }
            document.querySelector(".report#modal").remove();
          }
        }
      >
        report
      </Button>
    </RadioGroup>
  );
}