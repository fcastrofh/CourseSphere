"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">CourseSphere</h1>
        <p className="text-xl text-muted-foreground">Complete Course Management System</p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your online courses, lessons, and instructors all in one place. Create engaging content, track
          progress, and deliver exceptional learning experiences.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Link href="/dashboard">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Dashboard
              </CardTitle>
              <CardDescription>Overview and analytics</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">View platform statistics and recent activity</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                Courses
              </CardTitle>
              <CardDescription>Manage course content</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Create and edit courses with detailed information</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/lessons">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Play className="h-5 w-5" />
                Lessons
              </CardTitle>
              <CardDescription>Organize lesson content</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Create video lessons and manage publishing</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/instructors">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Instructors
              </CardTitle>
              <CardDescription>Manage teaching staff</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Add and manage instructor profiles</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Platform Features</h2>
          <p className="text-muted-foreground mt-2">Everything you need to manage your online learning platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create and edit courses</li>
                <li>• Set course dates and instructors</li>
                <li>• Track course progress</li>
                <li>• Manage course status</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Video lesson management</li>
                <li>• Publishing workflow</li>
                <li>• Lesson status tracking</li>
                <li>• Content organization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructor Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Simple profile management</li>
                <li>• Contact information</li>
                <li>• Easy instructor search</li>
                <li>• Quick access to details</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
