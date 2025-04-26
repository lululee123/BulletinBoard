import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useRoomDetailFormContext } from "./context/RoomDetailFormContext";
import { FormContainer, FormRowInput, FormRowPhotoUpload } from "../Form";
import Section from "../Section";
import { TABLE_COLUMNS } from "@@pages/Rooms/constants/tableColumns";

const RoomDetailForm = ({ data }) => {
  const { t } = useTranslation();
  const { formValue, handleFormChange, formError, handleFormErrorChange } =
    useRoomDetailFormContext();

  useEffect(() => {
    if (data) {
      handleFormChange(data);
    }
  }, [data]);

  return (
    <>
      <Section title={t("Room info")}>
        <FormContainer>
          <FormRowInput
            required
            label={t("Name:")}
            inputs={[
              {
                key: TABLE_COLUMNS.NAME,
                value: get(formValue, TABLE_COLUMNS.NAME),
                onChange: (value) => {
                  handleFormChange({
                    [TABLE_COLUMNS.NAME]: value,
                  });
                  handleFormErrorChange({
                    [TABLE_COLUMNS.NAME]: "",
                  });
                },
                style: {
                  width: "300px",
                },
                error: get(formError, TABLE_COLUMNS.NAME),
              },
            ]}
          />
          <FormRowInput
            required
            label={t("Address:")}
            inputs={[
              {
                key: TABLE_COLUMNS.ADDRESS,
                value: get(formValue, TABLE_COLUMNS.ADDRESS),
                onChange: (value) => {
                  handleFormChange({
                    [TABLE_COLUMNS.ADDRESS]: value,
                  });
                  handleFormErrorChange({
                    [TABLE_COLUMNS.ADDRESS]: "",
                  });
                },
                style: {
                  width: "600px",
                },
                error: get(formError, TABLE_COLUMNS.ADDRESS),
              },
            ]}
          />
          <FormRowPhotoUpload
            label={t("Photos:")}
            inputs={[
              {
                key: TABLE_COLUMNS.PHOTOS,
                value: get(formValue, TABLE_COLUMNS.PHOTOS),
                onChange: (value) => {
                  handleFormChange({
                    [TABLE_COLUMNS.PHOTOS]: value,
                  });
                },
              },
            ]}
          />
        </FormContainer>
      </Section>
    </>
  );
};

export default RoomDetailForm;
