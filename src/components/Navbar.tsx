'use client'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { UserButton, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SearchInput from './SearchInput'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const router = useRouter()
  const { userId } = useAuth()
  return (
    <nav className=" sticky  top-0 flex h-[8vh] w-full items-center border-b border-primary/40 bg-secondary dark:bg-slate-700">
      <div className="container mx-auto  flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => router.push('/')}
        >
          <Image src="/assets/logo.svg" alt="logo" width={30} height={30} />
          <span>
            <h1 className="text-3xl font-bold">Hotel 14</h1>
          </span>
        </div>
        <SearchInput></SearchInput>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          <div className="flex items-center gap-x-5">
            {!userId && (
              <>
                <Button asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>Create</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hotel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/hotel/new">New</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  )
}
