import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileUp, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
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
    <div className="space-y-6">
      <header role="banner" className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex justify-between w-full max-h-80 h-36 border border-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${stat.shadow}`}
            onClick={stat?.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && stat.onClick()}
          >
            <div className='flex flex-col justify-between'>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</p>
              <div>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2 font-medium">vs last month</span>
                </div>
              </div>
            </div>
            <div className={`${stat.color} p-4 rounded-2xl shadow-lg transform rotate-3 h-fit`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className="flex-1 min-w-75 bg-white border border-gray-200 p-5 shadow-md rounded-2xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Status Distribution</h2>
            <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-rounded text-slate-400" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <MockChart type="doughnut" />
          </div>
        </div>

        <div className="flex-1 min-w-75 bg-white border border-gray-200 p-5 shadow-md rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Enrollment Trend</h2>
            <Button icon="pi pi-refresh" className="p-button-text p-button-rounded text-slate-400" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <MockChart type="line" />
          </div>
        </div>
      </div>

      <div className="w-full border border-gray-200 p-8 shadow-md rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FileUp size={120} />
        </div>
        <h2 className="text-xl font-bold mb-6 relative z-10">Administrative Toolkit</h2>
        <div className="flex flex-wrap gap-4 relative z-10">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              label={action.label}
              icon={action.icon}
              className={`${action.color} flex-1 min-w-45 border-none hover:opacity-90 transition-all font-bold py-4`}
              onClick={() => navigate(action.route)}
            />
          ))}
        </div>
      </div>

      <div className="border border-gray-200 p-6 shadow-md rounded-2xl h-fit bg-white flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Live Updates</span>
        </div>

        <div className="relative flex-1">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
          <ul className="space-y-8 relative">
            {[
              { text: '5 new students added manually', time: '2 mins ago', color: 'bg-blue-500' },
              { text: '3 potential duplicates flagged', time: '45 mins ago', color: 'bg-rose-500' },
              { text: '12 eligibility reviews completed', time: '2 hours ago', color: 'bg-emerald-500' },
              { text: 'Batch upload processed (50 records)', time: '5 hours ago', color: 'bg-amber-500' },
            ].map((activity, index) => (
              <li key={index} className="flex items-start ml-2 group">
                <div className={`z-10 h-4 w-4 rounded-full border-4 border-white shadow-sm mt-1 transition-transform group-hover:scale-125 ${activity.color}`}></div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-slate-700 leading-tight">{activity.text}</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Button
          label="View All Activity"
          className="p-button-text w-full mt-10 border-t border-slate-50 pt-5 text-sm font-bold"
        />
      </div>
    </div>
  );
};