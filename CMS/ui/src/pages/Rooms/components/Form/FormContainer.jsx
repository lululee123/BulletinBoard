import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@tonic-ui/react';

export const FormContainer = ({ children }) => (
  <Grid templateColumns="min-content auto" columnGap="7x" rowGap="4x">
    {children}
  </Grid>
);

FormContainer.propTypes = {
  children: PropTypes.node,
};
