import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import {
  Grid,
  Flex,
  Input,
  Box,
  Stack,
  Text,
  useColorMode,
  useColorStyle,
} from "@tonic-ui/react";
import { FormLabel } from "./FormLabel";

export const FormRowText = ({
  required = false,
  label = "",
  toolTip = "",
  info = {},
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <>
      <Grid>
        <FormLabel required={required} label={label} toolTip={toolTip} />
      </Grid>
      <Grid>
        <Flex>
          <Flex key={get(info, "key")} width="100%" alignItems="center">
            <Text>{get(info, "value")}</Text>
          </Flex>
          {get(info, "hint") && (
            <Box mt="1x">
              <Text size="sm" color={colorStyle?.color?.secondary}>
                {get(info, "hint")}
              </Text>
            </Box>
          )}
        </Flex>
      </Grid>
    </>
  );
};

FormRowText.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  toolTip: PropTypes.string,
  info: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hint: PropTypes.string,
  }),
};
