import { useEffect } from "react";
import { useGrid } from "./GridProvider";
import useScrollSync from "../Utility/useScrollSync";
import FlexContainer from "../Utility/FlexContainer";
import GridHeaderSection from "./GridHeaderSection";
import GridDataSection from "./GridDataSection";

export default function GridMain() {
  const grid = useGrid();

  const totalPages = grid.type == "paginated" ? grid.totalPages : 0;

  const { mainDivRef, syncedDivRef, handleScrollX } = useScrollSync();

  useEffect(() => {
    if (mainDivRef.current && syncedDivRef.current) {
      // Sync the scrollTop and scrollLeft
      syncedDivRef.current.style.width = mainDivRef.current.style.width;
    }
  }, [mainDivRef, syncedDivRef]);

  return (
    <FlexContainer
      className={`gridMain`}
      sx={{
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
        flex: "1 0 auto",
        backgroundColor: "yellow",
        height: grid.theme?.gridHeight ?? "100%",
      }}
    >
      <GridHeaderSection syncedDivRef={syncedDivRef} />
      <hr className="border-t-gray-500 w-full" />
      <GridDataSection mainDivRef={mainDivRef} handleScrollX={handleScrollX} />
    </FlexContainer>
  );
}
