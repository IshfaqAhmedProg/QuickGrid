import Cell from "../Utility/Cell";
import FlexContainer from "../Utility/FlexContainer";
import Row from "../Utility/Row";
import useScrollSync from "../Utility/useScrollSync";
import { useGrid } from "./GridProvider";

interface Props {
  mainDivRef: ReturnType<typeof useScrollSync>["mainDivRef"];
  handleScrollX: ReturnType<typeof useScrollSync>["handleScrollX"];
}
export default function GridDataSection({ mainDivRef, handleScrollX }: Props) {
  const grid = useGrid();
  console.log("check", grid.theme?.cardWidth);

  return (
    <FlexContainer
      className="dataSection"
      sx={{
        backgroundColor: "blanchedalmond",
        flex: `1 0 calc(100% - ${grid.theme?.headerRowHeight})`,
        overflow: "hidden auto",
        gap: grid.theme?.columnGap,
      }}
    >
      {grid.cardSlot && (
        <FlexContainer
          className="gridCardSection"
          sx={{
            flexDirection: "column",
            height: "fit-content",
            overflow: "clip",
            gap: grid.theme?.rowGap,
            backgroundColor: "coral",
          }}
        >
          {grid.data.map((v, i) => {
            if (grid.cardSlot) {
              const CardComponent = grid.cardSlot;
              return <CardComponent key={i} value={v} index={i} />;
            }
          })}
        </FlexContainer>
      )}
      <FlexContainer
        sx={{
          flexDirection: "column",
          maxWidth: grid.cardSlot
            ? `calc(100% - ${grid.theme?.cardWidth})`
            : "100%",
          flex: "1 0 auto",
          overflow: "auto hidden",
          height: "fit-content",
          // paddingRight: "2.5rem",
          gap: grid.theme?.rowGap,
        }}
        ref={mainDivRef}
        onScroll={handleScrollX}
      >
        {grid.gridMatrix.map((row, i) => (
          <Row
            sx={{
              backgroundColor: grid.selectedData[i]
                ? "background.paper"
                : undefined,
              gap: grid.theme?.columnGap,
            }}
            component={"label"}
            key={`row-${i}`}
            htmlFor={`checkbox-${i}`}
          >
            {row &&
              row.map((d, j) => (
                <Cell
                  key={`cell-${i}-${j}`}
                  id={`cell-${i}-${j}`}
                  sx={{
                    height: !!grid.cardSlot
                      ? grid.theme?.cardHeight
                      : grid.theme?.rowHeight,
                  }}
                >
                  {grid.gridHeaderMap
                    ? grid.gridHeaderMap[j].cellSlot(d)
                    : JSON.stringify(d).replaceAll('"', "")}
                </Cell>
              ))}
          </Row>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
}
