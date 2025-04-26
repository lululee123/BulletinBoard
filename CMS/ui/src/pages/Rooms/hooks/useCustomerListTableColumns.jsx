import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DeleteIcon } from "@tonic-ui/react-icons";
import { Link } from "@tonic-ui/react";
import { get } from "lodash";

import IconWithStyle from "@@components/IconWithStyle";
import { useOpenModalTypeContext } from "../context/OpenModalTypeContext";
import { TABLE_COLUMNS } from "../constants/tableColumns";
import { MODAL_TYPES } from "../constants/modalTypes";

export default function useCustomerListTableColumns() {
  const { t } = useTranslation();
  const { setOpenModalType, setModalData } = useOpenModalTypeContext();

  const columns = useMemo(
    () => [
      {
        header: t("Name"),
        accessorKey: TABLE_COLUMNS.NAME,
        enableResizing: true,
        enableSorting: false,
        size: "auto",
        cell: ({ row }) => (
          <Link href={`/room/${row.original._id}`}>
            {row.original[TABLE_COLUMNS.NAME]}
          </Link>
        ),
      },
      {
        header: t("Address"),
        accessorKey: TABLE_COLUMNS.ADDRESS,
        enableResizing: true,
        enableSorting: false,
        size: "auto",
        cell: ({ row }) => row.original[TABLE_COLUMNS.ADDRESS],
      },
      {
        header: "",
        accessorKey: TABLE_COLUMNS.ACTION,
        enableResizing: false,
        enableSorting: false,
        size: "50px",
        cell: ({ row }) => (
          <IconWithStyle
            hoverable
            onClick={() => {
              setModalData(get(row, "original"));
              setOpenModalType(MODAL_TYPES.DELETE_ROOM);
            }}
          >
            <DeleteIcon />
          </IconWithStyle>
        ),
      },
    ],
    []
  );

  return columns;
}
