import local from "@config/localization";
import site from "@lib/market";
import { Headline, Breadcrumb, Flex, Link } from "brainly-style-guide";

export default function Head({ subject, grade, id, data }) {
  let link = `${site.url}/${site.locals.question}/${id}`; 
  
  return (
    <Flex 
      direction="column"
      justifyContent={"flex-end"}
      fullWidth
    >
      <Headline
        align="to-left"
        color="text-black"
        extraBold
        size="large"
      >
        {
          local.modals.preview.title
        }
        <Link
          as="a"
          hideNewTabIndicator
          href= {link}
          size="large"
          target="_blank"
          weight="bold"
          color={data.settings.is_deleted ? "text-red-40" : "text-blue-60"}
        >
        #{id}
        </Link>
      </Headline>
      <Breadcrumb
        elements = {[
          `${subject}`,
          `${grade}`,
          `${data.points.ptsForTask + " " + local.points}`
        ]}
      />
    </Flex>
  );
}