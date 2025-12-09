"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Bell, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const settingsSections = [
    {
      title: "Account",
      description: "Beheer je accountgegevens",
      icon: User,
      items: [
        { label: "Naam", value: "Jan Inspecteur" },
        { label: "E-mail", value: "inspector@realestatecare.nl" },
        { label: "Rol", value: "Inspector" }
      ]
    },
    {
      title: "Notificaties",
      description: "Beheer je notificatievoorkeuren",
      icon: Bell,
      items: [
        { label: "E-mail notificaties", value: "Aan" },
        { label: "Push notificaties", value: "Uit" }
      ]
    },
    {
      title: "Weergave",
      description: "Pas de weergave aan",
      icon: Palette,
      items: [
        { label: "Thema", value: "Licht" },
        { label: "Taal", value: "Nederlands" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={() => router.push("/")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <h1 className="text-xl font-semibold">Instellingen</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="h-5 w-5 mr-2 text-primary" />
                  {section.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="font-medium text-gray-700">{item.label}</span>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}