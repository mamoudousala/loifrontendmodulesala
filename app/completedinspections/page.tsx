"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInspectionStore } from "@/store/useInspectionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, CheckCircle, FileText } from "lucide-react";

export default function CompletedInspectionsPage() {
  const router = useRouter();
  const { completed, loading, error, fetchCompleted } = useInspectionStore();

  useEffect(() => {
    fetchCompleted();
  }, [fetchCompleted]);

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
            <CheckCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error}</p>
            <Button onClick={() => fetchCompleted()} className="mt-4 cursor-pointer">
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
            <h1 className="text-xl font-semibold">Afgeronde Inspecties ({completed.length})</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {completed.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Geen afgeronde inspecties</h3>
              <p className="text-gray-600 mt-2">Er zijn nog geen inspecties afgerond.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {completed.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {inspection.address}
                        </h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Voltooid
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {inspection.dateCompleted}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {inspection.type}
                        </div>
                        {inspection.issuesFound && inspection.issuesFound.length > 0 && (
                          <Badge variant="outline">
                            {inspection.issuesFound.length} issue(s)
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {inspection.reportUrl && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Rapport
                        </Button>
                      )}
                      <Button 
                        onClick={() => router.push(`/completedinspections/${inspection.id}`)}
                        className="cursor-pointer"
                      >
                        Details
                      </Button>
                    </div>
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