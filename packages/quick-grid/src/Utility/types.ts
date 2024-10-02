import { ComponentType, CSSProperties, HTMLProps, ReactNode } from "react";
import useGridData from "./useGridData";

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

export type GridHeaderMap<T> = {
  [P in NestedKeyOf<T>]: {
    header: string;
    accessorKey: P;
    cellSlot: (value: TypeFromPath<T, P>) => React.ReactNode;
  };
}[NestedKeyOf<T>];

// Utility to get the type of a deeply nested key path from T
type TypeFromPath<
  T,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends string
      ? TypeFromPath<T[Key], Rest>
      : never
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

type NestedKeyOf<T, Depth extends number = 3> = [Depth] extends [never]
  ? never
  : {
      [K in keyof T & string]: T[K] extends (infer U)[]
        ?
            | `${K}`
            | `${K}.${number}`
            | `${K}.${number}.${NestedKeyOf<U, Prev[Depth]>}`
        : T[K] extends object
          ? `${K}` | `${K}.${NestedKeyOf<T[K], Prev[Depth]>}`
          : `${K}`;
    }[keyof T & string];

// Workaround to make NestedKeyOf not deeply nested when checking types and optimising typescript speed
type Prev = [never, 0, 1, 2, 3, 4, 5];

export type InfiniteGridProps = {
  type?: "infinite";
};

export type PaginatedGridProps = {
  type: "paginated";
  totalPages: number;
  currentPage?: number;
  paginationSlot?: ReactNode;
};
export type SelectableGridProps = {
  selectable?: boolean;
  selectSlot?: ReactNode;
};
export type GridThemeProps = {
  /** Height of the container containing titleBar toolBar and data grid section */
  gridContainerHeight?: CSSProperties["height"];
  /** Height of the title bar section */
  titleBarHeight?: CSSProperties["height"];
  /** Height of the tool bar section */
  toolBarHeight?: CSSProperties["height"];
  /** Height of the main grid section */
  gridHeight?: CSSProperties["height"];
  /** Relative font size of the whole grid */
  fontSize?: CSSProperties["fontSize"];
  /** Width of an individual cell */
  cellWidth?: CSSProperties["width"];
  /** Width of an individual row */
  rowHeight?: CSSProperties["height"];
  /** Gap between each row */
  rowGap?: CSSProperties["gap"];
  /** Gap between columns */
  columnGap?: CSSProperties["gap"];
  /** Width of the rendered card */
  cardWidth?: CSSProperties["width"];
  /** Height of the rendered card */
  cardHeight?: CSSProperties["height"];
  /** Font Size of headers */
  headerFontSize?: CSSProperties["fontSize"];
  /** Text Color of headers */
  headerFontColor?: CSSProperties["color"];
  /** Height of the row containing the headers */
  headerRowHeight?: CSSProperties["height"];
  /** Render a divider between headers and data  */
  renderDivider?: boolean;
  /** Header row className for tailwind users */
  twClassNames?: {
    titleBar?: HTMLProps<HTMLElement>["className"];
    toolBar?: HTMLProps<HTMLElement>["className"];
    grid?: HTMLProps<HTMLElement>["className"];
    headerRow?: HTMLProps<HTMLElement>["className"];
    cell?: HTMLProps<HTMLElement>["className"];
    row?: HTMLProps<HTMLElement>["className"];
    card?: HTMLProps<HTMLElement>["className"];
    cardContainer?: HTMLProps<HTMLElement>["className"];
  };
};

export type CellTypeProps<T> = {
  value: T;
  index: number;
  selected?: boolean;
};
export type GridCardProps<T> = {
  cardSlot?: ComponentType<CellTypeProps<T>>;
  cardHeaderSlot?: ReactNode;
};

export type GridBaseProps<T> = {
  data: T[];
  title?: string;
  gridHeaderMap?: GridHeaderMap<T>[];
  children?: ReactNode;
  theme?: GridThemeProps;
  headers?: string[];
};
export type GridProps<T extends Record<string, any>> = GridBaseProps<T> &
  SelectableGridProps &
  GridCardProps<T> &
  (InfiniteGridProps | PaginatedGridProps);

export type GridContextType<T extends Record<string, any>> =
  | (GridProps<T> & ReturnType<typeof useGridData<T>>)
  | null;
