import "./style.scss";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Server } from "../../types/types";
import { getTableColumns } from "./table.service";
import { Fragment, useMemo, useState } from "react";

interface Props {
  items: Server[];
}

export function ServersTable({ items }: Props) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Server>();

  const columns = useMemo(() => getTableColumns(columnHelper), [columnHelper]);

  const table = useReactTable<Server>({
    data: items,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table">
      <thead className="table__header">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className="table__title">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.getCanSort() && (
                        <div className="table__buttons-wrapper">
                          <button
                            data-testid={`${header.column.columnDef.header}-button-ascending`}
                            className="table__button"
                            onClick={() => header.column.toggleSorting(true)}
                          >
                            ▲
                          </button>
                          <button
                            data-testid={`${header.column.columnDef.header}-button-descending`}
                            className="table__button"
                            onClick={() => header.column.toggleSorting(false)}
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="table__body">
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <tr
              className={`table__row ${
                row.getIsSelected() ? "table__row--selected" : ""
              }`}
              onClick={() => row.toggleSelected(!row.getIsSelected())}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className="table__data" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
