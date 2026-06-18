import React, { useContext, useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  UserCheck, 
  Check, 
  X, 
  Clock, 
  Database, 
  Activity, 
  ChevronRight, 
  ShieldAlert, 
  CheckSquare, 
  XSquare, 
  RefreshCw,
  PieChart,
  HardDrive
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { darkmode } = useContext(AppContext);
  
  // Dynamic stats from localStorage
  const [pendingCount, setPendingCount] = useState(0);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  
  // System Tools State
  const [backingUp, setBackingUp] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    // Fetch counts from LocalStorage to keep dashboard numbers in sync
    const savedPending = localStorage.getItem('admin_pending_homestays');
    const savedHistory = localStorage.getItem('admin_history_homestays');

    if (savedPending) {
      setPendingCount(JSON.parse(savedPending).length);
    } else {
      setPendingCount(3); // Seed default
    }

    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistoryLogs(parsedHistory);
      const approved = parsedHistory.filter(item => item.status === 'APPROVED').length;
      setApprovedCount(approved);
    }
  }, []);

  const runBackup = () => {
    setBackingUp(true);
    toast.loading('Initializing full database backup...', { id: 'db-backup' });
    
    setTimeout(() => {
      toast.success('Backup snapshot successfully stored in Secure AWS S3 Glacier!', { id: 'db-backup' });
      setBackingUp(false);
    }, 2500);
  };

  const toggleMaintenance = () => {
    const nextState = !maintenanceMode;
    setMaintenanceMode(nextState);
    if (nextState) {
      toast.error('System is now entering Maintenance Mode. Public API endpoints are throttled.', {
        icon: '⚠️',
        duration: 3500
      });
    } else {
      toast.success('System is fully Operational. Maintenance mode disabled.', {
        duration: 3000
      });
    }
  };

  // Base platform stats
  const stats = [
    {
      title: 'Total Listings',
      value: 245 + approvedCount,
      icon: Home,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Active homestays on platform'
    },
    {
      title: 'Pending Approvals',
      value: pendingCount,
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Listings awaiting audit',
      link: '/admin/manage-homestay'
    },
    {
      title: 'Total Hosts',
      value: 389 + (approvedCount > 0 ? 1 : 0),
      icon: UserCheck,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      description: 'Verified active owners'
    },
    {
      title: 'Total Members',
      value: '1,842',
      icon: Users,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Registered travelers'
    }
  ];

  // Mock platform activities combined with actual history
  const defaultLogs = [
    { id: 'l1', type: 'system', text: 'Server health status: Operational (CPU: 24%, Mem: 42%)', time: '10 mins ago' },
    { id: 'l2', type: 'user', text: 'Host Rajesh Kumar verified their ID profile details.', time: '1 hour ago' },
    { id: 'l3', type: 'booking', text: 'New booking confirmed at "Riverfront Forest Cabin" for ₹18,400', time: '3 hours ago' }
  ];

  return (
    <div className={`min-h-screen pt-1 pb-16 px-4 ${darkmode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-slate-800'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${darkmode ? 'text-white' : 'text-slate-900'}`}>
            Dashboard Overview
          </h1>
          <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-slate-600'}`}>
            Welcome back, System Admin. Monitor activity metrics, system health, and process host submissions.
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const cardContent = (
              <div className={`rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } ${stat.link ? 'cursor-pointer hover:border-blue-500/40' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>
                      {stat.title}
                    </span>
                    <h3 className="text-3xl font-extrabold mt-1 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-xl border ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-between">
                  <span>{stat.description}</span>
                  {stat.link && <ChevronRight size={14} className="text-blue-500 animate-pulse" />}
                </p>
              </div>
            );

            return stat.link ? (
              <Link to={stat.link} key={index}>
                {cardContent}
              </Link>
            ) : (
              <div key={index}>{cardContent}</div>
            );
          })}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left / Center 2 Columns: Category Distribution & System Status */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category Distribution chart/visual progress bars */}
            <div className={`rounded-2xl border p-6 shadow-sm ${
              darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <PieChart size={18} className="text-blue-500" />
                Category Distribution
              </h2>
              
              <div className="space-y-4">
                {/* Mountains */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Mountains & Valleys</span>
                    <span className="text-gray-500">45% (110 Listings)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                  </div>
                </div>

                {/* Beach */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Beaches & Coastlines</span>
                    <span className="text-gray-500">28% (68 Listings)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: '28%' }}></div>
                  </div>
                </div>

                {/* Snow */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Snow & Winters</span>
                    <span className="text-gray-500">14% (34 Listings)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-cyan-500" style={{ width: '14%' }}></div>
                  </div>
                </div>

                {/* Rivers */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Rivers & Lakefronts</span>
                    <span className="text-gray-500">9% (22 Listings)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-teal-500" style={{ width: '9%' }}></div>
                  </div>
                </div>

                {/* Deserts */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Deserts & Sanddunes</span>
                    <span className="text-gray-500">4% (11 Listings)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & System Utilities */}
            <div className={`rounded-2xl border p-6 shadow-sm ${
              darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Database size={18} className="text-purple-500" />
                Administrative Controls & Tools
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Database Backup tool */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  darkmode ? 'bg-gray-900 border-gray-800' : 'bg-slate-50 border-gray-150'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2 text-slate-800 dark:text-white">
                      <HardDrive size={16} className="text-blue-500" />
                      Backup Core Server
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      Creates a system-wide MySQL snapshot backup and uploads it to secure cloud buckets.
                    </p>
                  </div>
                  <button
                    onClick={runBackup}
                    disabled={backingUp}
                    className="mt-4 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} className={backingUp ? 'animate-spin' : ''} />
                    {backingUp ? 'Backing up Database...' : 'Run Backup Script'}
                  </button>
                </div>

                {/* Maintenance mode toggle */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                  darkmode ? 'bg-gray-900 border-gray-800' : 'bg-slate-50 border-gray-150'
                }`}>
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2 text-slate-800 dark:text-white">
                      <ShieldAlert size={16} className="text-amber-500" />
                      Maintenance Mode
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      Toggles user-facing API routes to display warning prompts during deployments.
                    </p>
                  </div>
                  <button
                    onClick={toggleMaintenance}
                    className={`mt-4 px-4 py-2.5 text-xs font-bold rounded-lg transition ${
                      maintenanceMode 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Recent Activities Log Feed */}
          <div className="space-y-6">
            
            {/* System activity feed */}
            <div className={`rounded-2xl border p-6 shadow-sm h-full flex flex-col justify-between ${
              darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div>
                <h2 className="text-lg font-bold mb-5 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                  <Activity size={18} className="text-emerald-500" />
                  Live Platform Log
                </h2>

                <div className="space-y-4">
                  {/* Dynamic logs from actual user history */}
                  {historyLogs.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${
                        item.status === 'APPROVED' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.status === 'APPROVED' ? <CheckSquare size={13} /> : <XSquare size={13} />}
                      </div>
                      <div>
                        <p className={`font-semibold ${darkmode ? 'text-gray-300' : 'text-slate-700'}`}>
                          List Approved: "{item.title}"
                        </p>
                        <p className="text-gray-500 mt-0.5">
                          Listing submitted by host <strong>{item.host}</strong> was {item.status === 'APPROVED' ? 'published publically' : 'moderated and rejected'}.
                        </p>
                        <span className="text-[10px] text-gray-400 block mt-1">
                          {new Date(item.actionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Standard mock logs for filled look */}
                  {defaultLogs.map((log) => (
                    <div key={log.id} className="flex gap-3 text-xs">
                      <div className="mt-0.5 p-1.5 rounded-full shrink-0 bg-blue-500/10 text-blue-500">
                        <Activity size={13} />
                      </div>
                      <div>
                        <p className={`font-medium ${darkmode ? 'text-gray-300' : 'text-slate-700'}`}>
                          {log.text}
                        </p>
                        <span className="text-[10px] text-gray-400 block mt-1">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                to="/admin/manage-homestay" 
                className="mt-6 flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-150 dark:hover:bg-gray-750 transition"
              >
                Go to Moderation Panel
                <ChevronRight size={14} />
              </Link>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;