// ============================================
// CampusTwin - Digital Twin Platform Data
// ============================================

// KPI Overview
export const kpiData = {
  totalStudents: 4250,
  totalFaculty: 186,
  totalRooms: 72,
  totalCourses: 148,
  avgAttendance: 78.5,
  avgPerformance: 72.3,
  roomUtilization: 64.8,
  facultyLoadBalance: 71.2,
}

// Attendance trend over months
export const attendanceTrend = [
  { month: "Jan", attendance: 82, performance: 74 },
  { month: "Feb", attendance: 79, performance: 71 },
  { month: "Mar", attendance: 85, performance: 76 },
  { month: "Apr", attendance: 74, performance: 68 },
  { month: "May", attendance: 71, performance: 65 },
  { month: "Jun", attendance: 68, performance: 62 },
  { month: "Jul", attendance: 76, performance: 70 },
  { month: "Aug", attendance: 80, performance: 73 },
  { month: "Sep", attendance: 83, performance: 75 },
  { month: "Oct", attendance: 78, performance: 72 },
  { month: "Nov", attendance: 81, performance: 74 },
  { month: "Dec", attendance: 77, performance: 70 },
]

// Department data
export const departments = [
  { name: "Computer Science", students: 820, faculty: 38, rooms: 14, avgGPA: 3.4 },
  { name: "Electronics", students: 680, faculty: 32, rooms: 12, avgGPA: 3.2 },
  { name: "Mechanical", students: 560, faculty: 28, rooms: 10, avgGPA: 3.1 },
  { name: "Civil", students: 480, faculty: 24, rooms: 9, avgGPA: 3.0 },
  { name: "Electrical", students: 520, faculty: 26, rooms: 10, avgGPA: 3.3 },
  { name: "Mathematics", students: 340, faculty: 18, rooms: 7, avgGPA: 3.5 },
  { name: "Physics", students: 420, faculty: 12, rooms: 6, avgGPA: 3.2 },
  { name: "Chemistry", students: 430, faculty: 8, rooms: 4, avgGPA: 3.1 },
]

// Course scheduling data
export const courses = [
  { id: "CS301", name: "Data Structures", dept: "Computer Science", semester: 3, students: 120, slot: "Mon 9-10", room: "LH-201", faculty: "Dr. Sharma", clashRisk: 0.15 },
  { id: "CS401", name: "Machine Learning", dept: "Computer Science", semester: 5, students: 95, slot: "Mon 11-12", room: "LH-202", faculty: "Dr. Gupta", clashRisk: 0.08 },
  { id: "CS302", name: "Database Systems", dept: "Computer Science", semester: 3, students: 115, slot: "Tue 9-10", room: "LH-201", faculty: "Prof. Kapoor", clashRisk: 0.22 },
  { id: "EC301", name: "Digital Circuits", dept: "Electronics", semester: 3, students: 88, slot: "Tue 11-12", room: "LH-103", faculty: "Dr. Patel", clashRisk: 0.05 },
  { id: "ME201", name: "Thermodynamics", dept: "Mechanical", semester: 3, students: 102, slot: "Wed 9-10", room: "LH-105", faculty: "Dr. Joshi", clashRisk: 0.12 },
  { id: "CS501", name: "AI & Deep Learning", dept: "Computer Science", semester: 7, students: 78, slot: "Wed 2-3", room: "LH-301", faculty: "Dr. Reddy", clashRisk: 0.30 },
  { id: "EC401", name: "VLSI Design", dept: "Electronics", semester: 5, students: 72, slot: "Thu 9-10", room: "LH-103", faculty: "Prof. Mehta", clashRisk: 0.18 },
  { id: "CE301", name: "Structural Analysis", dept: "Civil", semester: 3, students: 65, slot: "Thu 11-12", room: "LH-107", faculty: "Dr. Singh", clashRisk: 0.10 },
  { id: "EE301", name: "Power Systems", dept: "Electrical", semester: 3, students: 82, slot: "Fri 9-10", room: "LH-109", faculty: "Prof. Rao", clashRisk: 0.25 },
  { id: "MA201", name: "Linear Algebra", dept: "Mathematics", semester: 3, students: 200, slot: "Fri 11-12", room: "AUD-1", faculty: "Dr. Iyer", clashRisk: 0.03 },
]

// Faculty data
export const facultyData = [
  { id: 1, name: "Dr. Sharma", dept: "Computer Science", classes: 18, duties: 3, freeHours: 8, load: 92, status: "overloaded" },
  { id: 2, name: "Dr. Gupta", dept: "Computer Science", classes: 14, duties: 2, freeHours: 14, load: 72, status: "balanced" },
  { id: 3, name: "Prof. Kapoor", dept: "Computer Science", classes: 16, duties: 4, freeHours: 6, load: 88, status: "overloaded" },
  { id: 4, name: "Dr. Patel", dept: "Electronics", classes: 12, duties: 2, freeHours: 16, load: 65, status: "balanced" },
  { id: 5, name: "Dr. Joshi", dept: "Mechanical", classes: 15, duties: 3, freeHours: 10, load: 80, status: "balanced" },
  { id: 6, name: "Dr. Reddy", dept: "Computer Science", classes: 10, duties: 1, freeHours: 20, load: 52, status: "underloaded" },
  { id: 7, name: "Prof. Mehta", dept: "Electronics", classes: 17, duties: 5, freeHours: 4, load: 95, status: "overloaded" },
  { id: 8, name: "Dr. Singh", dept: "Civil", classes: 13, duties: 2, freeHours: 14, load: 68, status: "balanced" },
  { id: 9, name: "Prof. Rao", dept: "Electrical", classes: 16, duties: 3, freeHours: 8, load: 85, status: "overloaded" },
  { id: 10, name: "Dr. Iyer", dept: "Mathematics", classes: 11, duties: 1, freeHours: 18, load: 58, status: "balanced" },
  { id: 11, name: "Prof. Nair", dept: "Physics", classes: 9, duties: 1, freeHours: 22, load: 45, status: "underloaded" },
  { id: 12, name: "Dr. Kumar", dept: "Chemistry", classes: 14, duties: 2, freeHours: 12, load: 74, status: "balanced" },
]

export const facultyLoadDistribution = [
  { range: "0-40%", count: 8 },
  { range: "41-60%", count: 32 },
  { range: "61-80%", count: 86 },
  { range: "81-90%", count: 42 },
  { range: "91-100%", count: 18 },
]

// Room / Infrastructure data
export const rooms = [
  { id: "LH-201", type: "Lecture Hall", capacity: 150, utilization: 82, dept: "Computer Science", electricityKWh: 45 },
  { id: "LH-202", type: "Lecture Hall", capacity: 120, utilization: 76, dept: "Computer Science", electricityKWh: 38 },
  { id: "LH-103", type: "Lecture Hall", capacity: 100, utilization: 68, dept: "Electronics", electricityKWh: 32 },
  { id: "LH-105", type: "Lecture Hall", capacity: 120, utilization: 71, dept: "Mechanical", electricityKWh: 36 },
  { id: "LH-107", type: "Lecture Hall", capacity: 80, utilization: 55, dept: "Civil", electricityKWh: 24 },
  { id: "LH-109", type: "Lecture Hall", capacity: 100, utilization: 62, dept: "Electrical", electricityKWh: 30 },
  { id: "LH-301", type: "Lecture Hall", capacity: 80, utilization: 48, dept: "Computer Science", electricityKWh: 20 },
  { id: "AUD-1", type: "Auditorium", capacity: 500, utilization: 35, dept: "General", electricityKWh: 120 },
  { id: "LAB-CS1", type: "Lab", capacity: 60, utilization: 88, dept: "Computer Science", electricityKWh: 65 },
  { id: "LAB-CS2", type: "Lab", capacity: 60, utilization: 72, dept: "Computer Science", electricityKWh: 58 },
  { id: "LAB-EC1", type: "Lab", capacity: 40, utilization: 40, dept: "Electronics", electricityKWh: 48 },
  { id: "LAB-ME1", type: "Lab", capacity: 30, utilization: 65, dept: "Mechanical", electricityKWh: 72 },
]

export const roomUtilizationByHour = [
  { hour: "8 AM", utilization: 45 },
  { hour: "9 AM", utilization: 82 },
  { hour: "10 AM", utilization: 90 },
  { hour: "11 AM", utilization: 88 },
  { hour: "12 PM", utilization: 42 },
  { hour: "1 PM", utilization: 38 },
  { hour: "2 PM", utilization: 75 },
  { hour: "3 PM", utilization: 70 },
  { hour: "4 PM", utilization: 55 },
  { hour: "5 PM", utilization: 30 },
]

export const electricityUsage = [
  { month: "Jan", usage: 12400 },
  { month: "Feb", usage: 11800 },
  { month: "Mar", usage: 13200 },
  { month: "Apr", usage: 14500 },
  { month: "May", usage: 16800 },
  { month: "Jun", usage: 18200 },
  { month: "Jul", usage: 17500 },
  { month: "Aug", usage: 16200 },
  { month: "Sep", usage: 14800 },
  { month: "Oct", usage: 13500 },
  { month: "Nov", usage: 12800 },
  { month: "Dec", usage: 12100 },
]

// Student behavior data
export const studentPerformanceBySubject = [
  { subject: "Data Structures", avgScore: 62, passRate: 71, difficulty: "High", timeSlot: "2 PM" },
  { subject: "Machine Learning", avgScore: 68, passRate: 78, difficulty: "High", timeSlot: "11 AM" },
  { subject: "Database Systems", avgScore: 74, passRate: 85, difficulty: "Medium", timeSlot: "9 AM" },
  { subject: "Digital Circuits", avgScore: 70, passRate: 82, difficulty: "Medium", timeSlot: "11 AM" },
  { subject: "Thermodynamics", avgScore: 65, passRate: 75, difficulty: "High", timeSlot: "9 AM" },
  { subject: "Linear Algebra", avgScore: 78, passRate: 88, difficulty: "Low", timeSlot: "11 AM" },
  { subject: "Power Systems", avgScore: 66, passRate: 74, difficulty: "High", timeSlot: "9 AM" },
  { subject: "Structural Analysis", avgScore: 72, passRate: 80, difficulty: "Medium", timeSlot: "11 AM" },
]

export const attendanceByTimeSlot = [
  { slot: "8 AM", attendance: 62 },
  { slot: "9 AM", attendance: 78 },
  { slot: "10 AM", attendance: 85 },
  { slot: "11 AM", attendance: 88 },
  { slot: "12 PM", attendance: 72 },
  { slot: "1 PM", attendance: 65 },
  { slot: "2 PM", attendance: 60 },
  { slot: "3 PM", attendance: 68 },
  { slot: "4 PM", attendance: 55 },
]

export const studentPerformanceTrend = [
  { month: "Jan", topPerformers: 28, average: 45, atRisk: 27 },
  { month: "Feb", topPerformers: 30, average: 44, atRisk: 26 },
  { month: "Mar", topPerformers: 32, average: 43, atRisk: 25 },
  { month: "Apr", topPerformers: 29, average: 42, atRisk: 29 },
  { month: "May", topPerformers: 27, average: 41, atRisk: 32 },
  { month: "Jun", topPerformers: 25, average: 40, atRisk: 35 },
  { month: "Jul", topPerformers: 28, average: 43, atRisk: 29 },
  { month: "Aug", topPerformers: 31, average: 44, atRisk: 25 },
  { month: "Sep", topPerformers: 33, average: 45, atRisk: 22 },
  { month: "Oct", topPerformers: 30, average: 44, atRisk: 26 },
  { month: "Nov", topPerformers: 32, average: 43, atRisk: 25 },
  { month: "Dec", topPerformers: 29, average: 44, atRisk: 27 },
]

// Heatmap data: attendance by day x hour
export const attendanceHeatmap = [
  { day: "Monday", "8AM": 58, "9AM": 76, "10AM": 88, "11AM": 92, "12PM": 70, "1PM": 62, "2PM": 55, "3PM": 64, "4PM": 50 },
  { day: "Tuesday", "8AM": 62, "9AM": 80, "10AM": 90, "11AM": 88, "12PM": 68, "1PM": 60, "2PM": 58, "3PM": 66, "4PM": 52 },
  { day: "Wednesday", "8AM": 55, "9AM": 74, "10AM": 85, "11AM": 86, "12PM": 72, "1PM": 65, "2PM": 60, "3PM": 68, "4PM": 48 },
  { day: "Thursday", "8AM": 60, "9AM": 78, "10AM": 87, "11AM": 90, "12PM": 66, "1PM": 58, "2PM": 54, "3PM": 62, "4PM": 46 },
  { day: "Friday", "8AM": 48, "9AM": 68, "10AM": 78, "11AM": 82, "12PM": 60, "1PM": 52, "2PM": 48, "3PM": 55, "4PM": 40 },
]

// AI Insights / Decision Engine
export const aiInsights = [
  { id: 1, type: "optimization", severity: "high", module: "Academic", title: "Schedule Conflict Detected", description: "CS301 (Data Structures) and CS302 (Database Systems) share 42 common students. Moving CS301 to Wednesday reduces clash by 30%.", action: "Shift CS301 to Wed 9-10 AM" },
  { id: 2, type: "alert", severity: "critical", module: "Faculty", title: "Faculty Overload Warning", description: "Prof. Mehta has 95% workload with 17 classes and 5 duties. Redistribute 2 duties to Prof. Nair (45% load).", action: "Redistribute duties" },
  { id: 3, type: "optimization", severity: "medium", module: "Infrastructure", title: "Lab Underutilization", description: "LAB-EC1 (Electronics Lab) is utilized only 40%. Consider merging some sessions with LAB-CS2 during off-peak hours.", action: "Merge lab sessions" },
  { id: 4, type: "prediction", severity: "high", module: "Student", title: "At-Risk Students in Data Structures", description: "Students in 2 PM Data Structures slot show 15% lower attendance. Moving to 10 AM slot could improve performance by 12%.", action: "Reschedule to 10 AM" },
  { id: 5, type: "optimization", severity: "medium", module: "Resource", title: "Energy Optimization Available", description: "AUD-1 runs full HVAC at 35% capacity. Switching to zone cooling saves estimated 25% energy costs.", action: "Enable zone cooling" },
  { id: 6, type: "alert", severity: "low", module: "Academic", title: "Timetable Gap Detected", description: "3rd semester CS students have a 3-hour gap between classes on Thursday. Consider filling with tutorial session.", action: "Add tutorial slot" },
]

// Smart Alerts
export const smartAlerts = [
  { id: 1, type: "warning", title: "Faculty Overload", message: "4 faculty members exceed 85% workload capacity", time: "2 min ago" },
  { id: 2, type: "critical", title: "Room Conflict", message: "LH-201 double-booked for Thursday 2-3 PM", time: "15 min ago" },
  { id: 3, type: "info", title: "Attendance Drop", message: "Friday afternoon attendance dropped 18% this week", time: "1 hour ago" },
  { id: 4, type: "success", title: "Optimization Applied", message: "Lab session merge saved 12 hours/week", time: "3 hours ago" },
  { id: 5, type: "warning", title: "Performance Alert", message: "38 students at risk of failing Data Structures", time: "5 hours ago" },
]

// Simulation scenarios
export const scenarioComparisons = [
  { metric: "Class Clashes", before: 12, after: 4, improvement: 67 },
  { metric: "Faculty Overload", before: 18, after: 6, improvement: 67 },
  { metric: "Room Utilization", before: 64, after: 82, improvement: 28 },
  { metric: "Avg Attendance", before: 78, after: 86, improvement: 10 },
  { metric: "Energy Cost", before: 100, after: 75, improvement: 25 },
  { metric: "Student Satisfaction", before: 68, after: 84, improvement: 24 },
]

// System map - campus blocks
export const campusBlocks = [
  { id: "block-a", name: "Academic Block A", type: "academic", departments: ["Computer Science", "Electronics"], rooms: 26, utilization: 78 },
  { id: "block-b", name: "Academic Block B", type: "academic", departments: ["Mechanical", "Civil"], rooms: 19, utilization: 63 },
  { id: "block-c", name: "Science Block", type: "academic", departments: ["Mathematics", "Physics", "Chemistry"], rooms: 17, utilization: 58 },
  { id: "lab-block", name: "Laboratory Complex", type: "lab", departments: ["All"], rooms: 8, utilization: 66 },
  { id: "admin", name: "Admin Building", type: "admin", departments: ["Administration"], rooms: 12, utilization: 45 },
  { id: "library", name: "Central Library", type: "facility", departments: ["General"], rooms: 5, utilization: 72 },
]
