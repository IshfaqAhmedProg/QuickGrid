"use client";
// import { Stack } from "@mui/material";
import { createContext, useContext } from "react";
import { TableContextType, TableProps } from "../Utility/types";
import useTableData from "../Utility/useTableData";

export const TableContext = createContext<TableContextType<any>>(null);

export const useTable = () => {
  const context = useContext<TableContextType<any>>(TableContext);
  if (context == null) {
    throw new Error(
      "Bulk Mailer components must be wrapped in <BulkMailerContextProvider />"
    );
  }
  return context;
};

export default function TableProvider<T extends Record<string, any>>(
  props: TableProps<T>
) {
  const tableData = useTableData(props);
  const { cardComponent, theme, ...rest } = props;
  const mainTheme: typeof theme = {
    cardHeight: "4rem",
    cardWidth: "20rem",
    headerRowHeight: "1.5rem",
    headerFontColor: "gray",
    cellWidth: "15ch",
    headerFontSize: "1.5em",
    fontSize: "1em",
    rowHeight: cardComponent ? "4rem" : "2.5rem",
    tableContainerHeight: "100vh",
    tableHeight:"80%",
    ...theme,
  };

  return (
    <TableContext.Provider
      value={{
        theme: mainTheme,
        cardComponent,
        ...rest,
        ...tableData,
      }}
    >
      {rest.children}
    </TableContext.Provider>
  );
}
