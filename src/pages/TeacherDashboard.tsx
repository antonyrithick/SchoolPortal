import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudents, getAnnouncements } from '@/lib/mockData';
import { GraduationCap, Bell, ClipboardList } from 'lucide-react';

export default function TeacherDashboard() {
  const students = getStudents();
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
      title: 'Pending Tasks',
      value: 5,
      icon: ClipboardList,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Announcements',
      value: announcements.length,
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your classes and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    announcement.priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{announcement.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
