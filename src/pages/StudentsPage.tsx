import { useState } from 'react';
import { getStudents, saveStudents, getParents, saveParents } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import AddStudentDialog from '@/components/features/AddStudentDialog';
import { Student } from '@/types';
import { toast } from 'sonner';

export default function StudentsPage() {
  const [students, setStudents] = useState(getStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.includes(searchTerm)
  );

  const handleAddStudent = (newStudent: Omit<Student, 'id' | 'parentId'>) => {
    const studentId = Date.now().toString();
    const parentId = (Date.now() + 1).toString();
    
    // Create parent account
    const newParent = {
      id: parentId,
      name: newStudent.parentName,
      email: newStudent.email.replace('@student', '@parent'),
      phone: newStudent.contactNumber,
      address: newStudent.address,
      occupation: 'Parent',
      studentIds: [studentId]
    };
    
    const student: Student = {
      ...newStudent,
      id: studentId,
      parentId: parentId,
      attendancePercentage: 0
    };

    const updatedStudents = [...students, student];
    const updatedParents = [...getParents(), newParent];
    
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    saveParents(updatedParents);
    
    toast.success(`Student added successfully! Parent account created.`);
  };

  const handleDelete = (id: string) => {
    const updatedStudents = students.filter(s => s.id !== id);
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    toast.success('Student deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">Manage student records and information</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, roll number, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Student</th>
                  <th className="text-left p-4 font-semibold">Roll No.</th>
                  <th className="text-left p-4 font-semibold">Class</th>
                  <th className="text-left p-4 font-semibold">Parent</th>
                  <th className="text-left p-4 font-semibold">Contact</th>
                  <th className="text-left p-4 font-semibold">Attendance</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono">{student.rollNumber}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                        {student.class}{student.section}
                      </span>
                    </td>
                    <td className="p-4">{student.parentName}</td>
                    <td className="p-4">{student.contactNumber}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${student.attendancePercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{student.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddStudentDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddStudent}
      />
    </div>
  );
}
