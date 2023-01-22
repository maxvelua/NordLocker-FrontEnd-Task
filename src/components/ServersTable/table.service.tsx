import { ColumnHelper } from "@tanstack/react-table";
import { Server } from "../../types/types";

export const getTableColumns = (columnHelper: ColumnHelper<Server>) => {
  return [
    columnHelper.accessor("name", {
      header: "Servers",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("distance", {
      header: "Distance",
      cell: (info) => info.getValue(),
    }),
  ];
};
