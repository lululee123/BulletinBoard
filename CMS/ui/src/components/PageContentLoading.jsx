import React from "react";
import { Flex, Spinner } from "@tonic-ui/react";

const PageContentLoading = (props) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    width="100%"
    height="100%"
    {...props}
  >
    <Spinner size="md" />
  </Flex>
);

export default PageContentLoading;
