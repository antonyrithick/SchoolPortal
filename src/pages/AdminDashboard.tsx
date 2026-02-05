import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudents, getTeachers, getParents, getAnnouncements } from '@/lib/mockData';
import { GraduationCap, Users, UserCheck, Bell } from 'lucide-react';

export default function AdminDashboard() {
  const students = getStudents();
  const teachers = getTeachers();
  const parents = getParents();
  const announcements = getAnnouncements();

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Parents',
      value: parents.length,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Announcements',
      value: announcements.length,
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentStudents = students.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of school management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Class {student.class}{student.section} • Roll: {student.rollNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.attendancePercentage}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.slice(0, 5).map((announcement) => (
                <div key={announcement.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      announcement.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : announcement.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
