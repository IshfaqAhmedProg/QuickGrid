import { useEffect } from "react";
import { useTable } from "./TableProvider";
import useScrollSync from "../Utility/useScrollSync";
import FlexContainer from "../Utility/FlexContainer";
import TableHeaderSection from "./TableHeaderSection";
import TableDataSection from "./TableDataSection";

export default function TableMain() {
  const table = useTable();

  const totalPages = table.type == "paginated" ? table.totalPages : 0;

  const { mainDivRef, syncedDivRef, handleScrollX } = useScrollSync();

  // useEffect(() => {
  //   if (mainDivRef.current && syncedDivRef.current) {
  //     // Sync the scrollTop and scrollLeft
  //     syncedDivRef.current.style.width = mainDivRef.current.style.width;
  //   }
  // }, [mainDivRef, syncedDivRef]);

  return (
    <FlexContainer
      className={`tableMain`}
      sx={{
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
        flex: "1 0 auto",
        backgroundColor: "yellow",
        height: table.theme?.tableHeight ?? "100%",
      }}
    >
      <TableHeaderSection syncedDivRef={syncedDivRef} />
      <hr className="border-t-gray-500 w-full" />
      <TableDataSection mainDivRef={mainDivRef} handleScrollX={handleScrollX} />
    </FlexContainer>
  );
}
