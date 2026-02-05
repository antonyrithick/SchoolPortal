import { useState } from 'react';
import { getExams } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Clock, BookOpen } from 'lucide-react';

export default function ExamsPage() {
  const [exams] = useState(getExams());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Examinations</h1>
          <p className="text-muted-foreground mt-1">Manage exams and results</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Exam
        </Button>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Exams Scheduled</h3>
            <p className="text-muted-foreground mb-4">Start by scheduling your first exam</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Exam
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{exam.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{exam.subject}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Marks</span>
                      <span className="font-medium">{exam.totalMarks}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Passing Marks</span>
                      <span className="font-medium">{exam.passingMarks}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
