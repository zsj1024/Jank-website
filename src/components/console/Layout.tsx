import { AdminSidebar } from "./Sidebar";
import { ThemeProvider } from "@/components/ui/shadcn/theme-provider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="jank-ui-theme">
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
