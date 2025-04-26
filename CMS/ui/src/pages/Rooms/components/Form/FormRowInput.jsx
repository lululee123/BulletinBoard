import React from 'react';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import {
  Grid,
  Flex,
  Input,
  Box,
  Stack,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { FormInlineError } from './FormInlineError';
import { FormLabel } from './FormLabel';

export const FormRowInput = ({
  required = false,
  label = '',
  toolTip = '',
  inputs = [],
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
          {map(
            inputs,
            (
              {
                key,
                value,
                type,
                placeholder,
                onChange,
                startAdornment,
                endAdornment,
                error,
                hint,
                ...props
              },
              index
            ) => (
              <Stack key={key} width="100%">
                <Flex key={key} width="100%" alignItems="center">
                  {startAdornment}
                  <Input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    error={error}
                    data-testid={key}
                    {...props}
                  />
                  {endAdornment}
                  {index !== size(inputs) - 1 && <Box mx="1x">-</Box>}
                </Flex>
                {hint && (
                  <Box mt="1x">
                    <Text size="sm" color={colorStyle?.color?.secondary}>
                      {hint}
                    </Text>
                  </Box>
                )}
                {error && (
                  <Box mt="1x">
                    <FormInlineError>{error}</FormInlineError>
                  </Box>
                )}
              </Stack>
            )
          )}
        </Flex>
      </Grid>
    </>
  );
};

FormRowInput.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  toolTip: PropTypes.string,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      maxLength: PropTypes.number,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      startAdornment: PropTypes.node,
      endAdornment: PropTypes.node,
      error: PropTypes.string,
      hint: PropTypes.string,
    })
  ),
};
