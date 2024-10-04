'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// TODO: use react table

export const UnitTransactions = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="text-muted-foreground text-sm">liam@example.com</div>
          </TableCell>
          <TableCell className="text-right">0.5E</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
