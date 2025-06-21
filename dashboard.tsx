"use client"

import { useState } from "react"
import {
  BookOpen,
  Users,
  Play,
  TrendingUp,
  Calendar,
  Star,
  Eye,
  Plus,
  ArrowRight,
  BarChart3,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data for the dashboard
const dashboardData = {
  stats: {
    totalCourses: 24,
    totalLessons: 156,
    totalInstructors: 12,
    totalStudents: 2847,
    avgRating: 4.6,
    completionRate: 78,
  },
  recentCourses: [
    {
      id: "1",
      name: "Introduction to React Development",
      instructor: "John Smith",
      students: 245,
      rating: 4.8,
      status: "published",
      progress: 85,
    },
    {
      id: "2",
      name: "Advanced JavaScript Patterns",
      instructor: "Sarah Johnson",
      students: 189,
      rating: 4.7,
      status: "published",
      progress: 92,
    },
    {
      id: "3",
      name: "Full-Stack Web Development",
      instructor: "Mike Wilson",
      students: 156,
      rating: 4.9,
      status: "draft",
      progress: 45,
    },
  ],
  recentLessons: [
    {
      id: "1",
      title: "Understanding React Hooks",
      course: "Introduction to React Development",
      status: "published",
      views: 1234,
      duration: "45 min",
    },
    {
      id: "2",
      title: "State Management with Redux",
      course: "Advanced JavaScript Patterns",
      status: "published",
      views: 987,
      duration: "60 min",
    },
    {
      id: "3",
      title: "Building REST APIs",
      course: "Full-Stack Web Development",
      status: "draft",
      views: 0,
      duration: "50 min",
    },
  ],
  topInstructors: [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      courses: 8,
      students: 1245,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      courses: 6,
      students: 987,
      rating: 4.9,
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      courses: 4,
      students: 654,
      rating: 4.7,
    },
  ],
  monthlyStats: [
    { month: "Jan", courses: 18, lessons: 120, students: 2100 },
    { month: "Feb", courses: 20, lessons: 135, students: 2350 },
    { month: "Mar", courses: 22, lessons: 145, students: 2600 },
    { month: "Apr", courses: 24, lessons: 156, students: 2847 },
  ],
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const getInitials = (name: string): string => {
    const nameParts = name.trim().split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    const firstInitial = nameParts[0].charAt(0).toUpperCase()
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    return `${firstInitial}${lastInitial}`
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management Dashboard</h1>
          <p className="text-muted-foreground">Overview of your online learning platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.totalCourses}</div>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.totalLessons}</div>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.totalInstructors}</div>
                <p className="text-sm text-muted-foreground">Instructors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.totalStudents.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.avgRating}</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{dashboardData.stats.completionRate}%</div>
                <p className="text-sm text-muted-foreground">Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Manage Courses
            </CardTitle>
            <CardDescription>Create and edit course content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">{dashboardData.stats.totalCourses} courses available</div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Manage Lessons
            </CardTitle>
            <CardDescription>Create and organize lesson content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">{dashboardData.stats.totalLessons} lessons created</div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Manage Instructors
            </CardTitle>
            <CardDescription>Add and manage teaching staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {dashboardData.stats.totalInstructors} active instructors
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Courses</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{course.progress}%</div>
                  <Progress value={course.progress} className="w-16 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Lessons */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Lessons</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{lesson.title}</h4>
                  <p className="text-sm text-muted-foreground">{lesson.course}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Eye className="h-3 w-3" />
                      {lesson.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {lesson.duration}
                    </div>
                    <Badge className={getStatusColor(lesson.status)}>{lesson.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Instructors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Instructors</CardTitle>
            <CardDescription>Based on student enrollment and ratings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.topInstructors.map((instructor, index) => (
              <div key={instructor.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-muted-foreground w-4">#{index + 1}</div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {getInitials(instructor.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{instructor.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{instructor.courses} courses</span>
                    <span>{instructor.students} students</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {instructor.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Monthly statistics overview</CardDescription>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={selectedPeriod === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("month")}
                >
                  Month
                </Button>
                <Button
                  variant={selectedPeriod === "quarter" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("quarter")}
                >
                  Quarter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.monthlyStats.map((stat, index) => (
                <div key={stat.month} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{stat.month}</div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Courses</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(stat.courses / 30) * 100} className="flex-1" />
                      <span className="text-sm font-medium">{stat.courses}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Lessons</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(stat.lessons / 200) * 100} className="flex-1" />
                      <span className="text-sm font-medium">{stat.lessons}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Students</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(stat.students / 3000) * 100} className="flex-1" />
                      <span className="text-sm font-medium">{stat.students.toLocaleString()}</span>
                    </div>
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
