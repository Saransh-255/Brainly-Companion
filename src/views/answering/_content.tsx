import { useState, useEffect } from "react";
import {
  Box,
  Flex, 
  Link, 
  List, 
  ListItem,
  SpinnerContainer, 
} from "brainly-style-guide";
import { Legacy } from "@brainly";
import { ContentList, Notifications } from "@typings/brainly";

import Progress from "./_progress";
import AnsGraph from "./_ansGraph";
import NotificationItem from "./_notifications";
import TimeFns from "@lib/timeFns";

const links = [
  {
    name: "Desmos",
    link: "https://desmos.com"
  },
  {
    name: "Google Sheets",
    link: "https://docs.google.com/spreadsheets/u/0/"
  },
  {
    name: "Triangle Solver",
    link: "https://www.calculator.net/triangle-calculator.html"
  },
  {
    name: "Unicode Characters",
    link: "https://unicode-table.com/en/sets/mathematical-signs/"
  },
  {
    name: "Polynomial Long Division",
    link: "https://www.emathhelp.net/calculators/algebra-1/polynomial-long-division-calculator/"
  },
  {
    name: "Synthetic Division",
    link: "https://www.emathhelp.net/calculators/algebra-1/synthetic-division-calculator/"
  },
  {
    name: "Vector Calculator",
    link: "https://www.mathsisfun.com/algebra/vector-calculator.html"
  }
];

export default function Content({ time } : { time: TimeFns }) {

  //const [user, setUser] = React.useState<UserInfo>();
  const [answers, setAnswers] = useState<ContentList>();
  const [notifications, setNotif] = useState<Notifications>();

  useEffect(() => {
    const getData = async () => {
      await Legacy.GetNotifications().then(notifs => setNotif(notifs));
      await Legacy.GetContent("responses").then(ans => setAnswers(ans));
    };
    getData();
  }, []);

  if (notifications && answers) {
    return (
      <Flex className="content">
        <Flex
          className = "f1"
          direction = "column"
        >
          <Flex
            className = "f1 toprow"
          >
            <Progress allAnswers = {answers} time={time} />
          </Flex>
          <Flex
            className = "bottomrow f1"
          >
            <Flex
              className = "links"
            >
              <Box
                border
                color="transparent"
                padding="m"
              >
                <LinkList arr={links} />
              </Box>
            </Flex>
            <NotificationItem notif = {notifications} time={time} />
            <Flex
              style = {{ flex : "2" }}
              alignItems= "center"
              justifyContent= "center"
              className="illustration"
            >
              <AnsGraph ansArr = {answers.data.responses.items} time={time} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return <SpinnerContainer loading ></SpinnerContainer>;
  }
}

function LinkList({ arr }) {
  return (
    <List>
      {
        arr.map(item => {
          return (
            <ListItem key = {item.link}>
              <Link
                href={item.link}
                newTabLabel=""
                target="_blank"
                emphasised={false}
              >
                {item.name}
              </Link>
            </ListItem>
          );
        })
      }
    </List>
  );
}