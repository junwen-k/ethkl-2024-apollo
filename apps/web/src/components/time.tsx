import { format } from 'date-fns'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface TimeProps extends Omit<React.ComponentPropsWithoutRef<'time'>, 'children'> {
  children: Parameters<typeof format>[0]
  dateTimeFormatStr?: string
  formatStr?: string
}

export const Time = React.forwardRef<React.ElementRef<'time'>, TimeProps>(
  (
    { children, dateTimeFormatStr = 'yyyy-MM-dd', formatStr = 'dd/MM/yyyy', className, ...props },
    ref
  ) => (
    <time
      ref={ref}
      dateTime={format(children, dateTimeFormatStr)}
      className={cn('whitespace-nowrap', className)}
      {...props}
    >
      {format(children, formatStr)}
    </time>
  )
)
Time.displayName = 'Time'
