"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Leaf, 
  Camera, 
  Flower2, 
  CalendarDays, 
  MessageSquare, 
  User,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore, useUIStore } from "@/store/auth"
import { createClient } from "@/lib/supabase"

const navItems = [
  { href: "/identify", label: "Identificar", icon: Camera },
  { href: "/garden", label: "Mi Jardín", icon: Flower2 },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/forums", label: "Foros", icon: MessageSquare },
]

export function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-primary">FloraID</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-text-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary">
                <User className="h-4 w-4" />
                {user.username}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Iniciar sesión</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="md:hidden border-t border-primary/10 bg-white">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
            {!isAuthenticated && (
              <>
                <Link href="/auth/login" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Iniciar sesión</Button>
                </Link>
                <Link href="/auth/register" onClick={() => setSidebarOpen(false)}>
                  <Button className="w-full justify-start">Registrarse</Button>
                </Link>
              </>
            )}
            {isAuthenticated && user && (
              <>
                <Link href="/profile" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Mi perfil
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
