import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 justify-center flex">
      <div className="container flex h-16 items-center px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="max-sm:hidden">TransitHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/live" className="text-sm font-medium">
            Live
          </Link>
          <Link href="/search" className="text-sm font-medium text-primary">
            Search
          </Link>
          <Link href="/favorites" className="text-sm font-medium">
            Favorites
          </Link>
          <Link href="/admin" className="text-sm font-medium">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
