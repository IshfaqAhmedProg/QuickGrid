// import { Stack, Typography } from "@mui/material";
import FlexContainer from "../Utility/FlexContainer";
import { useGrid } from "./GridProvider";

export default function GridTitleBar() {
  const { title } = useGrid();

  // if (titleBarSlot) return titleBarSlot;

  return (
    <div className="flex flex-row gap-1 justify-between px-2 py-1 max-h-[10%] bg-red-500">
      <h1 className="font-bold">{title}</h1>
    </div>
  );
}
export function GridTitleBarTabs() {
  const grid = useGrid();

  return <div className="flex flex-row gap-1"></div>;
}
