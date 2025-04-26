import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Space,
} from "@tonic-ui/react";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import useDeleteRoom from "../../hooks/useDeleteRoom";

import ModalInnerToast, {
  ModalInnerToastContainer,
} from "@@components/ModalInnerToast";

const DeleteRoomModal = ({
  id,
  refetchRoomList = () => {},
  onClose = () => {},
}) => {
  console.log(id);
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeleteRoom();
  const [modalInnerToast, setModalInnerToast] = useState({});
  const handleOnClickDelete = async () => {
    try {
      await mutateAsync(id);
      refetchRoomList();
      onClose();
    } catch {
      setModalInnerToast({
        appearance: "error",
        title: t("Error"),
        content: t("Fail to delete room"),
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
      size="sm"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalInnerToastContainer>
          {!isEmpty(modalInnerToast) && (
            <ModalInnerToast toastData={modalInnerToast} />
          )}
        </ModalInnerToastContainer>
        <ModalHeader>{t("Delete room")}</ModalHeader>
        <ModalBody>{t("Are you sure you want to delete this room?")}</ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            minWidth="20x"
            disabled={isPending}
            onClick={handleOnClickDelete}
          >
            {t("Delete")}
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

DeleteRoomModal.propTypes = {
  id: PropTypes.string.isRequired,
  refetchRoomList: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteRoomModal;
