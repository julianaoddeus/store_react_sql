export interface ResponseCourses {
  data: Courses[];
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
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageURL: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface ResponseEnrollment {
  data: Enrollment[];
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: Date;
  status: "ATIVO" | "CANCELADO";
  cancelledAt?: Date;
}
