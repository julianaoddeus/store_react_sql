export interface ResponseProducts {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface Product {
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

export interface ResponseCourses {
  data: Course[];
}

export interface Course {
  id: string;  
  progress: number;
  inicialDate: Date;
  durationInMonths: number;
  expiresAt: Date;
  product: {  
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    duration: number;
    image?: {
      url: string;
    };
  };
}
