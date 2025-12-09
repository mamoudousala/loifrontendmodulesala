"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKnowledgebaseStore } from "@/store/useKnowledgebaseStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, Search } from "lucide-react";

export default function KnowledgebasePage() {
  const router = useRouter();
  const { knowledgebases, loading, error, fetchKnowledgebases } = useKnowledgebaseStore();

  useEffect(() => {
    fetchKnowledgebases();
  }, [fetchKnowledgebases]);

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
            <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Fout</h3>
            <p className="text-gray-600 mt-2">{error}</p>
            <Button onClick={() => fetchKnowledgebases()} className="mt-4 cursor-pointer">
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
            <h1 className="text-xl font-semibold">Kennisbank ({knowledgebases.length})</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {knowledgebases.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Geen artikelen</h3>
              <p className="text-gray-600 mt-2">Er zijn nog geen kennisbank artikelen beschikbaar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {knowledgebases.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/knowledgebase/${article.id}`)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Bijgewerkt: {article.lastUpdated}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {article.content}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-4 cursor-pointer"
                    >
                      Lees meer
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