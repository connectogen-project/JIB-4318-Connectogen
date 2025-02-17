"use client"

import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // States for connection modal
  const [selectedRow, setSelectedRow] = useState<TData | null>(null)
  const [optionalMessage, setOptionalMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmitConnect = () => {
    // Integrate your connection request logic / API call here.
    console.log(
      "Submitting connection request for",
      selectedRow,
      "with message:",
      optionalMessage
    )
    // Reset state after submission.
    setOptionalMessage("")
    setIsModalOpen(false)
    setSelectedRow(null)
  }

  const handleCancelConnect = () => {
    setOptionalMessage("")
    setIsModalOpen(false)
    setSelectedRow(null)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Extra header cell for the Connect button */}
                <TableHead key="connect" className="w-24"></TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group relative"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* "Connect" button cell – hidden by default, appears on row hover */}
                  <TableCell className="w-24">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="invisible group-hover:visible"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering other row events.
                        setSelectedRow(row.original)
                        setIsModalOpen(true)
                      }}
                    >
                      Connect
                    </Button>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal / Card for the connection request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Send Connection Request</h2>
            <p className="mb-2">
              Would you like to add an optional message to your connection request?
            </p>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows={4}
              placeholder="Optional message..."
              value={optionalMessage}
              onChange={(e) => setOptionalMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelConnect}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSubmitConnect}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}