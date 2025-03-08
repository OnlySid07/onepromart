"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    totalTasks: 24,
    completedTasks: 18,
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MG",
    totalTasks: 32,
    completedTasks: 20,
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    totalTasks: 18,
    completedTasks: 15,
  },
  {
    id: 4,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
    totalTasks: 28,
    completedTasks: 12,
  },
]

export default function EmployeeStats() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Employee Task Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {employee.completedTasks} of {employee.totalTasks} tasks
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium">
                {Math.round((employee.completedTasks / employee.totalTasks) * 100)}%
              </p>
            </div>
            <Progress value={(employee.completedTasks / employee.totalTasks) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

