import {
  LayoutDashboard, Map, Wheat, Sprout, TrendingUp, AlertTriangle,
  Warehouse, Package, Truck, ShoppingCart, ShoppingBag,
  BarChart3, Bot, FileText, Users, Shield, MapPin,
  Apple, ClipboardList, Settings, Bell, Blocks, Activity,
  GitCompareArrows, Route, Landmark,
  type LucideIcon
} from 'lucide-react';
import type { Role } from '@/types/auth';

export interface NavItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: 'new' | 'beta' | 'soon';
}

export interface NavSection {
  labelKey: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    labelKey: 'nav.main',
    items: [
      { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer', 'distributor', 'consumer'] },
      { href: '/dashboard/map', labelKey: 'nav.map', icon: Map, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog'] },
      { href: '/notifications', labelKey: 'nav.notifications', icon: Bell, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer', 'distributor', 'consumer'] },
    ],
  },
  {
    labelKey: 'nav.agriculture',
    items: [
      { href: '/farm-data', labelKey: 'nav.farmData', icon: Wheat, roles: ['superadmin', 'gov_regional', 'farmer'] },
      { href: '/harvest', labelKey: 'nav.harvest', icon: Sprout, roles: ['superadmin', 'gov_regional', 'farmer'] },
      { href: '/prices', labelKey: 'nav.prices', icon: TrendingUp, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer', 'distributor', 'consumer'] },
      { href: '/prices/alerts', labelKey: 'nav.priceAlerts', icon: AlertTriangle, roles: ['superadmin', 'gov_central', 'gov_regional'] },
    ],
  },
  {
    labelKey: 'nav.logistics',
    items: [
      { href: '/bulog/warehouses', labelKey: 'nav.warehouses', icon: Warehouse, roles: ['superadmin', 'gov_central', 'bulog'] },
      { href: '/bulog/stock', labelKey: 'nav.stock', icon: Package, roles: ['superadmin', 'gov_central', 'bulog'] },
      { href: '/bulog/distributions', labelKey: 'nav.distributions', icon: Truck, roles: ['superadmin', 'gov_central', 'bulog'] },
      { href: '/logistics', labelKey: 'nav.smartLogistics', icon: Route, roles: ['superadmin', 'gov_central', 'bulog', 'distributor'], badge: 'new' },
    ],
  },
  {
    labelKey: 'nav.marketplace_section',
    items: [
      { href: '/marketplace', labelKey: 'nav.marketplace', icon: ShoppingCart, roles: ['superadmin', 'farmer', 'distributor', 'consumer'] },
      { href: '/orders', labelKey: 'nav.orders', icon: ShoppingBag, roles: ['superadmin', 'farmer', 'distributor', 'consumer'] },
      { href: '/blockchain', labelKey: 'nav.blockchain', icon: Blocks, roles: ['superadmin', 'gov_central', 'farmer', 'distributor'], badge: 'new' },
    ],
  },
  {
    labelKey: 'nav.analytics_section',
    items: [
      { href: '/analytics', labelKey: 'nav.analytics', icon: BarChart3, roles: ['superadmin', 'gov_central', 'gov_regional'], badge: 'beta' },
      { href: '/food-security', labelKey: 'nav.foodSecurity', icon: Activity, roles: ['superadmin', 'gov_central', 'gov_regional'], badge: 'new' },
      { href: '/supply-demand', labelKey: 'nav.supplyDemand', icon: GitCompareArrows, roles: ['superadmin', 'gov_central', 'gov_regional'], badge: 'new' },
      { href: '/pembiayaan', labelKey: 'nav.financing', icon: Landmark, roles: ['superadmin', 'gov_central', 'gov_regional', 'farmer'], badge: 'new' },
      { href: '/chatbot', labelKey: 'nav.chatbot', icon: Bot, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer'], badge: 'beta' },
      { href: '/reports', labelKey: 'nav.reports', icon: FileText, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog'] },
    ],
  },
  {
    labelKey: 'nav.admin_section',
    items: [
      { href: '/admin/users', labelKey: 'nav.users', icon: Users, roles: ['superadmin'] },
      { href: '/admin/roles', labelKey: 'nav.roles', icon: Shield, roles: ['superadmin'] },
      { href: '/admin/regions', labelKey: 'nav.regions', icon: MapPin, roles: ['superadmin'] },
      { href: '/admin/commodities', labelKey: 'nav.commodities', icon: Apple, roles: ['superadmin', 'gov_central'] },
      { href: '/admin/audit-log', labelKey: 'nav.auditLog', icon: ClipboardList, roles: ['superadmin', 'gov_central'] },
    ],
  },
  {
    labelKey: 'nav.settings_section',
    items: [
      { href: '/settings', labelKey: 'nav.settings', icon: Settings, roles: ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer', 'distributor', 'consumer'] },
    ],
  },
];

export function getNavigationForRole(role: Role): NavSection[] {
  return navigation
    .map(section => ({
      ...section,
      items: section.items.filter(item => item.roles.includes(role)),
    }))
    .filter(section => section.items.length > 0);
}
