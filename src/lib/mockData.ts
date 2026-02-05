import { Student, Teacher, Parent, AttendanceRecord, Exam, ExamResult, FeePayment, Announcement } from '@/types';

const STUDENTS_KEY = 'school_students';
const TEACHERS_KEY = 'school_teachers';
const PARENTS_KEY = 'school_parents';
const ATTENDANCE_KEY = 'school_attendance';
const EXAMS_KEY = 'school_exams';
const RESULTS_KEY = 'school_results';
const FEES_KEY = 'school_fees';
const ANNOUNCEMENTS_KEY = 'school_announcements';

// Initial mock data
const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    rollNumber: 'S001',
    class: '10',
    section: 'A',
    dateOfBirth: '2010-05-15',
    gender: 'female',
    parentId: '3',
    parentName: 'Sarah Parent',
    contactNumber: '+1234567890',
    email: 'emma.j@student.school.com',
    address: '123 Main St, City',
    admissionDate: '2020-04-01',
    bloodGroup: 'O+',
    attendancePercentage: 92
  },
  {
    id: '2',
    name: 'Michael Brown',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    rollNumber: 'S002',
    class: '10',
    section: 'A',
    dateOfBirth: '2010-08-22',
    gender: 'male',
    parentId: '4',
    parentName: 'Robert Brown',
    contactNumber: '+1234567891',
    email: 'michael.b@student.school.com',
    address: '456 Oak Ave, City',
    admissionDate: '2020-04-01',
    bloodGroup: 'A+',
    attendancePercentage: 88
  },
  {
    id: '3',
    name: 'Sophia Davis',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    rollNumber: 'S003',
    class: '9',
    section: 'B',
    dateOfBirth: '2011-03-10',
    gender: 'female',
    parentId: '5',
    parentName: 'Jennifer Davis',
    contactNumber: '+1234567892',
    email: 'sophia.d@student.school.com',
    address: '789 Pine Rd, City',
    admissionDate: '2021-04-01',
    bloodGroup: 'B+',
    attendancePercentage: 95
  }
];

const INITIAL_TEACHERS: Teacher[] = [
  {
    id: '2',
    name: 'John Teacher',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher',
    email: 'teacher@school.com',
    phone: '+1234567800',
    subject: 'Mathematics',
    qualification: 'M.Sc Mathematics, B.Ed',
    dateOfJoining: '2018-07-01',
    address: '100 School St, City',
    salary: 50000
  },
  {
    id: '6',
    name: 'Emily Wilson',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.w@school.com',
    phone: '+1234567801',
    subject: 'English',
    qualification: 'M.A English, B.Ed',
    dateOfJoining: '2019-08-01',
    address: '200 Teacher Ave, City',
    salary: 48000
  }
];

const INITIAL_PARENTS: Parent[] = [
  {
    id: '3',
    name: 'Sarah Parent',
    email: 'parent@school.com',
    phone: '+1234567890',
    address: '123 Main St, City',
    occupation: 'Software Engineer',
    studentIds: ['1']
  },
  {
    id: '4',
    name: 'Robert Brown',
    email: 'robert.b@parent.com',
    phone: '+1234567891',
    address: '456 Oak Ave, City',
    occupation: 'Business Owner',
    studentIds: ['2']
  },
  {
    id: '5',
    name: 'Jennifer Davis',
    email: 'jennifer.d@parent.com',
    phone: '+1234567892',
    address: '789 Pine Rd, City',
    occupation: 'Doctor',
    studentIds: ['3']
  }
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Annual Day Celebration',
    message: 'Annual Day will be celebrated on March 15, 2026. Parents are cordially invited to attend.',
    targetAudience: 'all',
    createdBy: 'Admin User',
    createdAt: '2026-02-01T10:00:00Z',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Mid-Term Exam Schedule',
    message: 'Mid-term examinations will commence from February 20, 2026. Please ensure students are well prepared.',
    targetAudience: 'parents',
    createdBy: 'Admin User',
    createdAt: '2026-02-03T09:00:00Z',
    priority: 'high'
  }
];

// Helper functions
const getFromStorage = <T>(key: string, initial: T[]): T[] => {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
};

const saveToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Students
export const getStudents = (): Student[] => getFromStorage(STUDENTS_KEY, INITIAL_STUDENTS);
export const saveStudents = (students: Student[]) => saveToStorage(STUDENTS_KEY, students);

// Teachers
export const getTeachers = (): Teacher[] => getFromStorage(TEACHERS_KEY, INITIAL_TEACHERS);
export const saveTeachers = (teachers: Teacher[]) => saveToStorage(TEACHERS_KEY, teachers);

// Parents
export const getParents = (): Parent[] => getFromStorage(PARENTS_KEY, INITIAL_PARENTS);
export const saveParents = (parents: Parent[]) => saveToStorage(PARENTS_KEY, parents);

// Attendance
export const getAttendance = (): AttendanceRecord[] => getFromStorage(ATTENDANCE_KEY, []);
export const saveAttendance = (attendance: AttendanceRecord[]) => saveToStorage(ATTENDANCE_KEY, attendance);

// Exams
export const getExams = (): Exam[] => getFromStorage(EXAMS_KEY, []);
export const saveExams = (exams: Exam[]) => saveToStorage(EXAMS_KEY, exams);

// Results
export const getResults = (): ExamResult[] => getFromStorage(RESULTS_KEY, []);
export const saveResults = (results: ExamResult[]) => saveToStorage(RESULTS_KEY, results);

// Fees
export const getFees = (): FeePayment[] => getFromStorage(FEES_KEY, []);
export const saveFees = (fees: FeePayment[]) => saveToStorage(FEES_KEY, fees);

// Announcements
export const getAnnouncements = (): Announcement[] => getFromStorage(ANNOUNCEMENTS_KEY, INITIAL_ANNOUNCEMENTS);
export const saveAnnouncements = (announcements: Announcement[]) => saveToStorage(ANNOUNCEMENTS_KEY, announcements);
