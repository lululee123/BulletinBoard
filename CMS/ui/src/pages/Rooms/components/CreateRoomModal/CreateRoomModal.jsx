import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Button,
  Space,
} from "@tonic-ui/react";
import { useTranslation } from "react-i18next";
import { isEmpty, values } from "lodash";
import RoomDetailForm from "@@components/RoomDetailForm";
import {
  RoomDetailFormProvider,
  useRoomDetailFormContext,
} from "@@components/RoomDetailForm/context/RoomDetailFormContext";
import checkFormValidation from "@@components/RoomDetailForm/utils/checkFormValidation";
import usePostCreateRoom from "../../hooks/usePostCreateRoom";
import ModalInnerToast, {
  ModalInnerToastContainer,
} from "@@components/ModalInnerToast";

const CreateRoomModalContent = ({ onClose = () => {} }) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = usePostCreateRoom();
  const { formValue, handleFormErrorChange } = useRoomDetailFormContext();
  const [modalInnerToast, setModalInnerToast] = useState({});

  const handleFormSubmit = async () => {
    const errors = checkFormValidation(formValue);
    handleFormErrorChange(errors);

    if (!isEmpty(values(errors))) {
      return;
    }

    try {
      await mutateAsync(formValue);
      onClose();
    } catch {
      setModalInnerToast({
        appearance: "error",
        title: t("Error"),
        content: t("Fail to create room"),
        onClose: () => {
          setModalInnerToast({});
        },
      });
    }
  };

  return (
    <Modal
      isOpen
      isClosable
      onClose={onClose}
      scrollBehavior="outside"
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalInnerToastContainer>
          {!isEmpty(modalInnerToast) && (
            <ModalInnerToast toastData={modalInnerToast} />
          )}
        </ModalInnerToastContainer>
        <ModalHeader>{t("New room")}</ModalHeader>
        <ModalBody>
          <Box maxHeight={480} overflow="auto">
            <RoomDetailForm />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            minWidth="20x"
            disabled={isPending}
            onClick={handleFormSubmit}
          >
            {t("Create")}
          </Button>
          <Space width="2x" />
          <Button minWidth="20x" onClick={onClose}>
            {t("Close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CreateRoomModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const CreateRoomModal = (props) => (
  <RoomDetailFormProvider>
    <CreateRoomModalContent {...props} />
  </RoomDetailFormProvider>
);

export default CreateRoomModal;
