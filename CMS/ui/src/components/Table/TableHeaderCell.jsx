import { flexRender } from "@tanstack/react-table";
import {
  Flex,
  TableCell,
  Truncate,
  ResizeHandle,
  useColorStyle,
} from "@tonic-ui/react";
import { SortDownIcon, SortUpIcon } from "@tonic-ui/react-icons";

export default function TableHeaderCell({ header, resizeHandleSX }) {
  const [colorStyle] = useColorStyle();

  const { columnDef } = header.column;
  const { style, minSize } = columnDef;

  let styleProps = {
    ...style,
    position: "relative",
    minWidth: minSize,
    width: header.getSize(),
  };

  if (header.column.getCanSort()) {
    styleProps = {
      ...styleProps,
      cursor: "pointer",
      userSelect: "none",
      _hover: {
        backgroundColor: colorStyle.background.highlighted,
      },
    };
  }

  if (header.column.getIsSorted()) {
    styleProps = {
      ...styleProps,
      color: colorStyle.color.emphasis,
    };
  }

  return (
    <TableCell key={header.id} {...styleProps}>
      <Truncate>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </Truncate>
      {header.column.columnDef.enableResizing !== false && (
        <ResizeHandle
          sx={resizeHandleSX}
          // The following `onMouseDown` and `onTouchStart` props are required for the resize handle to work with `@tanstack/react-table`
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        />
      )}
    </TableCell>
  );
}
