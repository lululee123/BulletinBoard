import { useMutation } from "@tanstack/react-query";
import { deleteRoom } from "@@api";

const useDeleteRoom = () =>
  useMutation({
    mutationFn: (id) => deleteRoom(id),
  });

export default useDeleteRoom;
