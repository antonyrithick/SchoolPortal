import { useState } from 'react';
import { getStudents, getAttendance, saveAttendance } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function AttendancePage() {
  const user = getCurrentUser();
  const [students] = useState(getStudents());
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late' | 'leave'>>({});

  const filteredStudents = students.filter(s => s.class === selectedClass);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'leave') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const records = Object.entries(attendance).map(([studentId, status]) => {
      const student = students.find(s => s.id === studentId)!;
      return {
        id: Date.now().toString() + studentId,
        studentId,
        studentName: student.name,
        class: student.class + student.section,
        date: selectedDate,
        status,
        markedBy: user?.name || 'Unknown'
      };
    });

    const existingAttendance = getAttendance();
    saveAttendance([...existingAttendance, ...records]);
    
    toast.success('Attendance marked successfully');
    setAttendance({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'late': return 'bg-yellow-500';
      case 'leave': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Mark daily attendance for students</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(c => (
                  <SelectItem key={c} value={c}>Class {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Date</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-input rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class {selectedClass} Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {(['present', 'absent', 'late', 'leave'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(student.id, status)}
                      className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-all ${
                        attendance[student.id] === status
                          ? `${getStatusColor(status)} text-white`
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length > 0 && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={Object.keys(attendance).length === 0}
              >
                Submit Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
