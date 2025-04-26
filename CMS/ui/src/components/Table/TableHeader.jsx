import { TableHeader as TonicTableHeader, TableRow } from "@tonic-ui/react";
import TableHeaderCell from "./TableHeaderCell";

export default function TableHeader({ table, tableRef }) {
  const tableHeight = tableRef.current?.clientHeight ?? "100%";

  return (
    <TonicTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const { columnSizingInfo } = table.getState();
            const isResizingColumn =
              columnSizingInfo.isResizingColumn === header.column.id;

            const resizeHandleSX = (() => {
              const dividerColor = "gray:50";
              const highlightedDividerColor = "gray:50";
              const dividerWidth = 1;
              const hoverableWidth = 8;
              const translucentWidth = 4;

              return {
                // You must specify absolute positioning for the resize handle to work correctly
                position: "absolute",
                top: 0,
                right:
                  -1 *
                  (isResizingColumn
                    ? dividerWidth + translucentWidth
                    : hoverableWidth),
                height: isResizingColumn ? tableHeight : "9x",
                zIndex: 1,
                borderLeft: dividerWidth,
                borderLeftColor: isResizingColumn
                  ? highlightedDividerColor
                  : dividerColor,
                opacity: isResizingColumn ? 1 : 0,
                _hover: {
                  height: tableHeight,
                  opacity: 1,
                  borderLeftColor: highlightedDividerColor,
                },
              };
            })();

            return (
              <TableHeaderCell
                key={header.id}
                header={header}
                resizeHandleSX={resizeHandleSX}
              />
            );
          })}
        </TableRow>
      ))}
    </TonicTableHeader>
  );
}
