"use client";

import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  FileCheck, 
  BookOpen, 
  Settings,
  LogOut,
  Building
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const dashboardItems = [
    {
      title: "Open Inspecties",
      description: "Bekijk en behandel lopende inspecties",
      icon: ClipboardList,
      href: "/openinspections",
      color: "bg-primary"
    },
    {
      title: "Afgeronde Inspecties", 
      description: "Bekijk voltooide inspecties en rapporten",
      icon: FileCheck,
      href: "/completedinspections",
      color: "bg-primary"
    },
    {
      title: "Kennisbank",
      description: "Raadpleeg inspectie richtlijnen en procedures",
      icon: BookOpen,
      href: "/knowledgebase",
      color: "bg-secondary"
    },
    {
      title: "Instellingen",
      description: "Beheer je account en voorkeuren",
      icon: Settings,
      href: "/settings",
      color: "bg-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Image
                  src="/real-estate-care-logo.svg"
                  alt="Logo"
                  width={220}
                  height={110}
                  className="mr-3 mt-1"
                />
              </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push("/settings")}
              className="cursor-pointer"
            >
              <Settings className="h-4 w-4 mr-2" />
              Instellingen
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welkom terug, {user?.name} 👋
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardItems.map((item) => (
            <Card 
              key={item.title} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300"
              onClick={() => router.push(item.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${item.color} text-white`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => logout()}
            className="cursor-pointer border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Uitloggen
          </Button>
        </div>
      </div>
    </div>
  );
}