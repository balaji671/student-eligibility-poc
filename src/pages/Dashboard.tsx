import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DemoBanner } from '../components/Common/DemoBanner';
import { MockChart } from '../components/UI/MockChart';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      onClick: () => navigate('/students')
    },
    {
      title: 'Pending Reviews',
      value: '43',
      change: '-3',
      icon: AlertCircle,
      color: 'bg-orange-500',
      onClick: () => navigate('/students?status=review')
    },
    {
      title: 'Potential Duplicates',
      value: '8',
      change: '+2',
      icon: Users,
      color: 'bg-red-500',
      onClick: () => navigate('/duplicates')
    },
    {
      title: 'Eligibility Pending',
      value: '27',
      change: '+5',
      icon: CheckCircle,
      color: 'bg-yellow-500',
      onClick: () => navigate('/eligibility/pending')
    }
  ];

  const quickActions = [
    {
      label: 'Add Student',
      icon: 'pi pi-user-plus',
      route: '/students/new'
    },
    {
      label: 'Upload Students',
      icon: 'pi pi-upload',
      route: '/students/upload'
    },
    {
      label: 'View Reports',
      icon: 'pi pi-chart-bar',
      route: '/reports'
    },
    {
      label: 'Review Duplicates',
      icon: 'pi pi-users',
      route: '/duplicates'
    }
  ];

  return (
    <div className="space-y-6">
      <DemoBanner />
      
      <header role="banner">
        <h1 className="text-2xl font-bold text-gray-900">LEA Dashboard</h1>
        <p className="text-gray-600">Mock data overview for demonstration purposes</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={stat.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && stat.onClick()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              label={action.label}
              icon={action.icon}
              className="w-full justify-center"
              onClick={() => navigate(action.route)}
              aria-label={`Navigate to ${action.label}`}
            />
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Student Status Distribution</h2>
          <MockChart type="doughnut" />
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Monthly Enrollment Trend</h2>
          <MockChart type="line" />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3" role="list">
          {[
            '5 new students added manually',
            '3 potential duplicates flagged',
            '12 eligibility reviews completed',
            'Batch upload processed (50 records)'
          ].map((activity, index) => (
            <li 
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded"
              role="listitem"
            >
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
              {activity}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};