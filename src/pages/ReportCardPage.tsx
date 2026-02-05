import { useState, useRef } from 'react';
import { getStudents, getExams, getResults, getAttendance } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, GraduationCap, Award, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportCardPage() {
  const user = getCurrentUser();
  const [students] = useState(getStudents());
  const [exams] = useState(getExams());
  const [results] = useState(getResults());
  const [attendance] = useState(getAttendance());
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [teacherRemarks, setTeacherRemarks] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  // Filter students based on user role
  const availableStudents = user?.role === 'parent' 
    ? students.filter(s => s.parentId === user.id)
    : students;

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Calculate student metrics
  const studentResults = results.filter(r => r.studentId === selectedStudentId);
  const studentAttendance = attendance.filter(a => a.studentId === selectedStudentId);
  
  const totalPresent = studentAttendance.filter(a => a.status === 'present').length;
  const totalDays = studentAttendance.length;
  const attendancePercentage = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(1) : selectedStudent?.attendancePercentage || 0;

  const averagePercentage = studentResults.length > 0 
    ? (studentResults.reduce((sum, r) => sum + r.percentage, 0) / studentResults.length).toFixed(2)
    : 0;

  const getOverallGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-500' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600' };
    if (percentage >= 40) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const overallGrade = getOverallGrade(Number(averagePercentage));

  const handleExportPDF = () => {
    if (!selectedStudent) {
      toast.error('Please select a student first');
      return;
    }

    const printContent = reportRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow pop-ups to export PDF');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Report Card - ${selectedStudent.name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              padding: 40px;
              background: white;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 { 
              font-size: 28px; 
              color: #1e40af;
              margin-bottom: 5px;
            }
            .header p { 
              color: #64748b;
              font-size: 14px;
            }
            .student-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 30px;
              padding: 20px;
              background: #f8fafc;
              border-radius: 8px;
            }
            .info-item {
              display: flex;
              gap: 10px;
            }
            .info-label {
              font-weight: 600;
              color: #334155;
              min-width: 120px;
            }
            .info-value {
              color: #475569;
            }
            .section-title {
              font-size: 18px;
              font-weight: 700;
              color: #1e293b;
              margin: 25px 0 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #e2e8f0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th {
              background: #2563eb;
              color: white;
              padding: 12px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            tr:hover {
              background: #f8fafc;
            }
            .metrics {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 30px 0;
            }
            .metric-card {
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              border: 2px solid #e2e8f0;
            }
            .metric-label {
              font-size: 13px;
              color: #64748b;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .metric-value {
              font-size: 32px;
              font-weight: 700;
              color: #1e40af;
            }
            .grade-A\\+, .grade-A { color: #16a34a; }
            .grade-B\\+, .grade-B { color: #2563eb; }
            .grade-C { color: #ca8a04; }
            .grade-D { color: #ea580c; }
            .grade-F { color: #dc2626; }
            .remarks {
              margin-top: 30px;
              padding: 20px;
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              border-radius: 4px;
            }
            .remarks-title {
              font-weight: 700;
              color: #92400e;
              margin-bottom: 10px;
            }
            .remarks-text {
              color: #78350f;
              line-height: 1.6;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .signature {
              text-align: center;
            }
            .signature-line {
              border-top: 2px solid #1e293b;
              width: 200px;
              margin-bottom: 5px;
            }
            .signature-label {
              font-size: 12px;
              color: #64748b;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      toast.success('Report card ready for printing/PDF export');
    }, 250);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Report Cards</h1>
        <p className="text-muted-foreground mt-1">Generate comprehensive student report cards</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Student</label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {availableStudents.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - Class {student.class}{student.section} (Roll: {student.rollNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStudent && (
              <Button onClick={handleExportPDF} className="gap-2">
                <Download className="w-4 h-4" />
                Export as PDF
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <>
          <Card>
            <CardContent className="p-6">
              <label className="text-sm font-medium mb-2 block">Teacher's Remarks</label>
              <Textarea
                placeholder="Enter overall remarks about student's performance, behavior, and areas of improvement..."
                value={teacherRemarks}
                onChange={(e) => setTeacherRemarks(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Report Card Preview */}
          <div ref={reportRef}>
            <Card className="print:shadow-none">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center border-b-4 border-primary pb-6 mb-8">
                  <div className="flex items-center justify-center mb-3">
                    <GraduationCap className="w-12 h-12 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-primary mb-2">School Management System</h1>
                  <p className="text-muted-foreground">Academic Report Card</p>
                  <p className="text-sm text-muted-foreground mt-1">Academic Year 2025-2026</p>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-semibold">{selectedStudent.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Roll Number</p>
                      <p className="font-semibold">{selectedStudent.rollNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Class & Section</p>
                      <p className="font-semibold">Class {selectedStudent.class}{selectedStudent.section}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-semibold">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Parent Name</p>
                      <p className="font-semibold">{selectedStudent.parentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold">{selectedStudent.contactNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Attendance</p>
                      <p className="text-4xl font-bold text-blue-600">{attendancePercentage}%</p>
                      <p className="text-xs text-muted-foreground mt-2">{totalPresent}/{totalDays} days</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Average Score</p>
                      <p className="text-4xl font-bold text-primary">{averagePercentage}%</p>
                      <p className="text-xs text-muted-foreground mt-2">{studentResults.length} exams</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Overall Grade</p>
                      <p className={`text-4xl font-bold ${overallGrade.color}`}>{overallGrade.grade}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Performance</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Exam Results */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b">Examination Results</h2>
                  
                  {studentResults.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-primary">
                            <th className="text-left p-3 font-semibold">Exam</th>
                            <th className="text-left p-3 font-semibold">Subject</th>
                            <th className="text-center p-3 font-semibold">Marks Obtained</th>
                            <th className="text-center p-3 font-semibold">Total Marks</th>
                            <th className="text-center p-3 font-semibold">Percentage</th>
                            <th className="text-center p-3 font-semibold">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentResults.map((result) => {
                            const exam = exams.find(e => e.id === result.examId);
                            return (
                              <tr key={result.id} className="border-b hover:bg-accent/50">
                                <td className="p-3">{exam?.name || 'N/A'}</td>
                                <td className="p-3">{exam?.subject || 'N/A'}</td>
                                <td className="p-3 text-center font-semibold">{result.marksObtained}</td>
                                <td className="p-3 text-center">{result.totalMarks}</td>
                                <td className="p-3 text-center font-semibold text-primary">{result.percentage}%</td>
                                <td className="p-3 text-center">
                                  <span className={`font-bold ${getOverallGrade(result.percentage).color}`}>
                                    {result.grade}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-accent/30 rounded-lg">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">No exam results available yet</p>
                    </div>
                  )}
                </div>

                {/* Teacher's Remarks */}
                {teacherRemarks && (
                  <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <h3 className="font-bold text-yellow-900 mb-3">Teacher's Remarks</h3>
                    <p className="text-yellow-800 leading-relaxed">{teacherRemarks}</p>
                  </div>
                )}

                {/* Footer with Signatures */}
                <div className="mt-12 pt-6 border-t-2 flex justify-between items-end">
                  <div className="text-center">
                    <div className="w-48 border-t-2 border-foreground mb-2"></div>
                    <p className="text-sm text-muted-foreground">Class Teacher</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-48 border-t-2 border-foreground mb-2"></div>
                    <p className="text-sm text-muted-foreground">Principal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!selectedStudent && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Student Selected</h3>
            <p className="text-muted-foreground">Please select a student to view their report card</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
