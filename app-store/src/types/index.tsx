export interface ResponseCourses {
  data: ResponseCoursesAndEnrollments[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface Courses {
  id: string;
  name: string;
  description: string;
  startDate: string;
  stock: number;
  imageURL: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface ResponseEnrollments {
  data: Enrollments[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface Enrollments {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status: string;
  cancelledAt?: Date;
}

export interface ResponseCoursesAndEnrollments {
  id: string;
  name: string;
  description: string;
  startDate: string;
  stock: number;
  imageURL: string;
  enrollments?: Enrollments[];
}
