import { useQuery } from "@tanstack/react-query";
import { getRoomList } from "@@api";

const useGetRoomList = () => {
  return useQuery({
    queryKey: ["roomList"],
    queryFn: () => getRoomList(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetRoomList;
