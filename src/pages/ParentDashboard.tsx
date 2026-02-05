import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudents, getAnnouncements, getFees, getAttendance } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { GraduationCap, DollarSign, UserCheck, Bell } from 'lucide-react';

export default function ParentDashboard() {
  const user = getCurrentUser();
  const allStudents = getStudents();
  const announcements = getAnnouncements();
  const allFees = getFees();
  
  // Get children of current parent (mocked - using first student for demo)
  const myChildren = allStudents.filter(s => s.parentId === user?.id || s.id === '1');
  const child = myChildren[0];

  if (!child) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No student records found.</p>
      </div>
    );
  }

  const childFees = allFees.filter(f => f.studentId === child.id);
  const pendingFees = childFees.filter(f => f.status === 'pending' || f.status === 'overdue');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
        <p className="text-muted-foreground mt-2">View your child's academic information</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={child.photo}
              alt={child.name}
              className="w-20 h-20 rounded-full border-4 border-background"
            />
            <div>
              <h2 className="text-2xl font-bold">{child.name}</h2>
              <p className="text-muted-foreground">
                Class {child.class}{child.section} • Roll Number: {child.rollNumber}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{child.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                <p className="text-3xl font-bold mt-2">{child.attendancePercentage}%</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                <p className="text-3xl font-bold mt-2">${pendingFees.reduce((sum, f) => sum + f.amount, 0)}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
                <p className="text-3xl font-bold mt-2">{child.bloodGroup || 'N/A'}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-medium">{new Date(child.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium capitalize">{child.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Admission Date</span>
                <span className="font-medium">{new Date(child.admissionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Contact</span>
                <span className="font-medium">{child.contactNumber}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium text-right">{child.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>School Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements
                .filter(a => a.targetAudience === 'all' || a.targetAudience === 'parents')
                .slice(0, 3)
                .map((announcement) => (
                  <div key={announcement.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <Bell className="w-4 h-4 text-muted-foreground" />
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
