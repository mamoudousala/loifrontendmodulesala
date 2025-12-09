"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useInspectionStore } from "@/store/useInspectionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, AlertTriangle, FileText } from "lucide-react";

export default function OpenInspectionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const { activeInspection, loading, error, fetchOpenById } = useInspectionStore();

  useEffect(() => {
    if (id) {
      fetchOpenById(id);
    }
  }, [id, fetchOpenById]);

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "hoog": return "destructive";
      case "medium": return "default";
      case "laag": return "secondary";
      default: return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (error || !activeInspection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error || "Inspectie niet gevonden"}</p>
            <Button onClick={() => router.push("/openinspections")} className="mt-4 cursor-pointer">
              Terug naar overzicht
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={() => router.push("/openinspections")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <h1 className="text-xl font-semibold">Inspectie Details</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{activeInspection.address}</span>
                {activeInspection.priority && (
                  <Badge variant={getPriorityVariant(activeInspection.priority)}>
                    {activeInspection.priority} prioriteit
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Gepland op</p>
                    <p className="font-medium">{activeInspection.datePlanned}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{activeInspection.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{activeInspection.status || "Open"}</p>
                  </div>
                </div>
              </div>

              {activeInspection.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Notities</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {activeInspection.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => router.push("/openinspections")}>
              Annuleren
            </Button>
            <Button className="bg-primary cursor-pointer">
              Start Inspectie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}