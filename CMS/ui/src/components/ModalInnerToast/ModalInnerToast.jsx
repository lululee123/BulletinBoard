import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Flex,
  Box,
  Text,
  Toast,
  ToastController,
  ToastTransition,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

export const ModalInnerToastContainer = (props) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    position="absolute"
    top="12x"
    left="50%"
    transform="translateX(-50%)"
    width="max-content"
    maxWidth="80%" // up to 80% of the modal or drawer width
    zIndex="toast"
    {...props}
  />
);

const ModalInnerToast = ({ toastData }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return (
    <ToastTransition in unmountOnExit>
      <ToastController
        duration={get(toastData, 'duration', null)}
        onClose={toastData?.onClose}
      >
        <Toast
          appearance={toastData?.appearance}
          isClosable
          onClose={toastData?.onClose}
          sx={{
            mb: '2x',
            minWidth: 280,
            width: 'fit-content',
            boxShadow: colorStyle.shadow.thin,
          }}
        >
          <Box mb="2x">
            <Text fontWeight="bold">{toastData?.title}</Text>
          </Box>
          <Box>
            <Text>{toastData?.content}</Text>
          </Box>
        </Toast>
      </ToastController>
    </ToastTransition>
  );
};

ModalInnerToast.propTypes = {
  toastData: PropTypes.shape({
    appearance: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    onClose: PropTypes.func,
  }),
};

export default ModalInnerToast;
