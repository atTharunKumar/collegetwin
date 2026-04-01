"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

import {
  AlertTriangle,
  CheckCircle,
  UserMinus,
} from "lucide-react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"


const statusColors: Record<string, string> = {
  overloaded: "text-destructive",
  balanced: "text-success",
  underloaded: "text-info",
}

const statusBg: Record<string, string> = {
  overloaded: "bg-destructive/15 border-destructive/30 text-destructive",
  balanced: "bg-success/15 border-success/30 text-success",
  underloaded: "bg-info/15 border-info/30 text-info",
}


export function FacultyModule() {

  const [facultyData, setFacultyData] = useState<any[]>([])

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const res = await fetch("/api/courses")
        const courses = await res.json()

        console.log("Courses Data:", courses)

        const facultyMap: any = {}

        courses.forEach((course: any) => {

          const name = course.faculty

          if (!facultyMap[name]) {
            facultyMap[name] = {
              id: name,
              name: name,
              dept: course.department,
              classes: 0,
              duties: 0,
              freeHours: 0,
              load: 0,
              status: "balanced"
            }
          }

          facultyMap[name].classes += 1

        })


        const facultyArray = Object.values(facultyMap).map((f: any) => {

          const load = f.classes * 20

          let status = "balanced"

          if (load > 80) status = "overloaded"
          else if (load < 40) status = "underloaded"

          return {
            ...f,
            load,
            status
          }

        })


        setFacultyData(facultyArray)

      } catch (error) {

        console.error("Faculty Fetch Error:", error)

      }

    }

    fetchCourses()

  }, [])


  const overloaded = facultyData.filter(f => f.status === "overloaded").length
  const balanced = facultyData.filter(f => f.status === "balanced").length
  const underloaded = facultyData.filter(f => f.status === "underloaded").length


  const facultyLoadDistribution = [
    { range: "0-30", count: facultyData.filter(f => f.load <= 30).length },
    { range: "31-60", count: facultyData.filter(f => f.load > 30 && f.load <= 60).length },
    { range: "61-80", count: facultyData.filter(f => f.load > 60 && f.load <= 80).length },
    { range: "81-100", count: facultyData.filter(f => f.load > 80).length },
  ]


  const pieData = [
    { name: "Overloaded", value: overloaded, color: "hsl(0,72%,55%)" },
    { name: "Balanced", value: balanced, color: "hsl(160,84%,50%)" },
    { name: "Underloaded", value: underloaded, color: "hsl(200,80%,55%)" },
  ]


  return (
    <div className="flex flex-col gap-6">

      <div>
        <h2 className="text-lg font-semibold text-foreground">Faculty Workload Twin</h2>
        <p className="text-sm text-muted-foreground">
          Workload calculated automatically from course assignments
        </p>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Card className="glass-card">
          <CardContent className="p-5 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <span className="text-2xl font-bold">{overloaded}</span>
              <p className="text-xs text-muted-foreground">Overloaded Faculty</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-5 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <span className="text-2xl font-bold">{balanced}</span>
              <p className="text-xs text-muted-foreground">Balanced</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-5 flex items-center gap-3">
            <UserMinus className="h-5 w-5 text-info" />
            <div>
              <span className="text-2xl font-bold">{underloaded}</span>
              <p className="text-xs text-muted-foreground">Underloaded</p>
            </div>
          </CardContent>
        </Card>

      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        {/* Bar Chart */}
        <Card className="glass-card">

          <CardHeader>
            <CardTitle className="text-sm">Load Distribution</CardTitle>
            <CardDescription>Faculty workload ranges</CardDescription>
          </CardHeader>

          <CardContent>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={facultyLoadDistribution}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="range" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="count" fill="hsl(200,80%,55%)" />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>


        {/* Pie Chart */}
        <Card className="glass-card">

          <CardHeader>
            <CardTitle className="text-sm">Faculty Status</CardTitle>
            <CardDescription>Workload balance</CardDescription>
          </CardHeader>

          <CardContent>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                  >

                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

      </div>


      {/* Table */}
      <Card className="glass-card">

        <CardHeader>
          <CardTitle className="text-sm">Faculty Details</CardTitle>
          <CardDescription>Auto generated from courses</CardDescription>
        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto">

            <table className="w-full text-xs">

              <thead>
                <tr>
                  <th className="text-left py-2 px-3">Name</th>
                  <th className="text-left py-2 px-3">Dept</th>
                  <th className="text-center py-2 px-3">Classes</th>
                  <th className="text-left py-2 px-3">Load</th>
                  <th className="text-center py-2 px-3">Status</th>
                </tr>
              </thead>

              <tbody>

                {facultyData.map((f) => (

                  <tr key={f.id}>

                    <td className="py-2 px-3 font-semibold">{f.name}</td>

                    <td className="py-2 px-3">{f.dept}</td>

                    <td className="py-2 px-3 text-center">{f.classes}</td>

                    <td className="py-2 px-3">

                      <div className="flex items-center gap-2">

                        <Progress value={f.load} className="h-1.5 flex-1" />

                        <span className={`text-[11px] font-semibold ${statusColors[f.status]}`}>
                          {f.load}%
                        </span>

                      </div>

                    </td>

                    <td className="py-2 px-3 text-center">

                      <Badge className={`text-[10px] border ${statusBg[f.status]}`}>
                        {f.status}
                      </Badge>

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