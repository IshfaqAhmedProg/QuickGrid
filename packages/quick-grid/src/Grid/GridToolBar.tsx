// import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import FlexContainer from "../Utility/FlexContainer";
import { useGrid } from "./GridProvider";

export default function GridToolBar() {
  const grid = useGrid();
  return (
    <FlexContainer
      sx={{
        gap: 1,
        justifyContent: "space-between",
        paddingInline: 2,
        paddingLeft: grid.selectable ? 0 : 2,
        paddingBlock: 1,
        maxHeight: "10%",
        background: "orange",
      }}
    >
      <p>Filters:</p>
    </FlexContainer>
  );
}
