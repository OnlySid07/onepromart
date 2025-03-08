import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import TaskStats from "@/components/task-stats"
import EmployeeStats from "@/components/employee-stats"
import DailyTasks from "@/components/daily-tasks"
import WeeklyView from "@/components/weekly-view"

export const metadata: Metadata = {
  title: "Todo Dashboard",
  description: "A comprehensive todo management dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TaskStats />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="col-span-2">
            <DailyTasks />
          </div>
          <div>
            <EmployeeStats />
          </div>
        </div>
        <div>
          <WeeklyView />
        </div>
      </main>
    </div>
  )
}

