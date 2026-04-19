"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { scenarioComparisons, aiInsights } from "@/lib/data"
import {
  Zap,
  Play,
  RotateCcw,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Sliders,
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
  Legend,
} from "recharts"

interface SimulationState {
  extraStudents: number
  newSections: number
  removedFaculty: number
  running: boolean
  complete: boolean
  results: {
    clashChange: number
    loadChange: number
    roomChange: number
    attendanceChange: number
  } | null
}

export function OptimizationModule() {
  const [sim, setSim] = useState<SimulationState>({
    extraStudents: 0,
    newSections: 0,
    removedFaculty: 0,
    running: false,
    complete: false,
    results: null,
  })

  const runSimulation = useCallback(() => {
    setSim((prev) => ({ ...prev, running: true, complete: false, results: null }))
    // Simulate processing delay
    setTimeout(() => {
      const clashChange = Math.round(sim.extraStudents * 0.05 + sim.newSections * 2.5)
      const loadChange = Math.round(sim.newSections * 4 + sim.removedFaculty * 8)
      const roomChange = Math.round(sim.extraStudents * 0.02 + sim.newSections * 5)
      const attendanceChange = Math.round(-sim.extraStudents * 0.01 - sim.removedFaculty * 1.5)
      setSim((prev) => ({
        ...prev,
        running: false,
        complete: true,
        results: { clashChange, loadChange, roomChange, attendanceChange },
      }))
    }, 1500)
  }, [sim.extraStudents, sim.newSections, sim.removedFaculty])

  const resetSimulation = () => {
    setSim({
      extraStudents: 0,
      newSections: 0,
      removedFaculty: 0,
      running: false,
      complete: false,
      results: null,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Resource Optimization & Simulation</h2>
        <p className="text-sm text-muted-foreground">What-if scenarios, simulation engine, and before/after comparison</p>
      </div>

      {/* Simulation Panel */}
      <Card className="glass-card glow-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground">What-If Simulation Engine</CardTitle>
          </div>
          <CardDescription>Adjust parameters and see the predicted impact on your campus twin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Extra Students */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-muted-foreground">Extra Students Added</label>
              <input
                type="range"
                min={0}
                max={500}
                step={50}
                value={sim.extraStudents}
                onChange={(e) => setSim((prev) => ({ ...prev, extraStudents: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">0</span>
                <span className="text-sm font-mono font-bold text-primary">+{sim.extraStudents}</span>
                <span className="text-[10px] text-muted-foreground">500</span>
              </div>
            </div>

            {/* New Sections */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-muted-foreground">New Sections Added</label>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={sim.newSections}
                onChange={(e) => setSim((prev) => ({ ...prev, newSections: Number(e.target.value) }))}
                className="w-full accent-info"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">0</span>
                <span className="text-sm font-mono font-bold text-info">+{sim.newSections}</span>
                <span className="text-[10px] text-muted-foreground">10</span>
              </div>
            </div>

            {/* Faculty Removed */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-muted-foreground">Faculty on Leave</label>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={sim.removedFaculty}
                onChange={(e) => setSim((prev) => ({ ...prev, removedFaculty: Number(e.target.value) }))}
                className="w-full accent-warning"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">0</span>
                <span className="text-sm font-mono font-bold text-warning">{sim.removedFaculty}</span>
                <span className="text-[10px] text-muted-foreground">10</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={sim.running}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {sim.running ? (
                <>
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  Run Simulation
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary/50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          {/* Results */}
          {sim.complete && sim.results && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg bg-secondary/40 border border-border/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground block mb-1">Class Clashes</span>
                <span className={`text-lg font-bold font-mono ${sim.results.clashChange > 0 ? "text-destructive" : "text-success"}`}>
                  {sim.results.clashChange > 0 ? "+" : ""}{sim.results.clashChange}%
                </span>
              </div>
              <div className="rounded-lg bg-secondary/40 border border-border/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground block mb-1">Faculty Load</span>
                <span className={`text-lg font-bold font-mono ${sim.results.loadChange > 0 ? "text-destructive" : "text-success"}`}>
                  {sim.results.loadChange > 0 ? "+" : ""}{sim.results.loadChange}%
                </span>
              </div>
              <div className="rounded-lg bg-secondary/40 border border-border/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground block mb-1">Room Demand</span>
                <span className={`text-lg font-bold font-mono ${sim.results.roomChange > 0 ? "text-warning" : "text-success"}`}>
                  {sim.results.roomChange > 0 ? "+" : ""}{sim.results.roomChange}%
                </span>
              </div>
              <div className="rounded-lg bg-secondary/40 border border-border/50 p-3 text-center">
                <span className="text-[10px] text-muted-foreground block mb-1">Attendance Impact</span>
                <span className={`text-lg font-bold font-mono ${sim.results.attendanceChange < 0 ? "text-destructive" : "text-success"}`}>
                  {sim.results.attendanceChange > 0 ? "+" : ""}{sim.results.attendanceChange}%
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scenario Comparison */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">Before vs After Optimization</CardTitle>
          <CardDescription>Impact of AI-recommended optimizations on key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioComparisons} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="metric" type="category" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} axisLine={false} tickLine={false} width={120} />
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
                <Bar dataKey="before" fill="hsl(225, 15%, 25%)" radius={[0, 4, 4, 0]} name="Before" />
                <Bar dataKey="after" fill="hsl(160, 84%, 50%)" radius={[0, 4, 4, 0]} name="After" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {scenarioComparisons.map((s) => (
          <Card key={s.metric} className="glass-card">
            <CardContent className="p-4 text-center">
              <span className="text-[10px] text-muted-foreground block mb-1">{s.metric}</span>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
                <span className="text-lg font-bold font-mono text-success">{s.improvement}%</span>
              </div>
              <span className="text-[10px] text-muted-foreground">improvement</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground">AI Recommendations</CardTitle>
          </div>
          <CardDescription>System-wide optimization suggestions based on all twin data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/20 p-3"
              >
                <div className="mt-0.5">
                  {insight.type === "optimization" ? (
                    <Zap className="h-4 w-4 text-primary" />
                  ) : insight.type === "alert" ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-info" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{insight.title}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5">{insight.module}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.description}</p>
                  <button className="flex items-center gap-1 mt-2 text-[11px] font-medium text-primary hover:underline">
                    Apply: {insight.action} <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
