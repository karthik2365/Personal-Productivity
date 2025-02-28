import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About Us</h3>
            <p className="text-sm text-muted-foreground">
            Personal productivity is the ability to manage time, tasks, and energy efficiently to achieve goals with focus and balance.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/learn" className="hover:text-green-600 dark:hover:text-green-400">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-green-600 dark:hover:text-green-400">
                  Financial Tools
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-green-600 dark:hover:text-green-400">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@example.com</li>
              <li>Phone: 1800-XXX-XXXX</li>
              <li>Support Hours: 9 AM - 6 PM</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

