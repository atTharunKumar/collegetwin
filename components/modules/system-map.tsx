"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { campusBlocks, rooms, departments } from "@/lib/data"
import {
  Building2,
  FlaskConical,
  BookOpen,
  Library,
  X,
  Users,
  Zap,
} from "lucide-react"

function BlockIcon({ type }: { type: string }) {
  switch (type) {
    case "academic": return <Building2 className="h-6 w-6" />
    case "lab": return <FlaskConical className="h-6 w-6" />
    case "admin": return <BookOpen className="h-6 w-6" />
    case "facility": return <Library className="h-6 w-6" />
    default: return <Building2 className="h-6 w-6" />
  }
}

function blockColor(type: string) {
  switch (type) {
    case "academic": return "border-primary/40 bg-primary/5 hover:bg-primary/10"
    case "lab": return "border-warning/40 bg-warning/5 hover:bg-warning/10"
    case "admin": return "border-info/40 bg-info/5 hover:bg-info/10"
    case "facility": return "border-chart-4/40 bg-chart-4/5 hover:bg-chart-4/10"
    default: return "border-border bg-secondary/20"
  }
}

function blockIconColor(type: string) {
  switch (type) {
    case "academic": return "text-primary"
    case "lab": return "text-warning"
    case "admin": return "text-info"
    case "facility": return "text-chart-4"
    default: return "text-muted-foreground"
  }
}

export function SystemMapModule() {
  const [selected, setSelected] = useState<string | null>(null)

  const selectedBlock = campusBlocks.find((b) => b.id === selected)
  const blockRooms = selectedBlock
    ? rooms.filter((r) =>
        selectedBlock.departments.includes("All")
          ? true
          : selectedBlock.departments.some((d) => r.dept === d || r.dept === "General")
      )
    : []
  const blockDepts = selectedBlock
    ? departments.filter((d) =>
        selectedBlock.departments.includes(d.name) || selectedBlock.departments.includes("All")
      )
    : []

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Campus System Map</h2>
        <p className="text-sm text-muted-foreground">Interactive topology view - click any block for detailed data</p>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campusBlocks.map((block) => (
          <button
            key={block.id}
            onClick={() => setSelected(selected === block.id ? null : block.id)}
            className={cn(
              "rounded-xl border-2 p-5 text-left transition-all duration-200",
              blockColor(block.type),
              selected === block.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50", blockIconColor(block.type))}>
                <BlockIcon type={block.type} />
              </div>
              <Badge variant="outline" className="text-[10px] capitalize">{block.type}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{block.name}</h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              {block.departments.join(", ")}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Rooms</span>
                <span className="text-sm font-bold text-foreground">{block.rooms}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground">Utilization</span>
                <span className={cn(
                  "text-sm font-bold font-mono",
                  block.utilization >= 70 ? "text-success" : block.utilization >= 50 ? "text-warning" : "text-destructive"
                )}>
                  {block.utilization}%
                </span>
              </div>
            </div>
            <Progress value={block.utilization} className="h-1.5 mt-3" />
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      {selectedBlock && (
        <Card className="glass-card glow-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50", blockIconColor(selectedBlock.type))}>
                  <BlockIcon type={selectedBlock.type} />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">{selectedBlock.name}</CardTitle>
                  <CardDescription>{selectedBlock.departments.join(" / ")}</CardDescription>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Block Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="rounded-lg bg-secondary/30 border border-border/50 p-3 text-center">
                <Building2 className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground block">{selectedBlock.rooms}</span>
                <span className="text-[10px] text-muted-foreground">Rooms</span>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border/50 p-3 text-center">
                <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground block">
                  {blockDepts.reduce((a, d) => a + d.students, 0)}
                </span>
                <span className="text-[10px] text-muted-foreground">Students</span>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border/50 p-3 text-center">
                <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground block">
                  {blockDepts.reduce((a, d) => a + d.faculty, 0)}
                </span>
                <span className="text-[10px] text-muted-foreground">Faculty</span>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border/50 p-3 text-center">
                <Zap className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground block">
                  {blockRooms.reduce((a, r) => a + r.electricityKWh, 0)}
                </span>
                <span className="text-[10px] text-muted-foreground">kWh/day</span>
              </div>
            </div>

            {/* Rooms in this block */}
            {blockRooms.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-3">Rooms in this block</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium">Room</th>
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium">Capacity</th>
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium">Utilization</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium">kWh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockRooms.map((room) => (
                        <tr key={room.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                          <td className="py-2 px-3 font-mono font-semibold text-foreground">{room.id}</td>
                          <td className="py-2 px-3 text-muted-foreground">{room.type}</td>
                          <td className="py-2 px-3 text-center text-foreground">{room.capacity}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <Progress value={room.utilization} className="h-1.5 flex-1" />
                              <span className="text-[11px] font-mono font-semibold text-foreground">{room.utilization}%</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center text-foreground">{room.electricityKWh}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Connection Map Visual */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">System Interconnections</CardTitle>
          <CardDescription>How campus subsystems connect and influence each other</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Students -> Academic */}
            <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-foreground">Students to Academic</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Student enrollment numbers directly influence course section planning, room allocation, and faculty assignment requirements.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">4,250 students</Badge>
                <Badge variant="outline" className="text-[10px]">148 courses</Badge>
              </div>
            </div>

            {/* Faculty -> Infrastructure */}
            <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-info" />
                <span className="text-xs font-semibold text-foreground">Faculty to Infrastructure</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Faculty availability and workload affect classroom scheduling, lab booking, and peak-hour energy consumption patterns.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">186 faculty</Badge>
                <Badge variant="outline" className="text-[10px]">72 rooms</Badge>
              </div>
            </div>

            {/* All -> Optimization */}
            <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-warning" />
                <span className="text-xs font-semibold text-foreground">All to Optimization</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The optimization engine combines all twin data to generate holistic recommendations for schedule, allocation, and resource usage.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">6 insights</Badge>
                <Badge variant="outline" className="text-[10px]">5 alerts</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
