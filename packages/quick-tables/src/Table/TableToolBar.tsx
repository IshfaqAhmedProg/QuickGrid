// import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import FlexContainer from "../Utility/FlexContainer";
import { useTable } from "./TableProvider";

export default function TableToolBar() {
  const table = useTable();
  return (
    <FlexContainer
      sx={{
        gap: 1,
        justifyContent: "space-between",
        paddingInline: 2,
        paddingLeft: table.selectable ? 0 : 2,
        paddingBlock: 1,
        maxHeight: "10%",
        background: "orange",
      }}
    >
      {/* {table.selectable && (
        <FormControlLabel
          label="Select All"
          sx={{
            mr: 0,
            ml: 0,
            "& .MuiTypography-root": {
              fontSize: table.theme?.headerFontSize,
              color: table.theme?.headerFontColor,
            },
          }}
          control={
            <Checkbox
              checked={table.selectAll == "selected"}
              value={table.selectAll}
              indeterminate={table.selectAll == "indeterminate"}
              onChange={(e, c) => table.handleSelectAll(c)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      )} */}

      <p>Filters:</p>
    </FlexContainer>
  );
}
