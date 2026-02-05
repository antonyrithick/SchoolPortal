import { useState } from 'react';
import { getParents, getStudents } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, Mail, Phone, Briefcase } from 'lucide-react';

export default function ParentsPage() {
  const [parents] = useState(getParents());
  const [students] = useState(getStudents());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentNames = (studentIds: string[]) => {
    return students
      .filter(s => studentIds.includes(s.id))
      .map(s => s.name)
      .join(', ');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parents</h1>
        <p className="text-muted-foreground mt-1">Manage parent accounts</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParents.map((parent) => (
              <Card key={parent.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{parent.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Children: {getStudentNames(parent.studentIds)}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{parent.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{parent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{parent.occupation}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">{parent.address}</p>
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
