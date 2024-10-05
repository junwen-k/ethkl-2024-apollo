'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const UnitTransactions = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Remark</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Garden Maintenance</TableCell>
          <TableCell className="text-destructive text-right">-2.23051 ETH</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Security & Maintenance Fees</TableCell>
          <TableCell className="text-destructive text-right">-1.01 ETH</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Shrubs cutting</TableCell>
          <TableCell className="text-destructive text-right">-0.12 ETH</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
