"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { kpiData, attendanceTrend, departments, aiInsights, smartAlerts } from "@/lib/data"
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  ArrowRight,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const kpiCards = [
  { label: "Total Students", value: kpiData.totalStudents.toLocaleString(), icon: GraduationCap, change: "+5.2%", trend: "up", color: "text-primary" },
  { label: "Faculty Members", value: kpiData.totalFaculty.toString(), icon: Users, change: "+2", trend: "up", color: "text-info" },
  { label: "Total Rooms", value: kpiData.totalRooms.toString(), icon: Building2, change: "0", trend: "neutral", color: "text-warning" },
  { label: "Active Courses", value: kpiData.totalCourses.toString(), icon: BookOpen, change: "+8", trend: "up", color: "text-chart-5" },
]

const metricBars = [
  { label: "Average Attendance", value: kpiData.avgAttendance, color: "bg-primary" },
  { label: "Student Performance", value: kpiData.avgPerformance, color: "bg-info" },
  { label: "Room Utilization", value: kpiData.roomUtilization, color: "bg-warning" },
  { label: "Faculty Load Balance", value: kpiData.facultyLoadBalance, color: "bg-chart-5" },
]

function AlertIcon({ type }: { type: string }) {
  switch (type) {
    case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />
    case "critical": return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "info": return <Info className="h-4 w-4 text-info" />
    case "success": return <CheckCircle className="h-4 w-4 text-success" />
    default: return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

export function DashboardModule() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="glass-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                    <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className="text-[11px] text-muted-foreground">{kpi.change} this semester</span>
                    </div>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${kpi.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Metric Bars */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">System Health Overview</CardTitle>
          <CardDescription>Real-time performance metrics across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metricBars.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                  <span className="text-xs font-mono font-semibold text-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance & Performance Trend */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Attendance & Performance Trend</CardTitle>
            <CardDescription>Monthly overview of student engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrend}>
                  <defs>
                    <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="attendance" stroke="hsl(160, 84%, 50%)" fill="url(#attendanceGrad)" strokeWidth={2} name="Attendance %" />
                  <Area type="monotone" dataKey="performance" stroke="hsl(200, 80%, 55%)" fill="url(#performanceGrad)" strokeWidth={2} name="Performance %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Department Distribution</CardTitle>
            <CardDescription>Students by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departments} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="students" fill="hsl(160, 84%, 50%)" radius={[0, 4, 4, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights & Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI Decision Intelligence */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold text-foreground">Decision Intelligence</CardTitle>
            </div>
            <CardDescription>AI-powered optimization suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {aiInsights.slice(0, 4).map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/30 p-3"
                >
                  <div className="mt-0.5">
                    {insight.severity === "critical" ? (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    ) : insight.severity === "high" ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <Info className="h-4 w-4 text-info" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">{insight.title}</span>
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5">{insight.module}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.description}</p>
                    <button className="flex items-center gap-1 mt-2 text-[11px] font-medium text-primary hover:underline">
                      {insight.action} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Alerts */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-semibold text-foreground">Smart Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {smartAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <AlertIcon type={alert.type} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-foreground block">{alert.title}</span>
                    <span className="text-[11px] text-muted-foreground">{alert.message}</span>
                    <span className="text-[10px] text-muted-foreground/60 block mt-1">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
