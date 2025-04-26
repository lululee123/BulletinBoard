import {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import { TABLE_COLUMNS } from "@@pages/Rooms/constants/tableColumns";

const DEFAULT_ROOM_FORM_VALUE = {
  [TABLE_COLUMNS.NAME]: "",
  [TABLE_COLUMNS.ADDRESS]: "",
  [TABLE_COLUMNS.PHOTOS]: [],
};

const ROOM_FORM_ERROR = {
  [TABLE_COLUMNS.NAME]: "",
  [TABLE_COLUMNS.ADDRESS]: "",
};

const RoomDetailFormContext = createContext(undefined);

export const RoomDetailFormProvider = ({ children }) => {
  const [formValue, setFormValue] = useState(DEFAULT_ROOM_FORM_VALUE);
  const [formError, setCreateCustomerFormError] = useState(ROOM_FORM_ERROR);

  const handleFormChange = useCallback((updatedFields) => {
    setFormValue((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  }, []);

  const handleFormErrorChange = useCallback((updatedFields) => {
    setCreateCustomerFormError((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  }, []);

  const value = useMemo(() => {
    return {
      formValue,
      handleFormChange,
      formError,
      handleFormErrorChange,
    };
  }, [formValue, handleFormChange, formError, handleFormErrorChange]);

  return (
    <RoomDetailFormContext.Provider value={value}>
      {children}
    </RoomDetailFormContext.Provider>
  );
};

export const useRoomDetailFormContext = () => useContext(RoomDetailFormContext);
