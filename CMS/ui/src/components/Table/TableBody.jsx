import { flexRender } from "@tanstack/react-table";
import {
  TableBody as TonicTableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
  Flex,
  Spinner,
} from "@tonic-ui/react";

export default function TableBody({ table, isLoading }) {
  const [colorStyle] = useColorStyle();

  if (isLoading) {
    return (
      <TonicTableBody>
        <TableRow width="100%">
          <TableCell width="100%">
            <Flex alignItems="center" justifyContent="center">
              <Spinner size="sm" />
            </Flex>
          </TableCell>
        </TableRow>
      </TonicTableBody>
    );
  }

  return (
    <TonicTableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          _hover={{
            backgroundColor: colorStyle.background.highlighted,
          }}
        >
          {row.getVisibleCells().map((cell) => {
            const { columnDef, getSize } = cell.column;
            const { cell: columnDefCell, minSize, style } = columnDef;

            const styleProps = {
              ...style,
              minWidth: minSize,
              width: getSize(),
            };
            return (
              <TableCell key={cell.id} {...styleProps}>
                <Truncate>
                  {flexRender(columnDefCell, cell.getContext())}
                </Truncate>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TonicTableBody>
  );
}
