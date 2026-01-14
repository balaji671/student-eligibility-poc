import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileUp, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MockChart } from '../components/UI/MockChart';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Students', value: '1,47', change: '+12%', icon: Users, color: 'bg-indigo-500', shadow: 'shadow-indigo-100', onClick: () => navigate('/students') },
    { title: 'Pending Reviews', value: '43', change: '-3', icon: AlertCircle, color: 'bg-amber-500', shadow: 'shadow-amber-100', onClick: () => navigate('/students?status=review') },
    { title: 'Potential Duplicates', value: '8', change: '+2', icon: Users, color: 'bg-rose-500', shadow: 'shadow-rose-100', onClick: () => navigate('/duplicates') },
    { title: 'Eligibility Pending', value: '27', change: '+5', icon: CheckCircle, color: 'bg-emerald-500', shadow: 'shadow-emerald-100', onClick: () => navigate('/eligibility/pending') }
  ];

  const quickActions = [
    { label: 'Add Student', icon: 'pi pi-user-plus', route: '/students/new', color: 'p-button-primary' },
    { label: 'Upload Students', icon: 'pi pi-upload', route: '/students/upload', color: 'p-button-secondary' },
    { label: 'View Reports', icon: 'pi pi-chart-bar', route: '/reports', color: 'p-button-info' },
    { label: 'Review Duplicates', icon: 'pi pi-users', route: '/duplicates', color: 'p-button-help' }
  ];

  return (
    <div className="space-y-8 pb-10">
      <header role="banner" className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-aos="fade-right">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">LEA Dashboard</h1>
          <p className="text-slate-500 font-medium">Insights and student management overview</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <TrendingUp size={20} />
          </div>
          <span className="text-sm font-semibold text-slate-700">System Healthy</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl ${stat.shadow}`}
            onClick={stat.onClick}
            role="button"
            tabIndex={0}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            onKeyDown={(e) => e.key === 'Enter' && stat.onClick()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.title}</p>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2 font-medium">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-2xl shadow-lg transform rotate-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section - Takes up 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-md rounded-2xl" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Status Distribution</h2>
                <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-rounded text-slate-400" />
              </div>
              <div className="h-64 flex items-center justify-center">
                <MockChart type="doughnut" />
              </div>
            </Card>

            <Card className="border-none shadow-md rounded-2xl" data-aos="fade-up" data-aos-delay="500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Enrollment Trend</h2>
                <Button icon="pi pi-refresh" className="p-button-text p-button-rounded text-slate-400" />
              </div>
              <div className="h-64 flex items-center justify-center">
                <MockChart type="line" />
              </div>
            </Card>
          </div>

          {/* Quick Actions Integrated below charts */}
          <Card className="border-none shadow-md rounded-2xl bg-slate-900 text-white overflow-hidden relative" data-aos="fade-up">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <FileUp size={120} />
            </div>
            <h2 className="text-xl font-bold mb-6">Administrative Toolkit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  label={action.label}
                  icon={action.icon}
                  className={`${action.color} border-none hover:opacity-90 transition-all font-bold py-3`}
                  onClick={() => navigate(action.route)}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity Section - Takes up 1 column */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md rounded-2xl h-fit" data-aos="fade-left" data-aos-delay="600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Live Updates</span>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
              <ul className="space-y-6 relative" role="list">
                {[
                  { text: '5 new students added manually', time: '2 mins ago', type: 'blue' },
                  { text: '3 potential duplicates flagged', time: '45 mins ago', type: 'rose' },
                  { text: '12 eligibility reviews completed', time: '2 hours ago', type: 'emerald' },
                  { text: 'Batch upload processed (50 records)', time: '5 hours ago', type: 'amber' }
                ].map((activity, index) => (
                  <li key={index} className="flex items-start ml-2 group" role="listitem">
                    <div className={`z-10 h-4 w-4 rounded-full border-4 border-white shadow-sm mt-1 transition-transform group-hover:scale-125 bg-${activity.type}-500`}></div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-slate-700 leading-tight">{activity.text}</p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              label="View All Activity"
              className="p-button-text w-full mt-8 border-t border-slate-50 pt-4 text-sm font-bold"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};