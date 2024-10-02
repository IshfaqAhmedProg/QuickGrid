import { useEffect, useState } from "react";
import { GridHeaderMap, GridProps } from "./types";

type DeepValueOf<T> = T extends object
  ? { [K in keyof T]: DeepValueOf<T[K]> }[keyof T]
  : T;
export default function useGridData<T extends Record<string, any>>({
  data,
  gridHeaderMap,
}: GridProps<T>) {
  const [gridMatrix, setGridMatrix] = useState<DeepValueOf<T>[][]>([]);
  const [gridHeaders, setGridHeaders] = useState<string[]>([]);
  useEffect(() => {
    if (!data) return;
    const getValueByPointers = (obj: any, pointers: string[]) => {
      return pointers.reduce((acc, pointer) => acc?.[pointer], obj);
    };
    let tbH = new Set<string>([]),
      tbM: any[any] = [];
    // If the user provides a gridHeaderMap then create matrix and header array using that
    if (gridHeaderMap) {
      data.forEach((d, i) => {
        let accessorKeys: string[] = [];
        let row: any[] = [];
        gridHeaderMap.forEach((th) => {
          tbH.add(th.header);
          accessorKeys = th.accessorKey.split(".");
          console.log(
            "accessor",
            accessorKeys,
            getValueByPointers(d, accessorKeys)
          );
          row.push(getValueByPointers(d, accessorKeys));
        });
        tbM.push(row);
      });
      console.log(tbH);
    }
    // Or else by default take all the root node keys and display the values as strings regardless of value type
    else
      data.forEach((d, i) => {
        // Creating the grid headers
        tbH = new Set([...tbH, ...Object.keys(d)]);
        // Creating the grid data
        let row: any[] = [];
        tbH.forEach((header) => {
          row.push(d[header] ?? "");
        });
        tbM.push(row);
      });
    setGridHeaders([...tbH]);
    setGridMatrix(tbM);
  }, [data, gridHeaderMap]);
  console.log("tbM", gridMatrix);
  console.log("tbH", gridHeaders);

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

  return {
    gridMatrix,
    gridHeaders,
    selectedData,
    selectAll,
    handleSelecting,
    handleSelectAll,
  };
}
