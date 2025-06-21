"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  { label: "Course Completion", value: 78 },
  { label: "Student Satisfaction", value: 92 },
  { label: "Active Subscriptions", value: 64 },
]

export function Overview() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <Progress value={metric.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
