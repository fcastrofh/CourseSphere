"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Sale = {
  id: string
  customer: string
  course: string
  amount: string
}

const recentSales: Sale[] = [
  { id: "1", customer: "Alice Johnson", course: "React Basics", amount: "$49" },
  { id: "2", customer: "Bob Smith", course: "Advanced TypeScript", amount: "$79" },
  { id: "3", customer: "Charlie Brown", course: "Node.js Mastery", amount: "$59" },
  { id: "4", customer: "Dana White", course: "Next.js in Depth", amount: "$99" },
]

export function RecentSales() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[260px]">
          <ul className="divide-y">
            {recentSales.map((sale) => (
              <li key={sale.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {sale.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.course}</p>
                </div>
                <p className="text-sm font-medium">{sale.amount}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
