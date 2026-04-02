import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    branchId?: string;
    branch?: any;
    phoneNumber?: string;
    isActive: boolean;
    lastLogin?: string;
  };
  token: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  totalStaff: number;
  feesCollectedToday: number;
  monthlyRevenue: number;
  attendancePercentage: number;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  branchId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  photo?: string;
  branch?: any;
  course?: any;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  branchId: string;
  lecturerId?: string;
  fees: number;
  isActive: boolean;
  branch?: any;
  lecturer?: any;
}

export interface Staff {
  id: string;
  staffId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: 'lecturer' | 'admin' | 'accountant' | 'support' | 'manager';
  department: string;
  branchId: string;
  isActive: boolean;
  hireDate: string;
  salary?: number;
  address?: string;
  branch?: any;
}

export interface Payment {
  id: string;
  receiptNumber: string;
  studentId: string;
  branchId: string;
  amount: number;
  paymentMethod: 'cash' | 'mpesa' | 'bank' | 'cheque';
  paymentDate: string;
  description: string;
  semester?: string;
  academicYear?: string;
  status: 'pending' | 'completed' | 'failed';
  createdBy: string;
  student?: any;
  branch?: any;
}

export interface Application {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  preferredBranchId: string;
  preferredCourseId: string;
  educationBackground: string;
  status: 'pending' | 'approved' | 'rejected' | 'converted';
  notes?: string;
  applicationDate: string;
  reviewedBy?: string;
  reviewDate?: string;
  preferredBranch?: any;
  preferredCourse?: any;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  location: string;
  phoneNumber: string;
  branchManager: string;
  isActive: boolean;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse> {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    const response = await this.client.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await this.client.post('/auth/forgot-password', { email });
    return response.data;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.client.post('/auth/logout');
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.client.get('/dashboard/stats');
    return response.data;
  }

  async getEnrollmentTrends(): Promise<ApiResponse> {
    const response = await this.client.get('/dashboard/enrollment-trends');
    return response.data;
  }

  async getRevenueTrends(): Promise<ApiResponse> {
    const response = await this.client.get('/dashboard/revenue-trends');
    return response.data;
  }

  async getBranchComparison(): Promise<ApiResponse> {
    const response = await this.client.get('/dashboard/branch-comparison');
    return response.data;
  }

  async getRecentActivities(): Promise<ApiResponse> {
    const response = await this.client.get('/dashboard/recent-activities');
    return response.data;
  }

  // Branch endpoints
  async getBranches(): Promise<ApiResponse<Branch[]>> {
    const response = await this.client.get('/branches');
    return response.data;
  }

  async getBranch(id: string): Promise<ApiResponse<Branch>> {
    const response = await this.client.get(`/branches/${id}`);
    return response.data;
  }

  async createBranch(data: Partial<Branch>): Promise<ApiResponse<Branch>> {
    const response = await this.client.post('/branches', data);
    return response.data;
  }

  async updateBranch(id: string, data: Partial<Branch>): Promise<ApiResponse<Branch>> {
    const response = await this.client.put(`/branches/${id}`, data);
    return response.data;
  }

  async deleteBranch(id: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/branches/${id}`);
    return response.data;
  }

  // Student endpoints
  async getStudents(params?: {
    branchId?: string;
    courseId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ students: Student[]; total: number; page: number; totalPages: number }>> {
    const response = await this.client.get('/students', { params });
    return response.data;
  }

  async getStudent(id: string): Promise<ApiResponse<Student>> {
    const response = await this.client.get(`/students/${id}`);
    return response.data;
  }

  async createStudent(data: Partial<Student>): Promise<ApiResponse<Student>> {
    const response = await this.client.post('/students', data);
    return response.data;
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<ApiResponse<Student>> {
    const response = await this.client.put(`/students/${id}`, data);
    return response.data;
  }

  async deleteStudent(id: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/students/${id}`);
    return response.data;
  }

  // Course endpoints
  async getCourses(params?: {
    branchId?: string;
    lecturerId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ courses: Course[]; total: number; page: number; totalPages: number }>> {
    const response = await this.client.get('/courses', { params });
    return response.data;
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    const response = await this.client.get(`/courses/${id}`);
    return response.data;
  }

  async createCourse(data: Partial<Course>): Promise<ApiResponse<Course>> {
    const response = await this.client.post('/courses', data);
    return response.data;
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<ApiResponse<Course>> {
    const response = await this.client.put(`/courses/${id}`, data);
    return response.data;
  }

  async deleteCourse(id: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/courses/${id}`);
    return response.data;
  }

  // Staff endpoints
  async getStaff(params?: {
    branchId?: string;
    role?: string;
    department?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ staff: Staff[]; total: number; page: number; totalPages: number }>> {
    const response = await this.client.get('/staff', { params });
    return response.data;
  }

  async getStaffMember(id: string): Promise<ApiResponse<Staff>> {
    const response = await this.client.get(`/staff/${id}`);
    return response.data;
  }

  async createStaff(data: Partial<Staff>): Promise<ApiResponse<Staff>> {
    const response = await this.client.post('/staff', data);
    return response.data;
  }

  async updateStaff(id: string, data: Partial<Staff>): Promise<ApiResponse<Staff>> {
    const response = await this.client.put(`/staff/${id}`, data);
    return response.data;
  }

  async deleteStaff(id: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/staff/${id}`);
    return response.data;
  }

  // Payment endpoints
  async getPayments(params?: {
    branchId?: string;
    studentId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ payments: Payment[]; total: number; page: number; totalPages: number }>> {
    const response = await this.client.get('/payments', { params });
    return response.data;
  }

  async getPayment(id: string): Promise<ApiResponse<Payment>> {
    const response = await this.client.get(`/payments/${id}`);
    return response.data;
  }

  async createPayment(data: Partial<Payment>): Promise<ApiResponse<Payment>> {
    const response = await this.client.post('/payments', data);
    return response.data;
  }

  async updatePayment(id: string, data: Partial<Payment>): Promise<ApiResponse<Payment>> {
    const response = await this.client.put(`/payments/${id}`, data);
    return response.data;
  }

  // Application endpoints
  async getApplications(params?: {
    branchId?: string;
    courseId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ applications: Application[]; total: number; page: number; totalPages: number }>> {
    const response = await this.client.get('/applications', { params });
    return response.data;
  }

  async getApplication(id: string): Promise<ApiResponse<Application>> {
    const response = await this.client.get(`/applications/${id}`);
    return response.data;
  }

  async updateApplication(id: string, data: Partial<Application>): Promise<ApiResponse<Application>> {
    const response = await this.client.put(`/applications/${id}`, data);
    return response.data;
  }

  async convertApplicationToStudent(applicationId: string): Promise<ApiResponse<Student>> {
    const response = await this.client.post(`/applications/${applicationId}/convert`);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await this.client.get('/health');
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
