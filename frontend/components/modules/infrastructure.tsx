"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  Building2,
  Zap,
  TrendingDown,
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
} from "recharts"

function UtilBadge({ utilization }: { utilization: number }) {
  if (utilization >= 80)
    return <Badge className="bg-success/15 border-success/30 text-success text-[10px]">High</Badge>

  if (utilization >= 50)
    return <Badge className="bg-warning/15 border-warning/30 text-warning text-[10px]">Medium</Badge>

  return <Badge className="bg-destructive/15 border-destructive/30 text-destructive text-[10px]">Low</Badge>
}

export function InfrastructureModule() {

  const [rooms, setRooms] = useState<any[]>([])
  const [roomUtilizationByHour, setRoomUtilizationByHour] = useState<any[]>([])
  const [electricityUsage, setElectricityUsage] = useState<any[]>([])

  useEffect(() => {

    async function fetchCourses() {
      try {

        const res = await fetch("/api/courses")
        const courses = await res.json()

        /* ---------- GROUP COURSES BY ROOM ---------- */

       const roomMap: any = {}

courses.forEach((course: any) => {

  const key = `${course.room}-${course.slot}`

  if (!roomMap[key]) {
    roomMap[key] = {
      id: course.room,
      slot: course.slot,
      type: "Classroom",
      dept: course.department,
      capacity: course.capacity,
      students: course.students
    }
  }

})

const roomArray = Object.values(roomMap).map((room: any) => {

  const utilization = Math.round((room.students / room.capacity) * 100)
  const shortage = room.students > room.capacity

  return {
    id: room.id,
    slot: room.slot,
    type: room.type,
    dept: room.dept,
    capacity: room.capacity,
    students: room.students,
    utilization,
    electricityKWh: Math.round(room.capacity * 0.5),
    shortage
  }

})
        setRooms(roomArray)

        /* ---------- HOURLY UTILIZATION ---------- */

        /* ---------- HOURLY UTILIZATION FROM SLOT DATA ---------- */

const slotMap: any = {}

courses.forEach((course: any) => {

  const time = course.slot   // example: "10AM"

  if (!slotMap[time]) {
    slotMap[time] = {
      hour: time,
      students: 0,
      capacity: 0
    }
  }

  slotMap[time].students += course.students
  slotMap[time].capacity += course.capacity

})

const hourly = Object.values(slotMap).map((slot: any) => ({
  hour: slot.hour,
  utilization: Math.round((slot.students / slot.capacity) * 100)
}))

setRoomUtilizationByHour(hourly)

        /* ---------- ELECTRICITY DATA ---------- */

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun"
        ]

        const energy = months.map((m) => ({
          month: m,
          usage: Math.floor(Math.random() * 400) + 300
        }))

        setElectricityUsage(energy)

      } catch (err) {
        console.error("Failed to fetch courses", err)
      }
    }

    fetchCourses()

  }, [])

  /* ---------- STATS ---------- */

  const avgUtilization =
    rooms.length > 0
      ? Math.round(
          rooms.reduce((acc, r) => acc + r.utilization, 0) / rooms.length
        )
      : 0

  const totalEnergy =
    rooms.reduce((acc, r) => acc + r.electricityKWh, 0)

  const underutilized =
    rooms.filter((r) => r.utilization < 50).length

    const spaceConflicts =
rooms.filter((r) => r.shortage).length


  return (

    <div className="flex flex-col gap-6">

      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Infrastructure Twin
        </h2>

        <p className="text-sm text-muted-foreground">
          Classroom usage, lab utilization, and energy monitoring
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <span className="text-2xl font-bold text-foreground">
                  {avgUtilization}%
                </span>

                <p className="text-xs text-muted-foreground">
                  Avg Room Utilization
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Zap className="h-5 w-5 text-warning" />
              </div>

              <div>
                <span className="text-2xl font-bold text-foreground">
                  {totalEnergy}
                </span>

                <p className="text-xs text-muted-foreground">
                  Daily kWh Usage
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>

              <div>
                <span className="text-2xl font-bold text-foreground">
                  {underutilized}
                </span>

                <p className="text-xs text-muted-foreground">
                  Underutilized Rooms
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ROOM UTILIZATION */}

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Room Utilization by Hour
            </CardTitle>

            <CardDescription>
              Peak and off-peak usage patterns
            </CardDescription>
          </CardHeader>

          <CardContent>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomUtilizationByHour}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="hour" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="utilization"
                    fill="#f59e0b"
                    radius={[4,4,0,0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </CardContent>
        </Card>

        {/* ELECTRICITY */}

        <Card className="glass-card">

          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Electricity Consumption
            </CardTitle>

            <CardDescription>
              Monthly kWh usage trends
            </CardDescription>
          </CardHeader>

          <CardContent>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={electricityUsage}>

                  <CartesianGrid strokeDasharray="3 3"/>

                  <XAxis dataKey="month"/>

                  <YAxis/>

                  <Tooltip/>

                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#f59e0b"
                    fill="#fde68a"
                  />

                </AreaChart>

              </ResponsiveContainer>
            </div>

          </CardContent>

        </Card>

      </div>

      {/* ROOM TABLE */}

      <Card className="glass-card">

        <CardHeader className="pb-3">

          <CardTitle className="text-sm font-semibold">
            Room Inventory
          </CardTitle>

          <CardDescription>
            All rooms with utilization and energy data
          </CardDescription>

        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto">

            <table className="w-full text-xs">

              <thead>

                <tr className="border-b border-border/50">

                  <th className="text-left py-2 px-3">Room</th>
                  <th className="text-center py-2 px-3">Slot</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Department</th>
                  <th className="text-center py-2 px-3">Capacity</th>
                  <th className="text-center py-2 px-3">Students</th>
                  <th className="text-left py-2 px-3">Utilization</th>
                  <th className="text-center py-2 px-3">kWh/day</th>
                  <th className="text-center py-2 px-3">Status</th>

                </tr>

              </thead>

              <tbody>

                {rooms.map((room) => (

                <tr
key={room.id}
className={`border-b border-border/30 ${room.shortage ? "bg-red-500/10" : ""}`}
>

                    <td className="py-2 px-3 font-mono font-semibold">
                      {room.id}
                    </td>

                    <td className="py-2 px-3 text-center">
  {room.slot}
</td>

                    <td className="py-2 px-3">
                      {room.type}
                    </td>

                    <td className="py-2 px-3">
                      {room.dept}
                    </td>

                    <td className="py-2 px-3 text-center">
                      {room.capacity}
                    </td>

                    <td className="py-2 px-3 text-center">
{room.students}
</td>

                    <td className="py-2 px-3">

                      <div className="flex items-center gap-2">

                        <Progress
                          value={room.utilization}
                          className="h-1.5 flex-1"
                        />

                        <span className="text-[11px] font-mono">
                          {room.utilization}%
                        </span>

                      </div>

                    </td>

                    <td className="py-2 px-3 text-center">
                      {room.electricityKWh}
                    </td>

                   <td className="py-2 px-3 text-center">

{room.shortage ? (
<Badge className="bg-red-500/20 text-red-500 border-red-500/40 text-[10px]">
Overcrowded
</Badge>
) : (
<UtilBadge utilization={room.utilization}/>
)}

</td>

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