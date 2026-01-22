import {
  Bus,
  Home,
  LogOut,
  MapPin,
  Route,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="hidden md:flex z-100">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-bold">
              <Route className="h-5 w-5" />
              <span>TransitHub Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/admin">
                        <Home className="h-4 w-4" />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/routes">
                        <Route className="h-4 w-4" />
                        <span>Routes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/stops">
                        <MapPin className="h-4 w-4" />
                        <span>Stops</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/vehicles">
                        <Bus className="h-4 w-4" />
                        <span>Vehicles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/users">
                        <Users className="h-4 w-4" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              // onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 hidden h-14 items-center border-b bg-background px-4 md:flex">
            <SidebarTrigger />
            <div className="m-auto flex items-center gap-2">
              <nav className="ml-auto hidden md:flex gap-6">
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link href="/live" className="text-sm font-medium">
                  Live
                </Link>
                <Link
                  href="/search"
                  className="text-sm font-medium text-primary"
                >
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
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
