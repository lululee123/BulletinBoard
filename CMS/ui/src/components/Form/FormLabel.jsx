import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  TextLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@tonic-ui/react';
import { InfoSIcon } from '@tonic-ui/react-icons';

export const FormLabel = ({ required = false, label = '', toolTip }) => (
  <Flex>
    <TextLabel
      display="inline-flex"
      alignItems="center"
      size="sm"
      whiteSpace="nowrap"
      height={32}
      data-testid="form-label-label"
      sx={[
        required && {
          '&::after': {
            content: '"*"',
            color: 'red:60',
          },
        },
      ]}
    >
      {label}
    </TextLabel>
    {toolTip && (
      <Popover trigger="hover" placement="right">
        <PopoverTrigger data-testid="form-label-tooltip">
          <InfoSIcon
            ml="1x"
            mt={8}
            width={16}
            height={16}
            color="white:secondary"
            cursor="pointer"
            sx={[
              {
                '&:hover': {
                  color: 'white:primary',
                },
              },
            ]}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>{toolTip}</PopoverBody>
        </PopoverContent>
      </Popover>
    )}
  </Flex>
);

FormLabel.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  toolTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
