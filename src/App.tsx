import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import ParentDashboard from '@/pages/ParentDashboard';
import StudentsPage from '@/pages/StudentsPage';
import TeachersPage from '@/pages/TeachersPage';
import ParentsPage from '@/pages/ParentsPage';
import AttendancePage from '@/pages/AttendancePage';
import ExamsPage from '@/pages/ExamsPage';
import FeesPage from '@/pages/FeesPage';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="parents" element={<ParentsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']} />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']} />}>
          <Route index element={<ParentDashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
