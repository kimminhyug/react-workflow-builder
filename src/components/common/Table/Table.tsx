import { useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

interface ITableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  enableRowCheckbox?: boolean;
  onClickRow?: (e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
}

export const Table = <T extends object>({
  data,
  columns,
  enableRowCheckbox = false,
}: ITableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 정렬시 꼬임 방지, 중복 id방지 하기 위해 set으로 처리
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  const allChecked =
    table.getRowModel().rows.length > 0 && selectedRowIds.size === table.getRowModel().rows.length;
  // 부분선택
  const isIndeterminate = selectedRowIds.size > 0 && !allChecked;

  const handleToggleAll: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(new Set(table.getRowModel().rows.map((row) => row.id)));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const handleToggleRow =
    (rowId: string): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setSelectedRowIds((prev) => {
        const newSet = new Set(prev);
        if (e.target.checked) {
          newSet.add(rowId);
        } else {
          newSet.delete(rowId);
        }
        return newSet;
      });
    };

  return (
    <table className="custom-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup, idx) => (
          <tr key={headerGroup.id}>
            {enableRowCheckbox && (
              <th key={`row-checkbox-${idx}`} className="custom-th" style={{ width: 20 }}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleToggleAll}
                />
              </th>
            )}
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="custom-th" style={{ width: header.column.getSize() }}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="custom-tr">
            {enableRowCheckbox && (
              <td key={`row-checkbox-${row.id}`} className="custom-td" style={{ width: 20 }}>
                <input
                  type="checkbox"
                  checked={selectedRowIds.has(row.id)}
                  onChange={handleToggleRow(row.id)}
                />
              </td>
            )}
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="custom-td" style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
