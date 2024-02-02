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
import TimeFns from "@lib/timeFns";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip
} from "chart.js";
import locals from "@config/localization";
import { ContentList } from "@typings/brainly";

ChartJS.register(
  ArcElement,
  Tooltip,
  DoughnutController
);

export default function Progress(
  { allAnswers, time }:
    { allAnswers: ContentList, time: TimeFns }
) {
  let answers = allAnswers.data.responses.items;
  let today = time.getNow();
  //today = sub(today, { years: 2, months: 3 });

  let startSat = isSaturday(today) ? startOfDay(today) : startOfDay(previousSaturday(today));
  let qProgress = time.filterByTime(answers, startSat, today).length * 10;

  return (
    <Flex
      className="progress"
      style={{ flex: "2" }}
    >
      <Box
        border
        color="transparent"
        padding="m"
      >
        <Flex height="100%" alignItems="center" justifyContent="flex-start">
          <Flex className="chart">
            <Doughnut
              data={{
                labels: ["", ""],
                datasets: [{
                  label: locals.dashboard.quota,
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
            <Text sizes="m" style={{ width: "max-content" }}>{locals.dashboard.quota} ({qProgress / 10} / 10)</Text>
          </Flex>

          <SeparatorVertical size="full" />

          <Flex style={{ gap: "1rem", height: "100%" }}>
            <StatItem
              head={time.filterByTime(
                answers, startOfMonth(today), today
              ).length}
              text={locals.dashboard.month}
              before={
                time.filterByTime(
                  answers,
                  sub(startOfMonth(today), { months: 1 }),
                  startOfMonth(today)
                ).length
              }
            />

            <StatItem
              head={time.filterByTime(answers, startOfQuarter(today), today).length}
              text={locals.dashboard.quarter}
              before={
                time.filterByTime(
                  answers,
                  sub(startOfQuarter(today), { months: 3 }),
                  startOfQuarter(today)
                ).length
              }
            />
          </Flex>

          <SeparatorVertical size="full" />

          <Box className="answer-rate" padding="none" border>
            <div className="backdrop">
              <div className="circles">
                <div className="circ5 yellow" style={{ background: "#fbbe2e", top: "4rem", left: "10rem" }}></div>
                <div className="circ5 red" style={{ background: "#ff341a", top: "5rem", right: "2rem" }}></div>
                <div className="circ6 green" style={{ background: "#24a865" }}></div>
                <div className="circ6 blue" style={{ background: "#4fb3f6", top: "1rem", right: "30%" }}></div>
              </div>
            </div>
            <Flex
              justifyContent="center"
              alignItems="center"
              className="rate-info"
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
                  color="text-black"
                >
                  {
                    Math.round(
                      time.filterByTime(
                        answers,
                        subDays(today, 6),
                        today
                      ).length * 100 / 7
                    ) / 100
                  }
                </Headline>
                <Text color="text-black" >
                  {locals.dashboard.rate}
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
      style={{ minWidth: "200px", gap: "1rem", width: "auto" }}
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