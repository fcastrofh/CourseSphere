"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Plus, User, Mail, Edit, Trash2, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Instructor class definition with specified attributes
class Instructor {
  id: string
  name: string
  email: string

  constructor(data: Partial<Instructor> = {}) {
    this.id = data.id || Math.random().toString(36).substr(2, 9)
    this.name = data.name || ""
    this.email = data.email || ""
  }

  // Method to get initials for avatar
  getInitials(): string {
    const nameParts = this.name.trim().split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    const firstInitial = nameParts[0].charAt(0).toUpperCase()
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    return `${firstInitial}${lastInitial}`
  }

  // Method to validate email format
  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this.email)
  }

  // Method to get email domain
  getEmailDomain(): string {
    if (!this.email.includes("@")) return ""
    return this.email.split("@")[1]
  }

  // Method to update instructor
  updateInstructor(updates: Partial<Instructor>): Instructor {
    return new Instructor({ ...this, ...updates })
  }

  // Method to check if instructor matches search query
  matchesSearch(query: string): boolean {
    const searchTerm = query.toLowerCase()
    return (
      this.name.toLowerCase().includes(searchTerm) ||
      this.email.toLowerCase().includes(searchTerm) ||
      this.getEmailDomain().toLowerCase().includes(searchTerm)
    )
  }
}

export default function InstructorManagement() {
  const [instructors, setInstructors] = useState<Instructor[]>([
    new Instructor({
      name: "John Smith",
      email: "john.smith@example.com",
    }),
    new Instructor({
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
    }),
    new Instructor({
      name: "Mike Wilson",
      email: "mike.wilson@techcorp.com",
    }),
    new Instructor({
      name: "Emily Davis",
      email: "emily.davis@academy.org",
    }),
    new Instructor({
      name: "Robert Chen",
      email: "robert.chen@institute.edu",
    }),
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
    })
    setEditingInstructor(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const instructorData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
    }

    // Check for duplicate email
    const existingInstructor = instructors.find(
      (instructor) => instructor.email === instructorData.email && instructor.id !== editingInstructor?.id,
    )

    if (existingInstructor) {
      alert("An instructor with this email already exists.")
      return
    }

    if (editingInstructor) {
      // Update existing instructor
      setInstructors(
        instructors.map((instructor) =>
          instructor.id === editingInstructor.id
            ? new Instructor({ ...instructorData, id: editingInstructor.id })
            : instructor,
        ),
      )
    } else {
      // Create new instructor
      setInstructors([...instructors, new Instructor(instructorData)])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name,
      email: instructor.email,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (instructorId: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      setInstructors(instructors.filter((instructor) => instructor.id !== instructorId))
    }
  }

  // Filter instructors based on search query
  const filteredInstructors = instructors.filter((instructor) =>
    searchQuery === "" ? true : instructor.matchesSearch(searchQuery),
  )

  // Sort instructors alphabetically by name
  const sortedInstructors = filteredInstructors.sort((a, b) => a.name.localeCompare(b.name))

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
            <h1 className="text-3xl font-bold">Instructor Management</h1>
            <p className="text-muted-foreground">Manage instructor profiles and contact information</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingInstructor ? "Edit Instructor" : "Add New Instructor"}</DialogTitle>
              <DialogDescription>
                {editingInstructor
                  ? "Update the instructor's information"
                  : "Enter the instructor's name and email address"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingInstructor ? "Update Instructor" : "Add Instructor"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats and Search */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-semibold">{instructors.length}</span>
              <span className="text-sm text-muted-foreground">Instructor{instructors.length !== 1 ? "s" : ""}</span>
            </div>
          </Card>
          {searchQuery && (
            <div className="text-sm text-muted-foreground">
              Showing {filteredInstructors.length} of {instructors.length} instructors
            </div>
          )}
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Instructors List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedInstructors.map((instructor) => (
          <Card key={instructor.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">{instructor.getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{instructor.name}</CardTitle>
                    <CardDescription className="truncate">{instructor.getEmailDomain()}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(instructor)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(instructor.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${instructor.email}`}
                    className="text-blue-600 hover:underline truncate flex-1"
                    title={instructor.email}
                  >
                    {instructor.email}
                  </a>
                </div>

                {!instructor.isValidEmail() && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">⚠️ Invalid email format</div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`mailto:${instructor.email}`, "_blank")}
                  className="flex-1"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(instructor)} className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedInstructors.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">{searchQuery ? "No instructors found" : "No instructors yet"}</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? `No instructors match "${searchQuery}". Try a different search term.`
              : "Get started by adding your first instructor."}
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2">
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
