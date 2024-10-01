import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
} from "react";

type RowProps = {
  component?: ElementType;
  sx?: CSSProperties;
} & ComponentPropsWithoutRef<"div"> &
  ComponentPropsWithoutRef<"label">;

const Row = forwardRef<HTMLDivElement, RowProps>(function Row(props, ref) {
  const { component, sx, children, ...rest } = props;

  const Component = component ?? "div";

  const defaultStyle: CSSProperties = {
    display: "flex",
    width: "fit-content",
  };
  return (
    <Component {...rest} style={{ ...defaultStyle, ...sx }} ref={ref}>
      {children}
    </Component>
  );
});
export default Row;
