"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useKnowledgebaseStore } from "@/store/useKnowledgebaseStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, AlertCircle } from "lucide-react";

export default function KnowledgebaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const { knowledgebase, loading, error, fetchKnowledgebasesById } = useKnowledgebaseStore();

  useEffect(() => {
    if (id) {
      fetchKnowledgebasesById(id);
    }
  }, [id, fetchKnowledgebasesById]);

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

  if (error || !knowledgebase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error || "Artikel niet gevonden"}</p>
            <Button onClick={() => router.push("/knowledgebase")} className="mt-4 cursor-pointer">
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
            <Button variant="ghost" onClick={() => router.push("/knowledgebase")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <h1 className="text-xl font-semibold">Kennisbank Artikel</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {knowledgebase.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Bijgewerkt: {knowledgebase.lastUpdated}
              </div>
            </div>
            <CardTitle className="text-2xl">{knowledgebase.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {knowledgebase.content}
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => router.push("/knowledgebase")}
                className="cursor-pointer"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}