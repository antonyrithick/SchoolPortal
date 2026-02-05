export type UserRole = 'admin' | 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
}

export interface Student {
  id: string;
  name: string;
  photo?: string;
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  parentId: string;
  parentName: string;
  contactNumber: string;
  email: string;
  address: string;
  admissionDate: string;
  bloodGroup?: string;
  attendancePercentage: number;
}

export interface Teacher {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  dateOfJoining: string;
  address: string;
  salary: number;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  studentIds: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  markedBy: string;
}

export interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
  duration: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  class: string;
  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  total: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'cash' | 'online' | 'cheque';
  receiptNumber: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'parents' | 'teachers' | 'specific';
  createdBy: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}
