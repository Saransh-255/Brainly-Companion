import createPage from "@lib/createPage";
import { Flex } from "brainly-style-guide";
import Sidebar from "../../components/react/_sidebar";
import Content from "./_content";

createPage(
  <AnsweringDashboard />, "Dashboard"
);

function AnsweringDashboard() {
  return (
    <Flex
      direction="row"
      fullHeight
      fullWidth
    >
      <Sidebar />
      <Content />
    </Flex>
  );
}