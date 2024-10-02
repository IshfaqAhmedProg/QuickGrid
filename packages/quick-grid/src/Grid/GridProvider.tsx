"use client";

import { createContext, useContext } from "react";
import getDefaultTheme from "../Utility/getDefaultTheme";
import { GridContextType, GridProps } from "../Utility/types";
import useGridData from "../Utility/useGridData";

export const GridContext = createContext<GridContextType<any>>(null);

export const useGrid = () => {
  const context = useContext<GridContextType<any>>(GridContext);
  if (context == null) {
    throw new Error(
      "Bulk Mailer components must be wrapped in <BulkMailerContextProvider />"
    );
  }
  return context;
};

export default function GridProvider<T extends Record<string, any>>(
  props: GridProps<T>
) {
  const gridData = useGridData(props);
  const { cardSlot, ...rest } = props;
  const theme = getDefaultTheme(props);

  return (
    <GridContext.Provider
      value={{
        theme,
        cardSlot,
        ...rest,
        ...gridData,
      }}
    >
      {rest.children}
    </GridContext.Provider>
  );
}
