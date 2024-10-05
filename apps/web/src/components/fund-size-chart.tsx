'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A multiple line chart'

const chartData = [
  { month: 'May', withdrawal: 2.2, fund: 6.0 },
  { month: 'June', withdrawal: 3.2, fund: 3.8 },
  { month: 'July', withdrawal: 1.2, fund: 4.4 },
  { month: 'August', withdrawal: 1.2, fund: 4.9 },
  { month: 'September', withdrawal: 1.3, fund: 5.2 },
  { month: 'October', withdrawal: 1.5, fund: 5.75 },
]

const chartConfig = {
  fund: {
    label: 'Fund',
    color: 'hsl(var(--chart-2))',
  },
  withdrawal: {
    label: 'Withdrawal',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export const FundSizeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Size</CardTitle>
        <CardDescription>May 2024 - Oct 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="withdrawal"
              type="monotone"
              stroke="var(--color-withdrawal)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="fund"
              type="monotone"
              stroke="var(--color-fund)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Funding size up by 14.78% this month <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total fund size and withdrawal for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
