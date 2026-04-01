"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { departments } from "@/lib/data"

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"


const deptRadar = departments.map((d) => ({
  department: d.name.substring(0, 6),
  students: d.students / 10,
  faculty: d.faculty * 2,
  rooms: d.rooms * 5,
}))


function ClashBadge({ risk }: { risk: number }) {
  if (risk >= 25)
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-[10px]">High</Badge>

  if (risk >= 10)
    return <Badge className="bg-warning/20 text-warning border-warning/30 text-[10px]">Medium</Badge>

  return <Badge className="bg-success/20 text-success border-success/30 text-[10px]">Low</Badge>
}

function calculateClashRisk(course, courses) {
  let risk = 0

  courses.forEach(other => {

    if (course.id === other.id) return

    // 1️⃣ Faculty Clash (40%)
    if (course.faculty === other.faculty && course.slot === other.slot) {
      risk += 0.40
    }

    // 2️⃣ Room Clash (30%)
    if (course.room === other.room && course.slot === other.slot) {
      risk += 0.30
    }

    // 4️⃣ Student Overlap (10%)
    if (course.department === other.department && course.slot === other.slot) {
      risk += 0.10
    }

  })

  // 3️⃣ Room Capacity (15%)
if (course.students > course.capacity){ 
    // example capacity rule
    risk += 0.15
  }

  // 5️⃣ Department Load (5%)
  const deptCourses = courses.filter(
    c => c.department === course.department && c.slot === course.slot
  )

  if (deptCourses.length > 2) {
    risk += 0.05
  }

  return Math.min(risk, 1)
}

export function AcademicModule() {

  const [courses, setCourses] = useState<any[]>([])

 useEffect(() => {
  fetch("/api/courses")
    .then(res => res.json())
    .then(data => {

      const coursesWithRisk = data.map(course => ({
        ...course,
        clashRisk: calculateClashRisk(course, data)
      }))

      setCourses(coursesWithRisk)

    })
}, [])


  const clashData = courses.map((c) => ({
    name: c.id,
    risk: Math.round(c.clashRisk * 100),
  }))


  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Academic Digital Twin
        </h2>
        <p className="text-sm text-muted-foreground">
          Course scheduling simulation, clash prediction, and timetable optimization
        </p>
      </div>


      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  {courses.filter(c => c.clashRisk >= 0.2).length}
                </span>
                <p className="text-xs text-muted-foreground">High Clash Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  {courses.filter(c => c.clashRisk < 0.1).length}
                </span>
                <p className="text-xs text-muted-foreground">Optimal Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  {courses.length}
                </span>
                <p className="text-xs text-muted-foreground">Scheduled Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>



      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        {/* Clash Risk Chart */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              Clash Risk by Course
            </CardTitle>
            <CardDescription>
              Higher values indicate scheduling conflicts
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clashData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />

                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(220, 10%, 55%)" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Clash Risk"]}
                  />

                  <Bar
                    dataKey="risk"
                    radius={[4, 4, 0, 0]}
                    name="Risk %"
                    fill="hsl(160, 84%, 50%)"
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>
          </CardContent>
        </Card>



        {/* Department Radar */}
        <Card className="glass-card">

          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              Department Resource Map
            </CardTitle>
            <CardDescription>
              Comparative resource allocation
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <RadarChart data={deptRadar}>

                  <PolarGrid stroke="hsl(225, 15%, 16%)" />

                  <PolarAngleAxis
                    dataKey="department"
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }}
                  />

                  <PolarRadiusAxis
                    tick={{ fontSize: 9, fill: "hsl(220, 10%, 55%)" }}
                    axisLine={false}
                  />

                  <Radar
                    name="Students"
                    dataKey="students"
                    stroke="hsl(160, 84%, 50%)"
                    fill="hsl(160, 84%, 50%)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />

                  <Radar
                    name="Faculty"
                    dataKey="faculty"
                    stroke="hsl(200, 80%, 55%)"
                    fill="hsl(200, 80%, 55%)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />

                  <Radar
                    name="Rooms"
                    dataKey="rooms"
                    stroke="hsl(35, 92%, 60%)"
                    fill="hsl(35, 92%, 60%)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />

                  <Tooltip />

                </RadarChart>

              </ResponsiveContainer>

            </div>
          </CardContent>

        </Card>

      </div>



      {/* Course Table */}
      <Card className="glass-card">

        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Course Schedule
          </CardTitle>
          <CardDescription>
            Complete timetable with clash risk analysis
          </CardDescription>
        </CardHeader>


        <CardContent>

          <div className="overflow-x-auto">

            <table className="w-full text-xs">

              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2.5 px-3">Course</th>
                  <th className="text-left py-2.5 px-3">Name</th>
                  <th className="text-left py-2.5 px-3">Faculty</th>
                  <th className="text-left py-2.5 px-3">Slot</th>
                  <th className="text-left py-2.5 px-3">Room</th>
                  <th className="text-center py-2.5 px-3">Students</th>
                  <th className="text-center py-2.5 px-3">Clash Risk</th>
                  <th className="text-center py-2.5 px-3">Action</th>
                </tr>
              </thead>


              <tbody>

                {courses.map((course) => (

                  <tr key={course.id} className="border-b">

                    <td className="py-2.5 px-3 font-mono font-semibold">
                      {course.id}
                    </td>

                    <td className="py-2.5 px-3">{course.name}</td>

                    <td className="py-2.5 px-3">{course.faculty}</td>

                    <td className="py-2.5 px-3">{course.slot}</td>

                    <td className="py-2.5 px-3">{course.room}</td>

                    <td className="py-2.5 px-3 text-center">
                      {course.students}
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <ClashBadge risk={Math.round(course.clashRisk * 100)} />
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      {course.clashRisk >= 0.2 && (
                        <button className="text-primary text-[10px] font-medium inline-flex items-center gap-1">
                          Optimize
                          <ArrowRight className="h-3 w-3" />
                        </button>
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