"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  studentPerformanceBySubject,
  attendanceByTimeSlot,
  studentPerformanceTrend,
} from "@/lib/data"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from "recharts"

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  switch (difficulty) {
    case "High": return <Badge className="bg-destructive/15 border-destructive/30 text-destructive text-[10px]">Hard</Badge>
    case "Medium": return <Badge className="bg-warning/15 border-warning/30 text-warning text-[10px]">Medium</Badge>
    default: return <Badge className="bg-success/15 border-success/30 text-success text-[10px]">Easy</Badge>
  }
}

export function StudentsModule() {
  const avgScore = Math.round(
    studentPerformanceBySubject.reduce((a, b) => a + b.avgScore, 0) / studentPerformanceBySubject.length
  )
  const avgPassRate = Math.round(
    studentPerformanceBySubject.reduce((a, b) => a + b.passRate, 0) / studentPerformanceBySubject.length
  )
  const hardSubjects = studentPerformanceBySubject.filter(s => s.difficulty === "High").length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Student Behavior Twin</h2>
        <p className="text-sm text-muted-foreground">Attendance trends, performance patterns, and subject difficulty analysis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">{avgScore}%</span>
                <p className="text-xs text-muted-foreground">Avg Performance Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">{avgPassRate}%</span>
                <p className="text-xs text-muted-foreground">Average Pass Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">{hardSubjects}</span>
                <p className="text-xs text-muted-foreground">High Difficulty Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance by Time Slot */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Attendance by Time Slot</CardTitle>
            <CardDescription>Student engagement varies with scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceByTimeSlot}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                  <XAxis dataKey="slot" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`${value}%`, "Attendance"]}
                  />
                  <Bar dataKey="attendance" fill="hsl(160, 84%, 50%)" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Student Performance Segments</CardTitle>
            <CardDescription>Monthly distribution of performance categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentPerformanceTrend}>
                  <defs>
                    <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="topPerformers" stroke="hsl(160, 84%, 50%)" fill="url(#topGrad)" strokeWidth={2} name="Top Performers %" />
                  <Area type="monotone" dataKey="average" stroke="hsl(200, 80%, 55%)" fill="url(#avgGrad)" strokeWidth={2} name="Average %" />
                  <Area type="monotone" dataKey="atRisk" stroke="hsl(0, 72%, 55%)" fill="url(#riskGrad)" strokeWidth={2} name="At Risk %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight Card */}
      <Card className="glass-card glow-accent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-info" />
            <CardTitle className="text-sm font-semibold text-foreground">AI Behavioral Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-secondary/30 border border-border/50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-foreground">Low Attendance Pattern</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Students in 2 PM Data Structures slots show 15% lower attendance than morning slots. Consider rescheduling to 10-11 AM window.
              </p>
            </div>
            <div className="rounded-lg bg-secondary/30 border border-border/50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-xs font-semibold text-foreground">Subject Difficulty Alert</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Data Structures, Thermodynamics, and Power Systems have pass rates below 75%. Additional tutorials recommended for at-risk students.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Table */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Subject-wise Performance</CardTitle>
          <CardDescription>Detailed performance analysis per subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Subject</th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">Avg Score</th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">Pass Rate</th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">Difficulty</th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">Time Slot</th>
                </tr>
              </thead>
              <tbody>
                {studentPerformanceBySubject.map((s) => (
                  <tr key={s.subject} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-foreground">{s.subject}</td>
                    <td className="py-2.5 px-3 text-center text-foreground font-mono">{s.avgScore}%</td>
                    <td className="py-2.5 px-3 text-center text-foreground font-mono">{s.passRate}%</td>
                    <td className="py-2.5 px-3 text-center"><DifficultyBadge difficulty={s.difficulty} /></td>
                    <td className="py-2.5 px-3 text-center text-muted-foreground">{s.timeSlot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
