import Link from "next/link";

export default function Footer() {
  return(
    <footer className="border-t w-full">
        <div className="container m-auto py-8 md:py-12">
          <div className="grid gap-8 mx-5 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <span>TransitHub</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Making public transport accessible and efficient for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/routes" className="text-muted-foreground hover:text-foreground">
                    Routes
                  </Link>
                </li>
                <li>
                  <Link href="/network" className="text-muted-foreground hover:text-foreground">
                    Network
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Service Updates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="text-muted-foreground">123 Transport Street, City Center</li>
                <li className="text-muted-foreground">info@transithub.com</li>
                <li className="text-muted-foreground">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t w-full pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TransitHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
};
