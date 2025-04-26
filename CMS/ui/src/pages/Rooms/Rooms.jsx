import React from "react";
import { Flex, Stack } from "@tonic-ui/react";
import { RefreshIcon } from "@tonic-ui/react-icons";
import { get } from "lodash";
import PageBase from "@@components/PageBase";
import useCustomerListTableColumns from "./hooks/useCustomerListTableColumns";
import Table from "@@components/Table";
import IconWithStyle from "@@components/IconWithStyle";
import {
  OpenModalTypeProvider,
  useOpenModalTypeContext,
} from "./context/OpenModalTypeContext";
import useGetRoomList from "./hooks/useGetRoomList";
import CreateRoomButton from "./components/CreateRoomButton";
import CreateRoomModal from "./components/CreateRoomModal";
import DeleteRoomModal from "./components/DeleteRoomModal";
import { MODAL_TYPES } from "./constants/modalTypes";

const Rooms = () => {
  const columns = useCustomerListTableColumns();
  const { data, isFetching, refetch: refetchRoomList } = useGetRoomList();
  const { openModalType, setOpenModalType, modalData } = useOpenModalTypeContext();

  return (
    <PageBase>
      <Flex justifyContent="space-between" alignItems="center" mb="4x">
        <Stack gap="2x" direction="row">
          <CreateRoomButton
            onClick={() => openModalType(MODAL_TYPES.CREATE_ROOM)}
          />
        </Stack>
        <Stack gap="2x" direction="row">
          <IconWithStyle
            hoverable
            onClick={() => {
              refetchRoomList();
            }}
          >
            <RefreshIcon />
          </IconWithStyle>
        </Stack>
      </Flex>
      <Table columns={columns} data={data} isLoading={isFetching} />
      {openModalType === MODAL_TYPES.CREATE_ROOM && (
        <CreateRoomModal
          onClose={() => {
            refetchRoomList();
            setOpenModalType(null);
          }}
        />
      )}
      {openModalType === MODAL_TYPES.DELETE_ROOM && (
        <DeleteRoomModal
          id={get(modalData, "_id")}
          refetchRoomList={refetchRoomList}
          onClose={() => {
            setOpenModalType(null);
          }}
        />
      )}
    </PageBase>
  );
};

const RoomsWrapper = () => (
  <OpenModalTypeProvider>
    <Rooms />
  </OpenModalTypeProvider>
);

export default RoomsWrapper;
