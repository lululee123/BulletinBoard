import { Box, useTheme, useColorStyle } from "@tonic-ui/react";
import PropTypes from "prop-types";

const IconWithStyle = ({ children, hoverable = false, ...props }) => {
  const { colors } = useTheme();
  const [colorStyle] = useColorStyle();
  const iconColor = colorStyle.color.primary;

  return (
    <Box
      sx={{
        color: iconColor,
        cursor: hoverable ? "pointer" : "default",
        "&:hover > svg": {
          fill: hoverable ? colors["blue:50"] : iconColor,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

IconWithStyle.propTypes = {
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
};

export default IconWithStyle;
