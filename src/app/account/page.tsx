'use client';

import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Orders', value: '12' },
  { label: 'Wishlist', value: '3' },
  { label: 'Spent', value: '$1,240' },
];

const recentOrders = [
  {
    id: 'SES-2024-001234',
    date: 'Jan 15, 2024',
    items: 3,
    total: 86.37,
    status: 'shipped',
  },
  {
    id: 'SES-2024-001233',
    date: 'Jan 10, 2024',
    items: 1,
    total: 29.99,
    status: 'delivered',
  },
];

const menuItems = [
  { icon: Package, label: 'Orders', href: '/account/orders' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: User, label: 'Profile', href: '/account/profile' },
  { icon: Bell, label: 'Notifications', href: '/account/notifications' },
  { icon: Settings, label: 'Settings', href: '/account/settings' },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white py-4 border-b">
        <div className="container">
          <Breadcrumb items={[{ label: 'My Account' }]} />
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-[#1B5E3B]">JD</span>
                </div>
                <div>
                  <h2 className="font-semibold text-[#212529]">John Doe</h2>
                  <p className="text-sm text-[#6C757D]">john@example.com</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#343A40] hover:bg-[#F8F9FA] transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#6C757D]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#DC3545] hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#1B5E3B] to-[#2E7D4A] rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-white/80">
                From your account dashboard you can view your recent orders, manage
                your shipping addresses, and edit your account details.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-[#1B5E3B]">{stat.value}</p>
                  <p className="text-sm text-[#6C757D]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#212529]">
                  Recent Orders
                </h2>
                <Link
                  href="/account/orders"
                  className="text-sm text-[#1B5E3B] hover:underline flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[#212529]">#{order.id}</p>
                      <p className="text-sm text-[#6C757D]">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#212529]">
                        ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {order.status === 'delivered' ? 'Delivered' : 'Shipped'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
