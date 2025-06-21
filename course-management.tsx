"use client"

import type React from "react"

import { useState } from "react"
import { Plus, BookOpen, Calendar, User, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Course class definition with specified attributes
class Course {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  creator_id: string
  instructors: string[]

  constructor(data: Partial<Course> = {}) {
    this.id = data.id || Math.random().toString(36).substr(2, 9)
    this.name = data.name || ""
    this.description = data.description || ""
    this.start_date = data.start_date || ""
    this.end_date = data.end_date || ""
    this.creator_id = data.creator_id || ""
    this.instructors = data.instructors || []
  }

  // Method to calculate course duration in days
  getDurationInDays(): number {
    if (!this.start_date || !this.end_date) return 0
    const start = new Date(this.start_date)
    const end = new Date(this.end_date)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Method to check if course is currently active
  isActive(): boolean {
    const now = new Date()
    const start = new Date(this.start_date)
    const end = new Date(this.end_date)
    return now >= start && now <= end
  }

  // Method to check if course is upcoming
  isUpcoming(): boolean {
    const now = new Date()
    const start = new Date(this.start_date)
    return now < start
  }

  // Method to check if course has ended
  hasEnded(): boolean {
    const now = new Date()
    const end = new Date(this.end_date)
    return now > end
  }

  // Method to get course status
  getStatus(): "Upcoming" | "Active" | "Ended" {
    if (this.isUpcoming()) return "Upcoming"
    if (this.isActive()) return "Active"
    return "Ended"
  }

  // Method to get status color
  getStatusColor(): string {
    const status = this.getStatus()
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Ended":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Method to format date for display
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Method to get instructors as comma-separated string
  getInstructorsString(): string {
    return this.instructors.join(", ")
  }
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    new Course({
      name: "Introduction to React Development",
      description:
        "Learn the fundamentals of React including components, props, state, and hooks. This comprehensive course will take you from beginner to intermediate level.",
      start_date: "2024-02-01",
      end_date: "2024-03-15",
      creator_id: "user_123",
      instructors: ["John Smith", "Sarah Johnson"],
    }),
    new Course({
      name: "Advanced JavaScript Patterns",
      description:
        "Master advanced JavaScript concepts and design patterns for professional development. Dive deep into closures, prototypes, and modern ES6+ features.",
      start_date: "2024-01-15",
      end_date: "2024-02-28",
      creator_id: "user_456",
      instructors: ["Mike Wilson"],
    }),
    new Course({
      name: "Full-Stack Web Development",
      description:
        "Complete full-stack development course covering frontend and backend technologies including Node.js, Express, and database integration.",
      start_date: "2024-03-01",
      end_date: "2024-05-30",
      creator_id: "user_789",
      instructors: ["Emily Davis", "Robert Chen", "Lisa Anderson"],
    }),
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    creator_id: "",
    instructors: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      creator_id: "",
      instructors: "",
    })
    setEditingCourse(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      name: formData.name,
      description: formData.description,
      start_date: formData.start_date,
      end_date: formData.end_date,
      creator_id: formData.creator_id,
      instructors: formData.instructors
        .split(",")
        .map((instructor) => instructor.trim())
        .filter(Boolean),
    }

    if (editingCourse) {
      // Update existing course
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id ? new Course({ ...courseData, id: editingCourse.id }) : course,
        ),
      )
    } else {
      // Create new course
      setCourses([...courses, new Course(courseData)])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      description: course.description,
      start_date: course.start_date,
      end_date: course.end_date,
      creator_id: course.creator_id,
      instructors: course.instructors.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">Create and manage your courses</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
              <DialogDescription>
                {editingCourse ? "Update course information" : "Fill in the details to create a new course"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creator_id">Creator ID</Label>
                <Input
                  id="creator_id"
                  value={formData.creator_id}
                  onChange={(e) => setFormData({ ...formData, creator_id: e.target.value })}
                  placeholder="Enter creator ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructors">Instructors</Label>
                <Input
                  id="instructors"
                  value={formData.instructors}
                  onChange={(e) => setFormData({ ...formData, instructors: e.target.value })}
                  placeholder="Enter instructor names separated by commas"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Separate multiple instructors with commas (e.g., "John Smith, Sarah Johnson")
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingCourse ? "Update Course" : "Create Course"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription className="mt-1">Created by: {course.creator_id}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Badge className={course.getStatusColor()}>{course.getStatus()}</Badge>
                <Badge variant="outline">{course.getDurationInDays()} days</Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{course.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>
                    <strong>Start:</strong> {course.formatDate(course.start_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>
                    <strong>End:</strong> {course.formatDate(course.end_date)}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Users className="h-4 w-4 mt-0.5" />
                  <div>
                    <div>
                      <strong>Instructors:</strong>
                    </div>
                    <div className="text-muted-foreground">{course.getInstructorsString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>
                    <strong>Creator:</strong> {course.creator_id}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
          <p className="text-muted-foreground">Get started by creating your first course.</p>
        </div>
      )}
    </div>
  )
}
