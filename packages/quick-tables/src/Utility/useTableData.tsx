import { useEffect, useState } from "react";
import { TableHeaderMap, TableProps } from "./types";

export default function useTableData<T extends Record<string, any>>({
  data,
  tableHeaderMap,
}: TableProps<T>) {
  const [tableData, setTableData] = useState<T[]>(data);
  const [tableDataMap, setTableDataMap] = useState<TableHeaderMap<T>[]>([]);
  console.log(
    "check: ",
    tableHeaderMap && data.length > 0
      ? data[0][tableHeaderMap[0].pointer]
      : "dont work"
  );

  // Only the ids will be stored in this state, and then those ids can be used to check if it is "checked" or not
  const [selectedData, setSelectedData] = useState<boolean[]>([]);
  const [selectAll, setSelectAll] = useState<
    "selected" | "indeterminate" | undefined
  >();

  useEffect(() => {
    if (selectedData.length > 0)
      if (selectedData.every((d) => d == true)) setSelectAll("selected");
      else if (selectedData.some((d) => d == true))
        setSelectAll("indeterminate");
      else setSelectAll(undefined);
  }, [selectedData]);

  function handleSelecting(index: number, selected: boolean) {
    console.log(index);
    const prev = [...selectedData];
    prev.splice(index, 1, selected);
    setSelectedData(prev);
  }

  function handleSelectAll(c: boolean) {
    setSelectedData(data.map(() => c));
  }

  console.log("checked", selectedData);
  console.log("selectAll", selectAll);

  // console.log("data", JSON.stringify(data));

  return {
    tableData,
    selectedData,
    selectAll,
    handleSelecting,
    handleSelectAll,
  };
}

// {"header1":obj.value1,"header2":obj.value2}
