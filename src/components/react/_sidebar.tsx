import site from "@lib/market";
import { Flex, Logo } from "brainly-style-guide";

export default function () {
  let logo: "brainly-mobile" | "znanija-mobile" | "nosdevoirs-mobile" = "brainly-mobile";

  switch (site.locals.market) {
  case ("fr"):
    logo = "nosdevoirs-mobile";
    break;
  case ("ru"):
    logo = "znanija-mobile";
    break;
  }
  return (
    <Flex
      className="sidebar"
      justifyContent="center"
    >
      <a href={site.url}>
        <Logo type={logo} />
      </a>
    </Flex>
  );
}