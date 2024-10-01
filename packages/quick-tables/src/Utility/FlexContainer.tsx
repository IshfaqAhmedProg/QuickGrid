import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
} from "react";

type FlexContainerProps = {
  component?: ElementType;
  sx?: CSSProperties;
} & ComponentPropsWithoutRef<"div">;

const FlexContainer = forwardRef<HTMLDivElement, FlexContainerProps>(
  function Container(props, ref) {
    const { component, sx, ...rest } = props;

    const Component = component ?? "div";

    return (
      <Component ref={ref} style={{ display: "flex", ...sx }} {...rest}>
        {props.children}
      </Component>
    );
  }
);

export default FlexContainer;
