"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Generate dates for the current week
const generateWeekDates = () => {
  const today = new Date()
  const day = today.getDay() // 0 is Sunday, 6 is Saturday
  const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust to get Monday

  const monday = new Date(today.setDate(diff))
  const weekDates = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    weekDates.push(date)
  }

  return weekDates
}

const weeklyTasks = [
  {
    id: 1,
    title: "Team meeting",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "medium",
  },
  {
    id: 2,
    title: "Client presentation",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "high",
  },
  {
    id: 3,
    title: "Project deadline",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    priority: "high",
  },
  {
    id: 4,
    title: "Weekly report",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
    priority: "medium",
  },
  {
    id: 5,
    title: "Code review",
    date: new Date(new Date().setDate(new Date().getDate())),
    priority: "low",
  },
  {
    id: 6,
    title: "Documentation update",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "low",
  },
]

export default function WeeklyView() {
  const [weekDates, setWeekDates] = useState(generateWeekDates())

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const getTasksForDate = (date) => {
    return weeklyTasks.filter(
      (task) =>
        task.date.getDate() === date.getDate() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getFullYear() === date.getFullYear(),
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const previousWeek = () => {
    const newDates = weekDates.map((date) => {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() - 7)
      return newDate
    })
    setWeekDates(newDates)
  }

  const nextWeek = () => {
    const newDates = weekDates.map((date) => {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() + 7)
      return newDate
    })
    setWeekDates(newDates)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Weekly View</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous week</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next week</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDates.map((date, index) => (
            <div key={index} className={`border rounded-lg p-3 ${isToday(date) ? "bg-muted" : ""}`}>
              <div className="text-sm font-medium mb-2">
                {formatDate(date)}
                {isToday(date) && <Badge className="ml-2 bg-primary">Today</Badge>}
              </div>
              <div className="space-y-2">
                {getTasksForDate(date).map((task) => (
                  <div key={task.id} className="text-xs p-2 border rounded bg-background">
                    <div className="font-medium">{task.title}</div>
                    <Badge className={`mt-1 text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                  </div>
                ))}
                {getTasksForDate(date).length === 0 && (
                  <div className="text-xs text-muted-foreground p-2">No tasks scheduled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

