import { GridProps } from "./types";

const getDefaultTheme = (props: GridProps<any>): GridProps<any>["theme"] => {
  return {
    cardHeight: "4rem",
    cardWidth: "20rem",
    headerRowHeight: "1.5rem",
    headerFontColor: "gray",
    cellWidth: "15ch",
    headerFontSize: "1.5em",
    fontSize: "1em",
    rowHeight: props.cardSlot ? "4rem" : "2.5rem",
    gridContainerHeight: "100vh",
    gridHeight: "80%",
    ...props.theme,
  };
};
export default getDefaultTheme;
