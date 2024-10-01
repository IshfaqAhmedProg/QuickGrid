import { ComponentType, CSSProperties, ReactNode } from "react";
import useTableData from "./useTableData";

// export type TableTabsProps = {
//   tabs?: { label: string; onClick(e: SyntheticEvent): void }[];
//   tabsSlot?: undefined;
//   titleBarSlot?: undefined;
// };
// export type TableTabsSlotProps = {
//   tabsSlot?: ReactNode;
//   tabs?: undefined;
//   titleBarSlot?: undefined;
// };

// export type TableTitleBarProps = {
//   titleBarSlot?: ReactNode;
// };

export type TableHeaderMap<T> = {
  [P in NestedKeyOf<T>]: {
    headerLabel: string;
    pointer: P;
    renderCell: (value: TypeFromPath<T, P>) => React.ReactNode;
  };
}[NestedKeyOf<T>];

type TypeFromPath<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? TypeFromPath<T[K], R>
      : never
    : never;

type NestedKeyOf<T, Depth extends number = 3> = [Depth] extends [never]
  ? never
  : {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K], Prev[Depth]>}`
        : `${K}`;
    }[keyof T & string];

// Workaround to make NestedKeyOf not deeply nested when checking types and optimising typescript speed
type Prev = [never, 0, 1, 2, 3, 4, 5];

export type InfiniteTableProps = {
  type?: "infinite";
};

export type PaginatedTableProps = {
  type: "paginated";
  totalPages: number;
  currentPage?: number;
  paginationSlot?: ReactNode;
};
export type SelectableTableProps = {
  selectable?: boolean;
  selectSlot?: ReactNode;
};
export type StyleTableProps = {
  /** Height of the container containing titleBar toolBar and data grid section */
  tableContainerHeight?: CSSProperties["height"];
  /** Height of the title bar section */
  titleBarHeight?: CSSProperties["height"];
  /** Height of the tool bar section */
  toolBarHeight?: CSSProperties["height"];
  /** Height of the main grid section */
  tableHeight?: CSSProperties["height"];
  /** Width of an individual cell */
  cellWidth?: CSSProperties["width"];
  /** Width of an individual row */
  rowHeight?: CSSProperties["height"];
  /** Width of the rendered card */
  cardWidth?: CSSProperties["width"];
  /** Height of the rendered card */
  cardHeight?: CSSProperties["height"];
  headerFontSize?: CSSProperties["fontSize"];
  headerFontColor?: CSSProperties["color"];
  headerRowHeight?: CSSProperties["height"];
  fontSize?: CSSProperties["fontSize"];
  rowGap?: CSSProperties["gap"];
  columnGap?: CSSProperties["gap"];
  renderDivider?: boolean;
};

export type CardComponentProps<T> = {
  value: T;
  index: number;
  selected?: boolean;
};
export type CardTableProps<T> = {
  cardComponent?: ComponentType<CardComponentProps<T>>;
  cardHeaderSlot?: ReactNode;
};

export type BaseTableProps<T> = {
  data: T[];
  title?: string;
  tableHeaderMap?: TableHeaderMap<T>[];
  children?: ReactNode;
  theme?: StyleTableProps;
};
export type TableProps<T extends Record<string, any>> = BaseTableProps<T> &
  SelectableTableProps &
  CardTableProps<T> &
  (InfiniteTableProps | PaginatedTableProps);
// ((TableTabsProps & TableTabsSlotProps) | TableTitleBarProps);

export type TableContextType<T extends Record<string, any>> =
  | (TableProps<T> & ReturnType<typeof useTableData<T>>)
  | null;
