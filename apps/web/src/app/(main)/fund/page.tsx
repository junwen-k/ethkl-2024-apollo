'use client'
import * as React from 'react'

import { FundSizeChart } from '@/components/fund-size-chart'
import { Time } from '@/components/time'
import { TotalAllocationChart } from '@/components/total-allocation-chart'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import neighbourhoodTransactions from '@/lib/data/neighbourhood.json'

const transactionTypes = {
  service_maintainence: 'Service & Maintainence Fees',
  withdrawal: 'Withdrawal',
}

const paymentRequests = [
  {
    date: '2024-10-18T01:49:56',
    amount: 2.23051,
    remark: 'Garden Maintenance',
  },
  {
    date: '2024-10-18T01:49:56',
    amount: 1.01,
    remark: 'Security & Maintenance Fees',
  },
  {
    date: '2024-10-18T01:49:56',
    amount: 0.12,
    remark: 'Shrubs cutting',
  },
] as const

export function Fund() {
  const totalPendingAmount = neighbourhoodTransactions
    .filter((d) => d.status === 'pending')
    .reduce((acc, curr) => acc + parseFloat(Number(curr.amount)), 0)
  const totalAllocatedAmount = neighbourhoodTransactions
    .filter((d) => d.status === 'fulfilled' && d.type === 'service_maintainence')
    .reduce((acc, curr) => acc + parseFloat(Number(curr.amount)), 0)

  const totalAllocation = totalAllocatedAmount + totalPendingAmount
  const percentageToTargetAllocatedAmount = (totalAllocatedAmount / totalAllocation) * 100

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid h-full grid-rows-2 gap-4 md:gap-8">
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Fund Size</CardDescription>
                <CardTitle className="text-4xl">5.75 ETH</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-xs">+14.78% from last month</div>
              </CardContent>
              <CardFooter>
                <Progress value={14.78} aria-label="14.78% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Target Allocation</CardDescription>
                <CardTitle className="text-4xl">{totalAllocation.toFixed(2)} ETH</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-xs">
                  {(100 - percentageToTargetAllocatedAmount).toFixed(2)}% to target
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={percentageToTargetAllocatedAmount} />
              </CardFooter>
            </Card>
          </div>
          <FundSizeChart />
          <TotalAllocationChart totalUnpaid={totalPendingAmount} totalPaid={totalAllocatedAmount} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Payment Requests</CardTitle>
                <CardDescription>Your pending payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Remark</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRequests.map((request) => (
                      <TooltipProvider>
                        <TableRow>
                          <TableCell>
                            <Time>{request.date}</Time>
                          </TableCell>
                          <TableCell>{request.remark}</TableCell>
                          <TableCell className="text-right">{`${request.amount} ETH`}</TableCell>
                          <TableCell className="text-right">
                            <Button>Pay</Button>
                          </TableCell>
                        </TableRow>
                      </TooltipProvider>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Transaction history within this fund.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-center">Unit No.</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Transaction Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {neighbourhoodTransactions
                      .filter((d) => d.status === 'fulfilled')
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((neighbour) => (
                        <TooltipProvider>
                          <TableRow>
                            <TableCell className="hidden md:table-cell">
                              <Time>{neighbour.date}</Time>
                            </TableCell>
                            <TableCell className="text-center">
                              <Tooltip>
                                <TooltipTrigger>{neighbour.unitNo}</TooltipTrigger>
                                <TooltipContent>{neighbour.walletAddress}</TooltipContent>
                              </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {transactionTypes[neighbour.type as keyof typeof transactionTypes]}
                            </TableCell>
                            <TableCell className="text-right">{neighbour.amount} ETH</TableCell>
                            <TableCell className="text-right">{neighbour.trxnFees} ETH</TableCell>
                          </TableRow>
                        </TooltipProvider>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fund
