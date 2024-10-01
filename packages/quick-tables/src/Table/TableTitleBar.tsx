// import { Stack, Typography } from "@mui/material";
import FlexContainer from "../Utility/FlexContainer";
import { useTable } from "./TableProvider";

export default function TableTitleBar() {
  const { title } = useTable();

  // if (titleBarSlot) return titleBarSlot;

  return (
    <div className="flex flex-row gap-1 justify-between px-2 py-1 max-h-[10%] bg-red-500">
      <h1 className="font-bold">{title}</h1>
    </div>
  );
}
export function TableTitleBarTabs() {
  const table = useTable();

  return <div className="flex flex-row gap-1"></div>;
}
