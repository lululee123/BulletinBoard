import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@tonic-ui/react';

const Section = ({ title, isLast, children, ...props }) => (
  <Box mb={isLast ? '0' : '6x'} {...props}>
    <Text size="sm" mb="4x">
      {title}
    </Text>
    {children}
  </Box>
);

Section.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isLast: PropTypes.bool,
  children: PropTypes.node,
};

export default Section;
