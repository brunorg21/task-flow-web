import { CompletedTasksOnMothChart } from "@/components/completed-tasks-on-month-chart";
import { TaskByStatusChart } from "@/components/task-by-status-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, CircleX, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-sm">
              Tarefas em aberto <Clock size={40} className="text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center mt-5">
            <div className="text-[90px] font-bold">40</div>
            <p>40 tarefas em andamento</p>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-sm">
              Tarefas canceladas
              <CircleX size={40} className="text-red-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center mt-5">
            <div className="text-[90px] font-bold">40</div>
            <p>40 tarefas canceladas</p>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-sm">
              Tarefas concluídas{" "}
              <BadgeCheck size={40} className="text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center mt-5">
            <div className="text-[90px] font-bold">40</div>
            <p>40 tarefas concluídas</p>
          </CardContent>
        </Card>

        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Tarefas completadas no mês</CardTitle>
          </CardHeader>
          <CardContent>
            <CompletedTasksOnMothChart />
          </CardContent>
        </Card>

        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Tarefas por status</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskByStatusChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
