// 'use client';

// import {
//   ColumnDef,
//   PaginationState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { useFetchAccountQuery } from '@/store/apis/accountApi';
// import React from 'react';
// import { columns } from './columns';

// interface DataTableProps<TData, TValue> {
//   searchTerm?: string;
//   data:
// }

// export default function DataTable<TData, TValue>({ searchTerm }: DataTableProps<TData, TValue>) {
//   console.log('ghghh', data);
//   const { list, paging } = data!;
//   const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
//     pageIndex: paging.current_page - 1,
//     pageSize: paging.limit,
//   });
//   const fetchDataOptions = {
//     pageIndex,
//     pageSize,
//   };
//   const pagination = React.useMemo(
//     () => ({
//       pageIndex,
//       pageSize,
//     }),
//     [pageIndex, pageSize]
//   );

//   const table = useReactTable({
//     data: list,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     pageCount: paging.total_page,
//     onPaginationChange: setPagination,
//     state: {
//       pagination,
//     },
//     manualPagination: true,
//   });
//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center ">
//                 Không tìm thấy tài khoản
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<'}
//         </button>
//         <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           {'>'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>>'}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//       </div>
//     </div>
//   );
// }
