import createModal from "@lib/createModal";
import { Button, Flex, Headline } from "brainly-style-guide";
import { useEffect } from "react";

import { ColorPicker, useColor } from "react-color-palette";
import applyColor from "views/theme";

import locals from "@config/localization";

export default function PickColor() {
  const savedColor = localStorage.getItem("comp-header");
  createModal({
    element: <ColorModal savedColor={savedColor} />,
    className: "color-modal",
    closeFn() {
      toggleHead();
      applyColor(savedColor);
    },
  });
}

function ColorModal({ savedColor }) {
  const [color, setColor] = useColor("hex", savedColor);
  useEffect(() => {
    toggleHead();
  }, []);
  useEffect(() => {
    applyColor(color.hex);
  }, [color]);

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
        {locals.modals.theme.title}
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
          setColor(color);
          document.querySelector("#modal").remove();
          toggleHead();
        }}
      >
        {locals.modals.theme.commit}
      </Button>
    </Flex>
  );
}

function toggleHead() {
  document.querySelector(".brn-header-container").classList.toggle("viewing");
}