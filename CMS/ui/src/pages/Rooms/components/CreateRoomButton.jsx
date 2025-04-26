import React from "react";
import { Button, Flex, Space, Text } from "@tonic-ui/react";
import { AddIcon } from "@tonic-ui/react-icons";
import { useTranslation } from "react-i18next";

const CreateRoomButton = (props) => {
  const { t } = useTranslation();

  return (
    <Button variant="primary" {...props}>
      <Flex alignItems="center">
        <AddIcon />
        <Space width="2x" />
        <Text>{t("Add")}</Text>
      </Flex>
    </Button>
  );
};

export default CreateRoomButton;
