import React from "react";
import { useParams } from "react-router-dom";
import { get, isEqual, isEmpty, values } from "lodash";
import { useTranslation } from "react-i18next";
import {
  Link,
  Flex,
  Box,
  Space,
  Toast,
  Stack,
  Text,
  useToastManager,
} from "@tonic-ui/react";
import dayjs from "dayjs";

import PageBase from "@@components/PageBase";
import RoomDetailForm from "@@components/RoomDetailForm";
import {
  RoomDetailFormProvider,
  useRoomDetailFormContext,
} from "@@components/RoomDetailForm/context/RoomDetailFormContext";
import checkFormValidation from "@@components/RoomDetailForm/utils/checkFormValidation";
import { DEFAULT_DATE_FORMAT } from "@@constants";
import { FormContainer, FormRowText } from "@@components/Form";
import Section from "@@components/Section";
import { TABLE_COLUMNS } from "@@pages/Rooms/constants/tableColumns";
import useGetRoomDetail from "./hooks/useGetRoomDetail";
import ActionBar from "./components/ActionBar";
import usePutUpdateRoom from "./hooks/usePutUpdateRoom";

const RoomDetailContent = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading, isSuccess } = useGetRoomDetail(id);
  const { formValue, handleFormErrorChange } = useRoomDetailFormContext();
  const { mutateAsync: updateRoom } = usePutUpdateRoom();
  const toast = useToastManager();

  const handleOnSave = async () => {
    const errors = checkFormValidation(formValue);
    handleFormErrorChange(errors);

    if (!isEmpty(values(errors))) {
      return;
    }

    try {
      await updateRoom({
        id,
        payload: formValue,
      });
      toast(
        ({ onClose }) => (
          <Toast appearance="success" width={320} onClose={onClose} isClosable>
            <Stack gap="2x">
              <Text>{t("Success")}</Text>
              <Text>{t("Room updated successfully")}</Text>
            </Stack>
          </Toast>
        ),
        {
          placement: "bottom-right",
          duration: 3000,
        }
      );
    } catch {
      toast(
        ({ onClose }) => (
          <Toast appearance="error" width={320} onClose={onClose} isClosable>
            <Stack gap="2x">
              <Text>{t("Error")}</Text>
              <Text>{t("Failed to update room")}</Text>
            </Stack>
          </Toast>
        ),
        {
          placement: "bottom-right",
          duration: null,
        }
      );
    }
  };

  return (
    <PageBase
      isLoading={isLoading || !isSuccess}
      title={
        <Flex>
          <Link href="/Rooms">{t("Rooms")}</Link>
          <Space width="2x" />
          <Box>{">"}</Box>
          <Space width="2x" />
          <>{get(data, "name", "")}</>
        </Flex>
      }
    >
      <RoomDetailForm data={data} />
      <Section title={t("Extra info")}>
        <FormContainer>
          <FormRowText
            label={t("Create date:")}
            info={{
              key: TABLE_COLUMNS.CREATE_DATE,
              value: dayjs(get(formValue, TABLE_COLUMNS.CREATE_DATE)).format(
                DEFAULT_DATE_FORMAT
              ),
            }}
          />
          <FormRowText
            label={t("Last update date:")}
            info={{
              key: TABLE_COLUMNS.LAST_UPDATE_DATE,
              value: dayjs(
                get(formValue, TABLE_COLUMNS.LAST_UPDATE_DATE)
              ).format(DEFAULT_DATE_FORMAT),
            }}
          />
        </FormContainer>
      </Section>
      <ActionBar
        isCanSave={!isEqual(data, formValue)}
        onSave={handleOnSave}
      />
    </PageBase>
  );
};

const RoomDetail = (props) => (
  <RoomDetailFormProvider>
    <RoomDetailContent {...props} />
  </RoomDetailFormProvider>
);

export default RoomDetail;
