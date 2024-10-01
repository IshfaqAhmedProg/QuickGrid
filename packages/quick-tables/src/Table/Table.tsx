import FlexContainer from "../Utility/FlexContainer";
import TableMain from "./TableMain";
import TableTitleBar from "./TableTitleBar";
import TableToolBar from "./TableToolBar";
import "../index.css";
import { useTable } from "./TableProvider";
export default function Table() {
  const table = useTable();
  return (
    <FlexContainer
      sx={{
        overflow: "hidden",
        height: table.theme?.tableContainerHeight,
        flexDirection: "column",
      }}
    >
      {/* TitleBar */}
      <TableTitleBar />
      {/* ToolBar */}
      <TableToolBar />
      {/* Main Table */}
      <TableMain />
    </FlexContainer>
  );
}
