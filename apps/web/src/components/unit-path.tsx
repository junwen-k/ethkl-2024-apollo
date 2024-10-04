import * as React from 'react'

import { cn } from '@/lib/utils'

interface UnitPathProps extends React.ComponentPropsWithoutRef<'path'> {
  status: 'paid' | 'unpaid'
}

export const UnitPath = React.forwardRef<React.ElementRef<'path'>, UnitPathProps>(
  ({ className, status, ...props }) => (
    <path
      type="button"
      className={cn(
        status === 'unpaid' && 'fill-destructive/50 hover:fill-destructive/75',
        status === 'paid' && 'fill-success/50 hover:fill-success/75',
        'cursor-pointer stroke-black transition-colors',
        className
      )}
      {...props}
    />
  )
)
UnitPath.displayName = 'UnitPath'
