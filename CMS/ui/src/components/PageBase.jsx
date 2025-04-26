import React from "react";
import { Box, Text, Divider } from "@tonic-ui/react";
import PropTypes from "prop-types";
import PageContentLoading from "./PageContentLoading";

const PageBase = ({ children, isLoading = false, title = "" }) => {
  return (
    <Box padding="4x" width="100%" height="100%" boxSizing="border-box" position="relative">
      {isLoading ? (
        <PageContentLoading />
      ) : (
        <>
          {title && (
            <>
              <Text size="xl">{title}</Text>
              <Divider marginY="4x" />
            </>
          )}
          {children}
        </>
      )}
    </Box>
  );
};

PageBase.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default PageBase;
