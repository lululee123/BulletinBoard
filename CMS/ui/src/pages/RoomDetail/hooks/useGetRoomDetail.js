import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "@@api";

const useGetRoomDetail = (id) => {
  return useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => getRoomDetail(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetRoomDetail;
