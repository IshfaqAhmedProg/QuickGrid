import React from "react";
import { useTable } from "./TableProvider";
import FlexContainer from "../Utility/FlexContainer";
import Cell from "../Utility/Cell";
import useScrollSync from "../Utility/useScrollSync";

interface Props {
  syncedDivRef: ReturnType<typeof useScrollSync>["syncedDivRef"];
}

export default function TableHeaderSection({ syncedDivRef }: Props) {
  const table = useTable();

  console.log(
    !!table.cardHeaderSlot,
    !!table.cardComponent,
    table.theme?.cardWidth
  );
  return (
    <FlexContainer
      className="headerSection"
      sx={{
        width: "100%",
      }}
    >
      {!!table.cardComponent && (
        <Cell
          // bgcolor={"blueviolet"}
          // className={`w-${table.theme?.cardWidth} flex-shrink-0 flex-grow-1`}
          sx={{
            width: table.theme?.cardWidth,
            flex: `1 0 ${table.theme?.cardWidth}`,
            height: table.theme?.headerRowHeight,
          }}
        >
          {table.cardHeaderSlot ? table.cardHeaderSlot : ""}
        </Cell>
      )}
      <FlexContainer
        ref={syncedDivRef}
        sx={{
          // bgcolor={"purple"}
          // maxWidth: table.cardComponent
          //   ? `calc(100% - ${table.theme?.cardWidth})`
          //   : "100%",
          flex: `1 0 ${
            table.cardComponent
              ? `calc(100% - ${table.theme?.cardWidth})`
              : "100%"
          }`,
          overflow: "hidden",
          height: "fit-content",
          paddingRight: 5,
        }}
      >
        {table.data[0] &&
          Object.keys(table.data[0]).map((key) => (
            <Cell
              key={key}
              sx={{
                height: table.theme?.headerRowHeight,
              }}
              // className={`h-${table.theme?.headerRowHeight} min-w-${table.theme?.cellWidth}`}
            >
              {JSON.stringify(key).replaceAll('"', "")}
            </Cell>
          ))}
      </FlexContainer>
    </FlexContainer>
  );
}
