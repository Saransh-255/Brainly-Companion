import { Flex, Icon, Box, Headline, Text, SeparatorVertical } from "brainly-style-guide";
import { 
  startOfMonth, 
  previousSaturday, 
  startOfQuarter, 
  startOfDay, 
  isSaturday, 
  subDays,
  sub
} from "date-fns";
import { filterByTime } from "@lib/timeFns";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip
} from "chart.js";
import { formatInTimeZone } from "date-fns-tz";

ChartJS.register(
  ArcElement,
  Tooltip,
  DoughnutController
);

export default function Progress({ allAnswers }) {
  allAnswers = allAnswers.data.responses.items;
  let today = new Date(formatInTimeZone(new Date(), "America/New_York", "yyyy-MM-dd HH:mm:ss"));
  //today = sub(today, { years: 2, months: 3 });

  let startSat = isSaturday(today) ? startOfDay(today) : startOfDay(previousSaturday(today));
  let qProgress = filterByTime(allAnswers, startSat, today).length * 10;

  return (
    <Flex 
      className = "progress"
      style = {{ flex: "2" }}
    >
      <Box
        border
        color="transparent"
        padding="m"
      >
        <Flex height="100%" alignItems="center" justifyContent="flex-start">
          <Flex className="chart">
            <Doughnut data={{
              labels: ["", ""],
              datasets: [{
                label: "Quota",
                data: [qProgress, qProgress < 100 ? (100 - qProgress) : 0],
                backgroundColor: [
                  qProgress >= 100 ? "#fbbe2e" : "#014a82",
                  qProgress === 0 ? "#c3d1dd" : "#ffffff"
                ],
                borderWidth: 0
              }]
            }} 
            options={{
              responsive: true,
              animation: false
            }} 
            id="quota"
            />
            <Text sizes = "m" style={{ width:"max-content" }}>Quota ({qProgress / 10} / 10)</Text>
          </Flex>

          <SeparatorVertical size="full" />

          <Flex style = {{ gap: "1rem", height:"100%" }}>
            <StatItem 
              head = {filterByTime(allAnswers, startOfMonth(today), today).length}
              text={"Month"}
              before = {
                filterByTime(
                  allAnswers, 
                  sub(startOfMonth(today), { months: 1 }), 
                  startOfMonth(today)
                ).length
              }
            />

            <StatItem 
              head = {filterByTime(allAnswers, startOfQuarter(today), today).length}
              text={"Quarter"}
              before = {
                filterByTime(
                  allAnswers, 
                  sub(startOfQuarter(today), { months: 3 }), 
                  startOfQuarter(today)
                ).length
              }
            />
          </Flex>

          <SeparatorVertical size="full" />

          <Box className = "answer-rate">
            <Flex
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                alignItems="baseline"
                justifyContent="center"
                style={{ gap: "1rem" }}
              >
                <Headline
                  extraBold
                  size="xxxlarge"
                  className="sg-text"
                  color="text-white"
                >
                  {
                    Math.round(
                      filterByTime(
                        allAnswers, 
                        subDays(today, 6), 
                        today
                      ).length * 100 / 7
                    ) / 100
                  }
                </Headline>
                <Text color="text-white" >
                  answers/day
                </Text>
              </Flex>
            </Flex>
          </Box>

        </Flex>
      </Box>
    </Flex>
  );
}

function StatItem({ head, text, before }) {
  return (
    <Box
      border
      style={{ minWidth:"200px", gap: "1rem", width:"auto" }}
    >
      <Flex alignItems="center" >
        <Icon 
          type="answer" 
          color="icon-gray-50"
        />
        <Text
          size="small"
          color="text-gray-50"
        >
          {text}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        style={{ flex: "1" }}
      >
        <Flex
          alignItems="baseline"
          direction="column"
        >
          <Headline
            size="large"
            className="sg-text"
            color="text-gray-40"
            style={{ lineHeight: "1.5rem" }}
          >
            {
              before
            }
          </Headline>
          <Headline
            size="xxxlarge"
            extraBold
            className="sg-text"
            style={{ lineHeight: "4rem" }}
          >
            {head}
          </Headline>
        </Flex>
      </Flex>
    </Box>
  );
}