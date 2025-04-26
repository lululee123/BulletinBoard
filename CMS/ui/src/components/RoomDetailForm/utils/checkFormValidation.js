import { get } from "lodash";
import i18next from "@@utils/i18next";
import { TABLE_COLUMNS } from "@@pages/Rooms/constants/tableColumns";

const checkFormValidation = (formValue) => {
  const REQUIRED_TEXT = i18next.t("Required field.");
  const errors = {};

  // name
  if (!get(formValue, [TABLE_COLUMNS.NAME])) {
    errors[TABLE_COLUMNS.NAME] = REQUIRED_TEXT;
  }

  // address
  if (!get(formValue, [TABLE_COLUMNS.ADDRESS])) {
    errors[TABLE_COLUMNS.ADDRESS] = REQUIRED_TEXT;
  }

  return errors;
};

export default checkFormValidation;
