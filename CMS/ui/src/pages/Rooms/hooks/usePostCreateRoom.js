import { useMutation } from "@tanstack/react-query";
import { createRoom } from "@@api";
import { TABLE_COLUMNS } from "@@pages/Rooms/constants/tableColumns";

const usePostCreateRoom = () =>
  useMutation({
    mutationFn: (formValue) => {
      return createRoom({
        ...formValue,
        [TABLE_COLUMNS.CREATE_DATE]: new Date(),
        [TABLE_COLUMNS.LAST_UPDATE_DATE]: new Date(),
      });
    },
  });

export default usePostCreateRoom;
