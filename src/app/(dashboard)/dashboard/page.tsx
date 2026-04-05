'use client';
import { useAuthStore } from '@/stores/auth-store';
import GovCentralDashboard from '@/components/dashboard/GovCentralDashboard';
import GovRegionalDashboard from '@/components/dashboard/GovRegionalDashboard';
import BulogDashboard from '@/components/dashboard/BulogDashboard';
import FarmerDashboard from '@/components/dashboard/FarmerDashboard';
import DistributorDashboard from '@/components/dashboard/DistributorDashboard';
import ConsumerDashboard from '@/components/dashboard/ConsumerDashboard';
import SuperadminDashboard from '@/components/dashboard/SuperadminDashboard';

const DASHBOARD_MAP = {
  superadmin: SuperadminDashboard,
  gov_central: GovCentralDashboard,
  gov_regional: GovRegionalDashboard,
  bulog: BulogDashboard,
  farmer: FarmerDashboard,
  distributor: DistributorDashboard,
  consumer: ConsumerDashboard,
} as const;

export default function DashboardPage() {
  const { user } = useAuthStore();
  if (!user) return null;

  const Dashboard = DASHBOARD_MAP[user.role] || GovCentralDashboard;
  return <Dashboard />;
}
