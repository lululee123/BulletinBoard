import { useRef, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Flex,
  Text,
  Table as TonicTable,
  useTheme,
  useColorMode,
  useColorStyle,
} from "@tonic-ui/react";
import { useTranslation } from 'react-i18next';

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({
  columns,
  data = [],
  isLoading = false,
  enableSorting = false,
  sorting = [],
  onSortingChange = () => {},
}) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const tableRef = useRef();
  const [tableWidth, setTableWidth] = useState(0);
  const { t } = useTranslation();
  let config = {
    data,
    columns,
    defaultColumn: {
      minSize: 80,
    },
    columnResizeMode: "onChange",
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.id,
  };
  if (enableSorting) {
    config = {
      ...config,
      // https://tanstack.com/table/latest/docs/api/features/sorting
      state: {
        sorting,
      },
      // https://tanstack.com/table/latest/docs/api/features/sorting#enablemultisort
      // https://tanstack.com/table/v8/docs/guide/sorting#multi-sorting
      // NOTE: Holds the Shift key while clicking on a column header to use multi-sorting
      enableMultiSort: true,
      enableSortingRemoval: true,
      sortDescFirst: true,
      // https://tanstack.com/table/latest/docs/api/features/sorting#manualsorting
      // NOTE: enable manual sorting when we are using server-side sorting
      manualSorting: true,
      onSortingChange: (OnChangeFn) => {
        const newSortingValue = OnChangeFn(sorting);
        onSortingChange(newSortingValue);
      },
    };
  }
  const table = useReactTable(config);
  const isEmptyData = isEmpty(data) && !isLoading;

  const getTextWidth = (text, font) => {
    // re-use canvas object for better performance
    const canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width || 0;
  };
  useEffect(() => {
    if (!tableWidth) {
      return;
    }

    const gutterWidth = 12 + 12; // 12px padding on each side of the cell
    const tableHeaderCellFont = [
      theme.fontWeights.semibold,
      theme.fontSizes.sm,
      theme.fonts.base,
    ].join(" "); // => '600 14px "Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif'

    // Fixed columns are columns with a fixed size (e.g. 100 or '10%')
    const fixedColumns = table
      .getAllColumns()
      .filter((column) => column.columnDef.size !== "auto")
      .map((column) => {
        const { id, columnDef } = column;
        const { minSize, size } = columnDef;

        // If the column size is a number, return the original size value
        if (typeof size === "number") {
          return {
            id,
            size,
          };
        }
        // If the column size is a percentage, return the computed size value
        if (typeof size === "string" && size.endsWith("%")) {
          const textWidth =
            typeof columnDef.header === "string"
              ? getTextWidth(columnDef.header, tableHeaderCellFont)
              : 0;
          const percentageWidth = (tableWidth * parseFloat(size)) / 100;

          return {
            id,
            size: Math.max(
              percentageWidth, // percentage of table width
              textWidth + gutterWidth, // text width with padding
              minSize // minimum size (e.g. 80px)
            ),
          };
        }

        // Otherwise, return the minimum size value
        return {
          id,
          size: minSize,
        };
      });

    // Flexible columns are columns with a flexible size (e.g. 'auto')
    const flexColumns = table
      .getAllColumns()
      .filter((column) => column.columnDef.size === "auto")
      .map((column) => {
        const { id, columnDef } = column;
        const { minSize } = columnDef;
        const textWidth =
          typeof columnDef.header === "string"
            ? getTextWidth(columnDef.header, tableHeaderCellFont)
            : 0;

        return {
          id,
          size: Math.max(
            textWidth + gutterWidth, // text width with padding
            minSize // minimum size (e.g. 80px)
          ),
        };
      });

    const totalFixedColumnSize = fixedColumns.reduce(
      (acc, column) => acc + column.size,
      0
    );
    const totalFlexColumnSize = flexColumns.reduce(
      (acc, column) => acc + column.size,
      0
    );

    let extraSpaceLeft = tableWidth - totalFixedColumnSize;
    // Distribute extra space to fixed columns if flex columns are not present
    if (flexColumns.length === 0 && extraSpaceLeft > 0) {
      const extraSpacePerColumn = extraSpaceLeft / fixedColumns.length;
      fixedColumns.forEach((column) => {
        column.size = column.size + extraSpacePerColumn;
      });
      extraSpaceLeft = 0;
    }

    // Distribute extra space to flex columns if flex columns are present
    if (flexColumns.length > 0 && extraSpaceLeft > totalFlexColumnSize) {
      /**
       * Assume that the extra space is 500px and the total flex column size is 400px:
       * > extraSpaceLeft = 500
       * > flexColumns = [ { size: 250 }, { size: 150 } ] // => Total size: 400px
       *
       * Iteration #0:
       * > column.size = Math.max(500 / (2 - 0), 250) = Math.max(250, 250) = 250
       * > extraSpaceLeft = 500 - 250 = 250
       *
       * Iteration #1:
       * > column.size = Math.max(250 / (2 - 1), 150) = Math.max(250, 150) = 250
       * > extraSpaceLeft = 250 - 250 = 0
       */
      flexColumns.forEach((column, index) => {
        column.size = Math.max(
          extraSpaceLeft / (flexColumns.length - index),
          column.size
        );
        extraSpaceLeft -= column.size;
      });
    }
    const columnSizing = {};

    for (let i = 0; i < fixedColumns.length; i++) {
      const column = fixedColumns[i];
      columnSizing[column.id] = column.size;
    }
    for (let i = 0; i < flexColumns.length; i++) {
      const column = flexColumns[i];
      columnSizing[column.id] = column.size;
    }

    table.setColumnSizing(columnSizing);
  }, [columns, table, tableWidth, theme]);

  return (
    <>
      <AutoSizer
        disableHeight
        onResize={({ width }) => {
          if (tableWidth !== width) {
            setTableWidth(width);
          }
        }}
      >
        {({ width }) => (
          <TonicTable
            ref={tableRef}
            sx={{
              // Hide the table if there is no column sizing state
              visibility: isEmpty(table.getState().columnSizing)
                ? "hidden"
                : "visible",
              width,
            }}
          >
            <TableHeader
              table={table}
              tableRef={tableRef}
              isLoading={isLoading}
            />
            {!isEmptyData && <TableBody table={table} isLoading={isLoading} />}
          </TonicTable>
        )}
      </AutoSizer>
      {isEmptyData && (
        <Flex flex={1} alignItems="center" justifyContent="center" mt="4x">
          <Text color={colorStyle?.color?.secondary}>
            {t("No data")}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Table;
