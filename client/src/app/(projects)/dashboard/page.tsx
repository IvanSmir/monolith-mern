"use client"
import DefaultCard from "@/components/admin/DefaultCard";
import TaskTable from "@/components/tasks/TaskTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

const AdminHomePage = () => {

    const [pendingTasks, setPendingTasks] = useState<any>([])

    useEffect(() => {
        setPendingTasks([
            {
                id: 1,
                description: "Design new homepage",
                dateFrom: "24 May 2024, 10:00",
                dateTo: "27 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 2,
                description: "Design services page",
                dateFrom: "28 May 2024, 10:00",
                dateTo: "30 May 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 3,
                description: "Design about us page",
                dateFrom: "31 May 2024, 10:00",
                dateTo: "4 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
            {
                id: 4,
                description: "Design contact us page",
                dateFrom: "5 June 2024, 10:00",
                dateTo: "7 June 2024, 09:30",
                project: "Web Design",
                status: "Not started"
            },
        ])
    }, []);
  return (
    <div className="este-es-div flex flex-col gap-8">
      <div className="grid grid-cols-6 gap-4">
        <DefaultCard title="Clients" counter={2} link="/dashboard/clients" />
        <DefaultCard title="Projects" counter={7} link="/dashboard/projects" />
      </div>

      <hr />

      <Card>
        <CardHeader>
        <h1 className="text-2xl font-bold">Upcoming tasks</h1>
        </CardHeader>
        <CardContent>
            <TaskTable tasks={pendingTasks} ></TaskTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomePage;
