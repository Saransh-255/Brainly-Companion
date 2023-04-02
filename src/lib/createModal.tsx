import { Overlay, Flex, Box, Button, Icon } from "brainly-style-guide";
import renderJSX from "./renderJSX";

export default function createModal(
  data:
    {
      element: React.ReactNode,
      className: string,
      minWidth?: string,
      maxWidth?: string,
      closeFn?: () => void
  }
) {
  renderJSX(
    <Overlay color="black">
      <Flex
        alignItems="center"
        fullHeight
      >
        <Box color="white" className="modal-box sg-flex sg-flex--column" style={{
          position: "relative",
          minWidth: data.minWidth,
          maxWidth: data.maxWidth,
          maxHeight: "90%"
        }}>
          <Button
            icon={<Icon color="adaptive" size={24} type="close"/>}
            iconOnly
            size="m"
            className = "closeModal"
            variant="transparent"
            onClick = {
              (e) => {
                let button = e.target as HTMLElement;
                if (data.closeFn) data.closeFn();
                button.closest("#modal").remove();
              }
            }
            style = {{
              position: "absolute", top: "18px", right: "18px", zIndex: "1"
            }}
          />
          {data.element}
        </Box>
      </Flex>
    </Overlay>,
    data.className,
    "modal"
  );
}