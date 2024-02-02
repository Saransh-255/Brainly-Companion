import TimeFns from "@lib/timeFns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  sub
} from "date-fns";
import { ContentListAns } from "@typings/brainly";
import React, { useCallback, useState } from "react";
import { Box, Button, Flex } from "brainly-style-guide";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
type timeFilter = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export default function AnsGraph({ ansArr, time }: { ansArr: ContentListAns[], time: TimeFns }) {
  let now = time.getNow();

  const filterVal = localStorage.getItem("timeFilter") as timeFilter;

  const filterArrs = {
    daily: {
      interval: eachDayOfInterval({ start: sub(now, { months: 1 }), end: now }),
      endFn: endOfDay,
      labelFn: (date: Date) => formatIn(date, "dd MMM")
    },
    weekly: {
      interval: eachWeekOfInterval({ start: sub(now, { weeks: 30 }), end: now }),
      endFn: endOfWeek,
      labelFn: (date: Date) => formatIn(date, "dd MMM")
    },
    monthly: {
      interval: eachMonthOfInterval({ start: sub(now, { years: 1 }), end: now }),
      endFn: endOfMonth,
      labelFn: (date: Date) => formatIn(date, "MMM yyyy")
    },
    quarterly: {
      interval: eachQuarterOfInterval({ start: sub(now, { months: 90 }), end: now }),
      endFn: endOfQuarter,
      labelFn: (date: Date) => formatIn(date, "qqq")
    },
    yearly: {
      interval: eachYearOfInterval({ start: sub(now, { years: 30 }), end: now }),
      endFn: endOfYear,
      labelFn: (date: Date) => formatIn(date, "yyyy")
    }
  };
  const [filter, setFilter] = React.useState<timeFilter>(filterVal || "weekly");
  const [timeObj, setTime] = React.useState(filterArrs[filter]);

  const [graphData, setGraph] = useState({ interval: [], data: [] });

  const setData = useCallback(() => {
    const dataArr = [];
    const dateArr = [];
    shaveEmptyStart(
      timeObj.interval.map(
        (unit) => {
          return {
            data: time.filterByTime(ansArr, unit, timeObj.endFn(unit)).length,
            date: unit
          };
        }
      ))
      .forEach(({ data, date }) => {
        dataArr.push(data);
        dateArr.push(timeObj.labelFn(date));
      });
    setGraph({
      data: dataArr,
      interval: dateArr
    });
  }, [timeObj, setTime, graphData, setGraph, filter, setFilter]);

  React.useEffect(() => {
    setTime(filterArrs[filter]);
    localStorage.setItem("timeFilter", filter);
    setData();
  }, [filter, setFilter, setTime, timeObj, graphData, setGraph]);

  //initial data arrangement
  React.useEffect(() => setData(), []);

  return (
    <div
      className="graph-container"
      style={
        {
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }
      }>
      <div className="ansGraph f1">
        <Line
          data={{
            labels: graphData.interval,
            datasets: [
              {
                label: "You",
                data: graphData.data,
                borderColor: "#014a82",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.5
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              easing: "easeInElastic",
              duration: 0.2
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
      {
        <Flex alignItems="center" justifyContent="space-between" >
          <Flex>

          </Flex>
          <Box
            padding="xs"
            style={{
              width: "max-content",
              background: "#ebf2f7",
              // position: "absolute", 
              // top: "1rem", 
              // right: "1rem",
              borderRadius: "10rem"
            }}
          //style={{ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)" }}
          >
            <Flex gap="xxs">
              {
                ["daily", "weekly", "monthly", "quarterly", "yearly"]
                  .map((unit: timeFilter, index: number) => {
                    return (
                      <Button
                        variant={(unit === filter) ? "solid" : "solid-light"}
                        size="s"
                        key={index}
                        onClick={() => {
                          if (unit === filter) return;
                          setFilter(unit);
                        }}
                      >{unit}
                      </Button>
                    );
                  })
              }
            </Flex>
          </Box>
        </Flex>
      }
    </div>
  );
}

function formatIn(date: Date, form: string) {
  return format(date, form);
}
function shaveEmptyStart(array: { data, date }[]) {
  let foundElem = false;
  let shavedArr = [];
  for (let item of array) {
    if (!item.data && !foundElem) continue;
    else if (item.data) foundElem = true;
    shavedArr.push(item);
  }
  return shavedArr;
  // return array.map((item) => {
  //   if (!item.data && !foundElem) return;
  //   else if (item.data) foundElem = true;
  //   return item;
  // });
}