import Cell from "../Utility/Cell";
import FlexContainer from "../Utility/FlexContainer";
import Row from "../Utility/Row";
import useScrollSync from "../Utility/useScrollSync";
import { useTable } from "./TableProvider";

interface Props {
  mainDivRef: ReturnType<typeof useScrollSync>["mainDivRef"];
  handleScrollX: ReturnType<typeof useScrollSync>["handleScrollX"];
}
export default function TableDataSection(props: Props) {
  const table = useTable();
  console.log("check", table.theme?.cardWidth);

  return (
    <FlexContainer
      className="dataSection"
      sx={{
        backgroundColor: "blanchedalmond",
        flex: `1 0 calc(100% - ${table.theme?.headerRowHeight})`,
        overflow: "hidden auto",
        gap: table.theme?.columnGap,
      }}
    >
      {table.cardComponent && (
        <FlexContainer
          className="tableCardSection"
          sx={{
            flexDirection: "column",
            height: "fit-content",
            overflow: "clip",
            gap: table.theme?.rowGap,
            backgroundColor: "coral",
          }}
        >
          {table.data.map((v, i) => {
            if (table.cardComponent) {
              const CardComponent = table.cardComponent;
              return <CardComponent key={i} value={v} index={i} />;
            }
          })}
        </FlexContainer>
      )}
      <FlexContainer
        sx={{
          flexDirection: "column",
          maxWidth: table.cardComponent
            ? `calc(100% - ${table.theme?.cardWidth})`
            : "100%",
          flex: "1 0 auto",
          overflow: "auto hidden",
          height: "fit-content",
          paddingRight: "2.5rem",
          gap: table.theme?.rowGap,
        }}
        ref={props.mainDivRef}
        onScroll={props.handleScrollX}
      >
        {table.data.map((d, i) => (
          <Row
            sx={{
              backgroundColor: table.selectedData[i]
                ? "background.paper"
                : undefined,
              gap: table.theme?.columnGap,
            }}
            component={"label"}
            key={i}
            htmlFor={`checkbox-${i}`}
          >
            {d &&
              Object.keys(d).map((key) => (
                <Cell
                  key={key}
                  sx={{
                    height: !!table.cardComponent
                      ? table.theme?.cardHeight
                      : table.theme?.rowHeight,
                  }}
                >
                  {JSON.stringify(d[key]).replaceAll('"', "")}
                </Cell>
              ))}
          </Row>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
}
