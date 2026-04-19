"use client"

import { useState } from "react"
import { AppSidebar, type NavItem } from "@/components/app-sidebar"
import { DashboardModule } from "@/components/modules/dashboard"
import { AcademicModule } from "@/components/modules/academic"
import { FacultyModule } from "@/components/modules/faculty"
import { InfrastructureModule } from "@/components/modules/infrastructure"
import { StudentsModule } from "@/components/modules/students"
import { OptimizationModule } from "@/components/modules/optimization"
import { AnalyticsModule } from "@/components/modules/analytics"
import { SystemMapModule } from "@/components/modules/system-map"
import { smartAlerts } from "@/lib/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, X } from "lucide-react"

const moduleMap: Record<NavItem, React.ComponentType> = {
  dashboard: DashboardModule,
  academic: AcademicModule,
  faculty: FacultyModule,
  infrastructure: InfrastructureModule,
  students: StudentsModule,
  optimization: OptimizationModule,
  analytics: AnalyticsModule,
  "system-map": SystemMapModule,
}

const moduleTitles: Record<NavItem, string> = {
  dashboard: "Dashboard Overview",
  academic: "Academic Digital Twin",
  faculty: "Faculty Workload Twin",
  infrastructure: "Infrastructure Twin",
  students: "Student Behavior Twin",
  optimization: "Resource Optimization",
  analytics: "Analytics & Predictions",
  "system-map": "Campus System Map",
}

export default function Page() {
  const [activeModule, setActiveModule] = useState<NavItem>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const ActiveComponent = moduleMap[activeModule]

  const handleNavigate = (item: NavItem) => {
    setActiveModule(item)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar
          active={activeModule}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          alertCount={smartAlerts.filter(a => a.type === "critical" || a.type === "warning").length}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full w-64">
            <AppSidebar
              active={activeModule}
              onNavigate={handleNavigate}
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              alertCount={smartAlerts.filter(a => a.type === "critical" || a.type === "warning").length}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center h-14 px-4 md:px-6 border-b border-border/50 bg-card/30 backdrop-blur-sm shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="mr-3 md:hidden flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-foreground">{moduleTitles[activeModule]}</h1>
            <span className="text-[10px] text-muted-foreground font-mono">CampusTwin v1.0 / Live</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] text-muted-foreground hidden sm:inline">System Online</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6">
            <ActiveComponent />
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
