import React from "react";

import createPage from "@lib/createPage";
import { Flex } from "brainly-style-guide";
import Sidebar from "../../components/react/_sidebar";
import Content from "./_content";

import TimeFns from "@lib/timeFns";

createPage(
  <AnsweringDashboard />, "Dashboard"
);

function AnsweringDashboard() {
  const time = React.useRef(new TimeFns());
  return (
    <Flex
      direction="row"
      fullHeight
      fullWidth
    >
      <Sidebar />
      <Content time={time.current} />
    </Flex>
  );
}