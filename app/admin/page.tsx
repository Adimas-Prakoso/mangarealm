'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  Eye, 
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Database
} from 'lucide-react';
import Link from 'next/link';

// Mock admin stats
const adminStats = [
  {
    title: 'Total Users',
    value: '12,543',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Total Series',
    value: '8,234',
    change: '+5%',
    icon: BookOpen,
    color: 'text-green-600'
  },
  {
    title: 'Daily Views',
    value: '1.2M',
    change: '+18%',
    icon: Eye,
    color: 'text-purple-600'
  },
  {
    title: 'Active Readers',
    value: '45,678',
    change: '+8%',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

const quickActions = [
  {
    title: 'Add New Series',
    description: 'Add a new manga, manhwa, manhua, or novel',
    icon: Plus,
    href: '/admin/series/new',
    color: 'bg-blue-500'
  },
  {
    title: 'Manage Users',
    description: 'View and manage user accounts',
    icon: Users,
    href: '/admin/users',
    color: 'bg-green-500'
  },
  {
    title: 'Content Management',
    description: 'Manage series, chapters, and content',
    icon: FileText,
    href: '/admin/content',
    color: 'bg-purple-500'
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics and reports',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'bg-orange-500'
  },
  {
    title: 'System Settings',
    description: 'Configure system settings and preferences',
    icon: Settings,
    href: '/admin/settings',
    color: 'bg-gray-500'
  },
  {
    title: 'Database Management',
    description: 'Manage database and backups',
    icon: Database,
    href: '/admin/database',
    color: 'bg-red-500'
  }
];

const recentActivity = [
  {
    action: 'New user registered',
    user: 'john.doe@example.com',
    time: '2 minutes ago'
  },
  {
    action: 'Series updated',
    user: 'admin',
    time: '15 minutes ago'
  },
  {
    action: 'Chapter uploaded',
    user: 'content.manager',
    time: '1 hour ago'
  },
  {
    action: 'User reported content',
    user: 'user123',
    time: '2 hours ago'
  },
  {
    action: 'New series added',
    user: 'admin',
    time: '3 hours ago'
  }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access admin panel</h1>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don&apos;t have permission to access the admin panel.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}. Here&apos;s what&apos;s happening with MangaRealm today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest system activities and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/admin/activity">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2.1TB</div>
                <div className="text-sm text-muted-foreground">Storage Used</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Actions */}
      <div className="mt-8">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Emergency Actions</CardTitle>
            <CardDescription>
              Use these actions only in case of emergencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive" size="sm">
                Maintenance Mode
              </Button>
              <Button variant="outline" size="sm" className="border-red-200 text-red-600">
                Clear Cache
              </Button>
              <Button variant="outline" size="sm" className="border-red-200 text-red-600">
                Backup Database
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}