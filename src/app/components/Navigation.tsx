'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Über uns' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Kontakt' },
  ]

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 py-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-gray-300 transition-colors ${
                pathname === href ? 'text-blue-400 font-medium' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}