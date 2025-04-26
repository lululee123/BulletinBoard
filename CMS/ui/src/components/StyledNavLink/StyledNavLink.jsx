import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Flex, Space, Text, useColorStyle } from "@tonic-ui/react";
import PropTypes from "prop-types";
import "./style.css";

const StyledNavLink = ({ to, icon, label }) => {
  const [colorStyle] = useColorStyle();
  const textColor = colorStyle.color.primary;
  const iconColor = colorStyle.color.secondary;
  const { pathname } = useLocation();

  const getIsActive = () => {
    switch (to) {
      case "/":
        return (
          pathname === to ||
          pathname.includes("rooms") ||
          pathname.includes("room")
        );
      default:
        return false;
    }
  };

  return (
    <NavLink
      to={to}
      className={() =>
        `nav-link ${getIsActive() ? "active-link" : "non-active-link"}`
      }
    >
      <Flex alignItems="center" paddingX="3x" paddingY="2x">
        {React.cloneElement(icon, { color: iconColor })}
        <Space width="2x" />
        <Text color={textColor} textDecoration="none">
          {label}
        </Text>
      </Flex>
    </NavLink>
  );
};

StyledNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default StyledNavLink;
