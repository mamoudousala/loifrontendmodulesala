"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useInspectionStore } from "@/store/useInspectionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, CheckCircle, FileText, AlertCircle } from "lucide-react";

export default function CompletedInspectionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const { done, loading, error, fetchCompletedById } = useInspectionStore();

  useEffect(() => {
    if (id) {
      fetchCompletedById(id);
    }
  }, [id, fetchCompletedById]);

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

  if (error || !done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error || "Inspectie niet gevonden"}</p>
            <Button onClick={() => router.push("/completedinspections")} className="mt-4 cursor-pointer">
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
            <Button variant="ghost" onClick={() => router.push("/completedinspections")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <h1 className="text-xl font-semibold">Inspectie Rapport</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{done.address}</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Afgerond
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Afgerond op</p>
                    <p className="font-medium">{done.dateCompleted}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{done.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">Voltooid</p>
                  </div>
                </div>
              </div>

              {done.issuesFound && done.issuesFound.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Gevonden Issues</h4>
                  <div className="space-y-2">
                    {done.issuesFound.map((issue) => (
                      <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{issue.title}</p>
                          <Badge variant={issue.severity === "low" ? "secondary" : "destructive"}>
                            {issue.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {done.reportUrl && (
                <div className="flex justify-center">
                  <Button className="bg-primary cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Rapport
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}