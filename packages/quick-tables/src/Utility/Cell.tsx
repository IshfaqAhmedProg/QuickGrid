import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
} from "react";
import { useTable } from "../Table/TableProvider";

type CellProps = {
  component?: ElementType;
  sx?: CSSProperties;
  typographyProps?: ComponentPropsWithoutRef<"p">;
} & ComponentPropsWithoutRef<"div">;

const Cell = forwardRef<HTMLDivElement, CellProps>(
  function InnerCell(props, ref) {
    const { component, typographyProps, sx, ...rest } = props;

    const { theme } = useTable();

    const Component = component ?? "div";

    // const defaultStyles = `flex w-[${theme?.cellWidth}] h-[${theme?.rowHeight}] overflow-hidden`;

    const defaultStyle: CSSProperties = {
      display: "flex",
      width: theme?.cellWidth,
      height: theme?.rowHeight,
      overflow: "hidden",
    };
    // console.log("defaultStyle", defaultStyle);
    if (typeof props.children == "string")
      return (
        <Component
          ref={ref}
          // className={`${defaultStyles} ${className}`}
          style={{ ...defaultStyle, ...sx }}
          {...rest}
        >
          <p
            {...typographyProps}
            style={{
              //   maxWidth: "100%",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {props.children}
          </p>
        </Component>
      );
    return (
      <Component
        ref={ref}
        // className={`${defaultStyles} ${className}`}
        styles={{ ...defaultStyle, ...sx }}
        {...rest}
      >
        {props.children}
      </Component>
    );
  }
);

export default Cell;
