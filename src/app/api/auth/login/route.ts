import { NextResponse } from 'next/server';
import { mockUsers, DEMO_PASSWORD } from '@/mock/data/users';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Simulate network delay
  await new Promise(r => setTimeout(r, 500));

  const user = mockUsers.find(u => u.email === email);

  if (!user || password !== DEMO_PASSWORD) {
    return NextResponse.json({
      success: false,
      data: null,
      error: { code: 'INVALID_CREDENTIALS', message: 'Email atau password salah' },
    }, { status: 401 });
  }

  const token = `mock-jwt-${user.id}-${Date.now()}`;

  return NextResponse.json({
    success: true,
    data: { user, token },
  });
}
