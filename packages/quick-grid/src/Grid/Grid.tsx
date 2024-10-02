import FlexContainer from "../Utility/FlexContainer";
import GridMain from "./GridMain";
import GridTitleBar from "./GridTitleBar";
import GridToolBar from "./GridToolBar";
import { useGrid } from "./GridProvider";
export default function Grid() {
  const grid = useGrid();
  return (
    <FlexContainer
      sx={{
        overflow: "hidden",
        height: grid.theme?.gridContainerHeight,
        flexDirection: "column",
      }}
    >
      {/* TitleBar */}
      <GridTitleBar />
      {/* ToolBar */}
      <GridToolBar />
      {/* Main Grid */}
      <GridMain />
    </FlexContainer>
  );
}
