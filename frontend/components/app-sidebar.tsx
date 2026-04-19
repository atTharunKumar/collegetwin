"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  UserCircle,
  Zap,
  BarChart3,
  Map,
  ChevronLeft,
  ChevronRight,
  Brain,
  Bell,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type NavItem =
  | "dashboard"
  | "academic"
  | "faculty"
  | "infrastructure"
  | "students"
  | "optimization"
  | "analytics"
  | "system-map"

interface AppSidebarProps {
  active: NavItem
  onNavigate: (item: NavItem) => void
  collapsed: boolean
  onToggleCollapse: () => void
  alertCount?: number
}

const navItems: { id: NavItem; label: string; icon: React.ElementType; description: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Overview & Insights" },
  { id: "academic", label: "Academic Twin", icon: GraduationCap, description: "Course & Scheduling" },
  { id: "faculty", label: "Faculty Twin", icon: Users, description: "Workload & Duties" },
  { id: "infrastructure", label: "Infrastructure", icon: Building2, description: "Rooms & Energy" },
  { id: "students", label: "Student Twin", icon: UserCircle, description: "Behavior & Trends" },
  { id: "optimization", label: "Optimization", icon: Zap, description: "Simulation & What-If" },
  { id: "analytics", label: "Analytics", icon: BarChart3, description: "Heatmaps & Trends" },
  { id: "system-map", label: "System Map", icon: Map, description: "Campus Topology" },
]

export function AppSidebar({ active, onNavigate, collapsed, onToggleCollapse, alertCount = 0 }: AppSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground">CampusTwin</span>
                <span className="text-[10px] text-muted-foreground">Decision Intelligence</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id

              const button = (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 w-full text-left",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground glow-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                  {!collapsed && (
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate font-medium">{item.label}</span>
                      <span className="truncate text-[10px] text-muted-foreground">{item.description}</span>
                    </div>
                  )}
                </button>
              )

              if (collapsed) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-popover text-popover-foreground">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }
              return button
            })}
          </nav>
        </ScrollArea>

        {/* Alerts indicator */}
        <div className="px-2 pb-2">
          {alertCount > 0 && (
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm bg-destructive/10 border border-destructive/20",
                collapsed && "justify-center"
              )}
            >
              <Bell className="h-4 w-4 text-destructive shrink-0" />
              {!collapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-destructive text-xs font-medium">Active Alerts</span>
                  <Badge variant="destructive" className="text-[10px] h-5">{alertCount}</Badge>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <div className="border-t border-sidebar-border p-2">
          <button
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
