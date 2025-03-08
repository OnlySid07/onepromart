"use client"

import { useState } from "react"
import { FileSpreadsheet, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const initialTasks = [
  {
    id: 1,
    title: "Review project proposal",
    completed: true,
    priority: "high",
    assignee: "Alex Johnson",
  },
  {
    id: 2,
    title: "Prepare client presentation",
    completed: false,
    priority: "high",
    assignee: "Maria Garcia",
  },
  {
    id: 3,
    title: "Update documentation",
    completed: false,
    priority: "medium",
    assignee: "David Kim",
  },
  {
    id: 4,
    title: "Schedule team meeting",
    completed: true,
    priority: "low",
    assignee: "Sarah Chen",
  },
  {
    id: 5,
    title: "Send weekly report",
    completed: false,
    priority: "medium",
    assignee: "Alex Johnson",
  },
]

export default function DailyTasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [open, setOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
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

  const handleAssignTask = (taskId) => {
    setSelectedTask(tasks.find((task) => task.id === taskId))
    setAssignDialogOpen(true)
  }

  const exportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert("Exporting tasks to Excel...")
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Daily Tasks</CardTitle>
          <CardDescription>Manage your tasks for today</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new task and assign it to a team member.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input id="task-title" placeholder="Enter task title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Johnson</SelectItem>
                      <SelectItem value="maria">Maria Garcia</SelectItem>
                      <SelectItem value="david">David Kim</SelectItem>
                      <SelectItem value="sarah">Sarah Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Save Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between rounded-lg border p-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
                <div>
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {task.assignee}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleAssignTask(task.id)}>
                <User className="h-4 w-4" />
                <span className="sr-only">Assign</span>
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Task</DialogTitle>
              <DialogDescription>Reassign this task to another team member.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <p className="mb-2 font-medium">{selectedTask?.title}</p>
                <p className="text-sm text-muted-foreground">Currently assigned to: {selectedTask?.assignee}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-assignee">New Assignee</Label>
                <Select>
                  <SelectTrigger id="new-assignee">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="maria">Maria Garcia</SelectItem>
                    <SelectItem value="david">David Kim</SelectItem>
                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAssignDialogOpen(false)}>Assign Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

