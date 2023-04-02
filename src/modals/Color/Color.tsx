import createModal from "@lib/createModal";
import { Button, Flex, Headline } from "brainly-style-guide";

import { ColorPicker, useColor } from "react-color-palette";
import applyColor from "views/theme";

export default function PickColor() {
  createModal({
    element: <ColorModal />,
    className: "color-modal"
  });
}

function ColorModal() {
  const [color, setColor] = useColor("hex", localStorage.getItem("comp-header"));

  return (
    <Flex
      direction="column"
      style={{
        gap: "12px"
      }}
    >
      <Headline
        align="to-left"
        color="text-black"
        extraBold
        size="large"
      >
        Change Theme
      </Headline>
      <ColorPicker 
        width={300}
        height={300}
        color={color}
        onChange={setColor}
        hideHSV 
      />
      <Button
        variant="solid"
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          width: "300px",
          height: "154px"
        }}
        onClick={() => {
          localStorage.setItem("comp-header", color.hex);
          applyColor(color.hex);
          document.querySelector("#modal").remove();
        }}
      >
        Apply
      </Button>
    </Flex>
  );
}