export type Role = 'superadmin' | 'gov_central' | 'gov_regional' | 'bulog' | 'farmer' | 'distributor' | 'consumer';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  regionId?: string;
  regionName?: string;
  role: Role;
  permissions: string[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  nik: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  regionId?: string;
}
