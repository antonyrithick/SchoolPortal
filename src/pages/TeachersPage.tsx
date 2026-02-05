import { useState } from 'react';
import { getTeachers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';

export default function TeachersPage() {
  const [teachers] = useState(getTeachers());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground mt-1">Manage teaching staff</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, subject, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg">{teacher.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{teacher.subject}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Qualification</span>
                      <span className="font-medium">{teacher.qualification.split(',')[0]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
