import Link from 'next/link'

import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <nav className=" flex h-[8vh] items-center border-b bg-slate-200 dark:bg-slate-700">
      <div className="container mx-auto  flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">Hotel 14</h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          <div className="flex items-center gap-x-5">
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
