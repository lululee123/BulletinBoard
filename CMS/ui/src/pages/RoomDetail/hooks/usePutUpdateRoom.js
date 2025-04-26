import { useMutation } from "@tanstack/react-query";
import { updateRoom } from "@@api";

const usePutUpdateRoom = () =>
  useMutation({
    mutationFn: ({ id, payload }) => updateRoom({ id, payload }),
  });

export default usePutUpdateRoom;
