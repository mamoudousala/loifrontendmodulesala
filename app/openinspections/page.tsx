"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInspectionStore } from "@/store/useInspectionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, AlertTriangle, Building } from "lucide-react";

export default function OpenInspectionsPage() {
  const router = useRouter();
  const { open, loading, error, fetchOpen } = useInspectionStore();

  useEffect(() => {
    fetchOpen();
  }, [fetchOpen]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error}</p>
            <Button onClick={() => fetchOpen()} className="mt-4 cursor-pointer">
              Probeer opnieuw
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
            <Button variant="ghost" onClick={() => router.push("/")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <h1 className="text-xl font-semibold">Open Inspecties ({open.length})</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {open.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Geen open inspecties</h3>
              <p className="text-gray-600 mt-2">Alle inspecties zijn afgerond.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {open.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {inspection.address}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {inspection.datePlanned}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {inspection.type}
                        </div>
                        {inspection.priority && (
                          <Badge variant={getPriorityVariant(inspection.priority)}>
                            {inspection.priority}
                          </Badge>
                        )}
                      </div>
                      {inspection.notes && (
                        <p className="text-sm text-gray-600 mt-2">{inspection.notes}</p>
                      )}
                    </div>
                    <Button 
                      onClick={() => router.push(`/openinspections/${inspection.id}`)}
                      className="ml-4 cursor-pointer"
                    >
                      Bekijk
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}