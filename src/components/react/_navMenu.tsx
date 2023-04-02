import { Flex, Button, Icon, Text } from "brainly-style-guide";
import { Dispatch } from "react";

export default function NavMenu({ page, setPage, length, final, black }) {
  return (
    <Flex className="nav-menu" alignItems="center" style={{ gap: "8px" }}>
      <NavBut page={page} setPage={setPage} len={length} final={final} black={black} pos="left" />

      <Text>{page + ((+length > 0) ? (" / " + length) : "")}</Text>

      <NavBut page={page} setPage={setPage} len={length} final={final} black={black} pos="right" />
    </Flex>
  );
}

function NavBut(
  { page, setPage, pos, len, final, black } : 
  { page: number, setPage: Dispatch<React.SetStateAction<number>>, 
    pos: "left" | "right", len:number, final: boolean, black:boolean }) {
  return (
    <Button
      variant="transparent"
      size="m"
      disabled={
        (pos === "left" && page === 1) || (pos === "right" && (page === (len) || final)) 
      }
      icon={
        <Icon
          type={`arrow_${pos}`}
          size={24}
          color={black ? "icon-white" : "icon-gray-60"}
        />
      }
      iconOnly
      aria-label="arrow"
      onClick={
        () => {
          setPage(pos === "left" ? (page - 1) : (page + 1));
        }
      }
    />
  );
}