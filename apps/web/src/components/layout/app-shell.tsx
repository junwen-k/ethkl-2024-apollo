import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Home, Package2, PanelLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Sidebar } from '@/components/layout/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted/40 flex min-h-screen w-full flex-col">
    <Sidebar />
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="size-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="bg-primary text-primary-foreground group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
              >
                <Package2 className="size-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
              >
                <Home className="size-5" />
                Dashboard
              </Link>
              <Link href="#" className="text-foreground flex items-center gap-4 px-2.5">
                <ShoppingCart className="size-5" />
                Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </header>
      <main>{children}</main>
    </div>
  </div>
)
