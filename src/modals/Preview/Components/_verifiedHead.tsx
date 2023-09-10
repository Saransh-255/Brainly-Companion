import { Flex, Icon, Headline, Text } from "brainly-style-guide";
import site from "@lib/market";

export default function Verified ({ Approver }) {
  console.log("approver", Approver);
  return (
    <Flex justifyContent="center" style= {{ paddingBottom: "12px", borderBottom:"2px solid #ebf2f7" }}>
      <Flex alignItems="center" style={{ gap: "8px" }}>
        <Icon type="verified" size={32} color="icon-green-60" />
        <Flex direction="column">
          <Headline size="medium" >Expert-Verified Answer</Headline>
          <Flex style={{ gap: "4px" }}>
            {
              Approver ? (
                <>
                  <Text color="text-gray-50" size="xsmall">Verified by</Text>
                  <Text
                    size="xsmall"
                    href={`https://${site.url}/app/profile/${Approver.id}`}
                    target="_blank"
                    as="a"
                  >
                    {Approver.nickname}
                  </Text>
                </>
              ) : ""
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}