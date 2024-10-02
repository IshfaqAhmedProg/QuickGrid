import Cell from "../Utility/Cell";
import FlexContainer from "../Utility/FlexContainer";
import Row from "../Utility/Row";
import useScrollSync from "../Utility/useScrollSync";
import { useGrid } from "./GridProvider";

interface Props {
  syncedDivRef: ReturnType<typeof useScrollSync>["syncedDivRef"];
}

export default function GridHeaderSection({ syncedDivRef }: Props) {
  const grid = useGrid();

  console.log(!!grid.cardHeaderSlot, !!grid.cardSlot, grid.theme?.cardWidth);
  return (
    <Row
      className="headerSection"
      sx={{
        width: "100%",
        overflow: "hidden",
        height: grid.theme?.headerRowHeight,
      }}
    >
      {!!grid.cardSlot && (
        <Cell
          sx={{
            width: grid.theme?.cardWidth,
            flex: `0 0 ${grid.theme?.cardWidth}`,
            height: "100%",
            backgroundColor: "greenyellow",
          }}
        >
          {grid.cardHeaderSlot ? grid.cardHeaderSlot : ""}
        </Cell>
      )}
      <FlexContainer
        ref={syncedDivRef}
        className={`headers ${
          grid.cardSlot ? `max-w-calc(100%-${grid.theme?.cardWidth})` : "w-full"
        } overflow-hidden flex-0 h-full pr-10`}
      >
        {grid.gridHeaders.map((header) => (
          <Cell
            key={`header-${header}`}
            sx={{
              height: grid.theme?.headerRowHeight,
              minWidth: grid.theme?.cellWidth,
            }}
          >
            {header}
          </Cell>
        ))}
      </FlexContainer>
    </Row>
  );
}
