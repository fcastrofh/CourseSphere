"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Play, Calendar, User, Video, Edit, Trash2, Eye, Archive, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import Link from "next/link"

// Lesson class definition with specified attributes
class Lesson {
  id: string
  title: string
  status: "draft" | "published" | "archived"
  publish_date: string
  video_url: string
  course_id: string
  creator_id: string

  constructor(data: Partial<Lesson> = {}) {
    this.id = data.id || Math.random().toString(36).substr(2, 9)
    this.title = data.title || ""
    this.status = data.status || "draft"
    this.publish_date = data.publish_date || ""
    this.video_url = data.video_url || ""
    this.course_id = data.course_id || ""
    this.creator_id = data.creator_id || ""
  }

  // Method to check if lesson is published
  isPublished(): boolean {
    return this.status === "published"
  }

  // Method to check if lesson is archived
  isArchived(): boolean {
    return this.status === "archived"
  }

  // Method to check if lesson is draft
  isDraft(): boolean {
    return this.status === "draft"
  }

  // Method to get status color
  getStatusColor(): string {
    switch (this.status) {
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

  // Method to get status icon
  getStatusIcon(): React.ReactNode {
    switch (this.status) {
      case "published":
        return <Eye className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  // Method to format publish date
  getFormattedPublishDate(): string {
    if (!this.publish_date) return "Not published"
    return new Date(this.publish_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Method to check if publish date is in the future
  isScheduled(): boolean {
    if (!this.publish_date || this.status !== "published") return false
    return new Date(this.publish_date) > new Date()
  }

  // Method to get video filename from URL
  getVideoFileName(): string {
    if (!this.video_url) return "No video"
    try {
      const url = new URL(this.video_url)
      const pathname = url.pathname
      const filename = pathname.split("/").pop() || "video"
      return filename
    } catch {
      return this.video_url.split("/").pop() || "video"
    }
  }

  // Method to update lesson status and set publish date if needed
  updateStatus(newStatus: "draft" | "published" | "archived"): Lesson {
    const updates: Partial<Lesson> = { status: newStatus }

    // Set publish_date when publishing for the first time
    if (newStatus === "published" && this.status !== "published") {
      updates.publish_date = new Date().toISOString().split("T")[0]
    }

    return new Lesson({ ...this, ...updates })
  }

  // Method to publish lesson
  publish(publishDate?: string): Lesson {
    return new Lesson({
      ...this,
      status: "published",
      publish_date: publishDate || new Date().toISOString().split("T")[0],
    })
  }

  // Method to archive lesson
  archive(): Lesson {
    return new Lesson({ ...this, status: "archived" })
  }

  // Method to revert to draft
  makeDraft(): Lesson {
    return new Lesson({ ...this, status: "draft" })
  }
}

export default function LessonManagement() {
  const [lessons, setLessons] = useState<Lesson[]>([
    new Lesson({
      title: "Introduction to React Components",
      status: "published",
      publish_date: "2024-01-15",
      video_url: "https://example.com/videos/react-components-intro.mp4",
      course_id: "course_001",
      creator_id: "user_123",
    }),
    new Lesson({
      title: "Understanding JSX Syntax",
      status: "published",
      publish_date: "2024-01-20",
      video_url: "https://example.com/videos/jsx-syntax.mp4",
      course_id: "course_001",
      creator_id: "user_123",
    }),
    new Lesson({
      title: "React Hooks Deep Dive",
      status: "draft",
      publish_date: "",
      video_url: "https://example.com/videos/react-hooks.mp4",
      course_id: "course_001",
      creator_id: "user_456",
    }),
    new Lesson({
      title: "State Management with Redux",
      status: "published",
      publish_date: "2024-02-01",
      video_url: "https://example.com/videos/redux-basics.mp4",
      course_id: "course_002",
      creator_id: "user_789",
    }),
    new Lesson({
      title: "Advanced Component Patterns",
      status: "archived",
      publish_date: "2023-12-01",
      video_url: "https://example.com/videos/advanced-patterns.mp4",
      course_id: "course_001",
      creator_id: "user_123",
    }),
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [formData, setFormData] = useState({
    title: "",
    status: "draft" as const,
    publish_date: "",
    video_url: "",
    course_id: "",
    creator_id: "",
  })

  // Mock course data for dropdown
  const courses = [
    { id: "course_001", name: "Introduction to React Development" },
    { id: "course_002", name: "Advanced JavaScript Patterns" },
    { id: "course_003", name: "Full-Stack Web Development" },
  ]

  const resetForm = () => {
    setFormData({
      title: "",
      status: "draft",
      publish_date: "",
      video_url: "",
      course_id: "",
      creator_id: "",
    })
    setEditingLesson(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const lessonData = {
      title: formData.title,
      status: formData.status,
      publish_date: formData.publish_date,
      video_url: formData.video_url,
      course_id: formData.course_id,
      creator_id: formData.creator_id,
    }

    if (editingLesson) {
      // Update existing lesson
      setLessons(
        lessons.map((lesson) =>
          lesson.id === editingLesson.id ? new Lesson({ ...lessonData, id: editingLesson.id }) : lesson,
        ),
      )
    } else {
      // Create new lesson
      setLessons([...lessons, new Lesson(lessonData)])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      status: lesson.status,
      publish_date: lesson.publish_date,
      video_url: lesson.video_url,
      course_id: lesson.course_id,
      creator_id: lesson.creator_id,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (lessonId: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId))
  }

  const handleStatusChange = (lessonId: string, newStatus: "draft" | "published" | "archived") => {
    setLessons(lessons.map((lesson) => (lesson.id === lessonId ? lesson.updateStatus(newStatus) : lesson)))
  }

  const handleQuickPublish = (lessonId: string) => {
    setLessons(lessons.map((lesson) => (lesson.id === lessonId ? lesson.publish() : lesson)))
  }

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const courseMatch = selectedCourse === "all" || lesson.course_id === selectedCourse
    const statusMatch = statusFilter === "all" || lesson.status === statusFilter
    return courseMatch && statusMatch
  })

  // Group lessons by status for summary
  const lessonStats = {
    total: lessons.length,
    published: lessons.filter((l) => l.status === "published").length,
    draft: lessons.filter((l) => l.status === "draft").length,
    archived: lessons.filter((l) => l.status === "archived").length,
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Lesson Management</h1>
            <p className="text-muted-foreground">Create and manage video lessons</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingLesson ? "Edit Lesson" : "Create New Lesson"}</DialogTitle>
              <DialogDescription>
                {editingLesson ? "Update lesson information" : "Fill in the details to create a new lesson"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter lesson title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course_id">Course</Label>
                  <Select
                    value={formData.course_id}
                    onValueChange={(value) => setFormData({ ...formData, course_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creator_id">Creator ID</Label>
                  <Input
                    id="creator_id"
                    value={formData.creator_id}
                    onChange={(e) => setFormData({ ...formData, creator_id: e.target.value })}
                    placeholder="user_123"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://example.com/video.mp4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Publish Date</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for immediate publishing</p>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingLesson ? "Update Lesson" : "Create Lesson"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{lessonStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Lessons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{lessonStats.published}</div>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{lessonStats.draft}</div>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{lessonStats.archived}</div>
            <p className="text-sm text-muted-foreground">Archived</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="course-filter">Course:</Label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter">Status:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lessons List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Course: {courses.find((c) => c.id === lesson.course_id)?.name || lesson.course_id}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(lesson)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(lesson.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Badge className={lesson.getStatusColor()}>
                  <span className="flex items-center gap-1">
                    {lesson.getStatusIcon()}
                    {lesson.status}
                  </span>
                </Badge>
                {lesson.isScheduled() && <Badge variant="outline">Scheduled</Badge>}
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    <strong>Publish Date:</strong> {lesson.getFormattedPublishDate()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>
                    <strong>Creator:</strong> {lesson.creator_id}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Play className="h-4 w-4 mt-0.5" />
                  <div className="flex-1">
                    <div>
                      <strong>Video:</strong>
                    </div>
                    <div className="text-muted-foreground break-all">{lesson.getVideoFileName()}</div>
                    {lesson.video_url && (
                      <a
                        href={lesson.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View Video
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                {lesson.isDraft() && (
                  <Button size="sm" onClick={() => handleQuickPublish(lesson.id)} className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Publish
                  </Button>
                )}
                {lesson.isPublished() && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(lesson.id, "archived")}
                    className="flex-1"
                  >
                    <Archive className="h-3 w-3 mr-1" />
                    Archive
                  </Button>
                )}
                {lesson.isArchived() && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(lesson.id, "draft")}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Restore
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <Video className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No lessons found</h3>
          <p className="text-muted-foreground">
            {selectedCourse !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters or create a new lesson."
              : "Get started by creating your first lesson."}
          </p>
        </div>
      )}
    </div>
  )
}
