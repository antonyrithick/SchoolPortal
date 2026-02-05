import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '@/lib/auth';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserCheck, 
  ClipboardList, 
  FileText, 
  DollarSign, 
  Bell 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const location = useLocation();
  const user = getCurrentUser();

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/students', icon: GraduationCap, label: 'Students' },
    { to: '/admin/teachers', icon: Users, label: 'Teachers' },
    { to: '/admin/parents', icon: Users, label: 'Parents' },
    { to: '/admin/attendance', icon: UserCheck, label: 'Attendance' },
    { to: '/admin/exams', icon: ClipboardList, label: 'Exams' },
    { to: '/admin/fees', icon: DollarSign, label: 'Fees' },
    { to: '/admin/announcements', icon: Bell, label: 'Announcements' },
  ];

  const teacherLinks = [
    { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/teacher/attendance', icon: UserCheck, label: 'Attendance' },
    { to: '/teacher/exams', icon: ClipboardList, label: 'Exams' },
    { to: '/teacher/announcements', icon: Bell, label: 'Announcements' },
  ];

  const parentLinks = [
    { to: '/parent', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'teacher' 
    ? teacherLinks 
    : parentLinks;

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:block">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">School Portal</h1>
        <p className="text-sm text-muted-foreground capitalize mt-1">{user?.role} Panel</p>
      </div>
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
