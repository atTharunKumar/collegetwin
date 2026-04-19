"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  attendanceHeatmap,
  attendanceTrend,
  departments,
  studentPerformanceTrend,
  electricityUsage,
} from "@/lib/data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

const timeSlots = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"] as const

function getHeatColor(value: number): string {
  if (value >= 85) return "bg-primary/80"
  if (value >= 70) return "bg-primary/50"
  if (value >= 55) return "bg-primary/30"
  if (value >= 40) return "bg-warning/30"
  return "bg-destructive/20"
}

function getHeatText(value: number): string {
  if (value >= 70) return "text-foreground"
  return "text-muted-foreground"
}

// Prediction data derived from trends
const predictionData = attendanceTrend.map((item, i) => ({
  month: item.month,
  actual: item.attendance,
  predicted: Math.round(item.attendance + Math.sin(i) * 3 + 2),
}))

// Scatter data: performance vs attendance correlation
const correlationData = departments.map((d) => ({
  name: d.name,
  x: Math.round(60 + Math.random() * 30), // attendance proxy
  y: Math.round(d.avgGPA * 25),            // performance proxy
  z: d.students,
}))

export function AnalyticsModule() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Analytics & Predictions</h2>
        <p className="text-sm text-muted-foreground">Heatmaps, correlation analysis, trends, and predictive insights</p>
      </div>

      {/* Attendance Heatmap */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Attendance Heatmap</CardTitle>
          <CardDescription>Attendance percentage by day and time slot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium w-24">Day</th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className="text-center py-2 px-1 text-[10px] text-muted-foreground font-medium">{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceHeatmap.map((row) => (
                  <tr key={row.day}>
                    <td className="py-1.5 px-3 text-xs font-medium text-foreground">{row.day}</td>
                    {timeSlots.map((slot) => {
                      const value = row[slot] as number
                      return (
                        <td key={slot} className="py-1.5 px-1">
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-md py-2.5 text-[11px] font-mono font-semibold transition-colors",
                              getHeatColor(value),
                              getHeatText(value)
                            )}
                          >
                            {value}%
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-destructive/20" />
              <span className="text-[10px] text-muted-foreground">{"< 40%"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-warning/30" />
              <span className="text-[10px] text-muted-foreground">40-55%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-primary/30" />
              <span className="text-[10px] text-muted-foreground">55-70%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-primary/50" />
              <span className="text-[10px] text-muted-foreground">70-85%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-primary/80" />
              <span className="text-[10px] text-muted-foreground">{"85%+"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Prediction: Actual vs Predicted */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Attendance Prediction</CardTitle>
            <CardDescription>Actual vs AI-predicted attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[60, 95]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "hsl(220, 10%, 55%)" }} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(160, 84%, 50%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(160, 84%, 50%)" }} name="Actual" />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(200, 80%, 55%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: "hsl(200, 80%, 55%)" }} name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance vs Attendance Correlation */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Performance vs Attendance</CardTitle>
            <CardDescription>Correlation analysis across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                  <XAxis type="number" dataKey="x" name="Attendance" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} label={{ value: "Attendance %", position: "bottom", fontSize: 10, fill: "hsl(220, 10%, 55%)", offset: 0 }} />
                  <YAxis type="number" dataKey="y" name="Performance" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} label={{ value: "Performance", angle: -90, position: "insideLeft", fontSize: 10, fill: "hsl(220, 10%, 55%)" }} />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} name="Students" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(225, 20%, 9%)",
                      border: "1px solid hsl(225, 15%, 16%)",
                      borderRadius: "8px",
                      color: "hsl(210, 20%, 95%)",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [value, name]}
                  />
                  <Scatter data={correlationData} fill="hsl(160, 84%, 50%)" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy & Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Student Performance Segments Over Time */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Performance Segment Trends</CardTitle>
            <CardDescription>Monthly movement between performance categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentPerformanceTrend}>
                  <defs>
                    <linearGradient id="topGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="riskGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.4} />
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
                  <Legend wrapperStyle={{ fontSize: 11, color: "hsl(220, 10%, 55%)" }} />
                  <Area type="monotone" dataKey="topPerformers" stroke="hsl(160, 84%, 50%)" fill="url(#topGrad2)" strokeWidth={2} name="Top Performers" />
                  <Area type="monotone" dataKey="atRisk" stroke="hsl(0, 72%, 55%)" fill="url(#riskGrad2)" strokeWidth={2} name="At Risk" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Energy Trend */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Energy Consumption Trend</CardTitle>
            <CardDescription>Monthly campus electricity usage (kWh)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={electricityUsage}>
                  <defs>
                    <linearGradient id="energyGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(35, 92%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(35, 92%, 60%)" stopOpacity={0} />
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
                    formatter={(value: number) => [`${value.toLocaleString()} kWh`, "Usage"]}
                  />
                  <Area type="monotone" dataKey="usage" stroke="hsl(35, 92%, 60%)" fill="url(#energyGrad2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
