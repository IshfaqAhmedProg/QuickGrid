import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
} from "react";
import { useTable } from "../Table/TableProvider";

type CardProps = {
  component?: ElementType;
  sx?: CSSProperties;
  //   typographyProps?: ComponentPropsWithoutRef<"p">;
} & ComponentPropsWithoutRef<"div">;

const Card = forwardRef<HTMLDivElement, CardProps>(
  function InnerCard(props, ref) {
    const { component, sx, ...rest } = props;
    const table = useTable();

    const Component = component ?? "div";

    const defaultStyle: CSSProperties = {
      //   display: "flex",
      width: table.theme?.cardWidth,
      height: table.theme?.cardHeight,
      overflow: "hidden",
    };

    return (
      <Component ref={ref} style={{ ...defaultStyle, ...sx }} {...rest}>
        {props.children}
      </Component>
    );
  }
);

export default Card;
