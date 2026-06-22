import { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  Home,
  Clock,
  CalendarCheck,
  TrendingDown,
  TrendingUp,
  IndianRupee,
  Star,
  ChevronRight,
  Dot,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

/* ─────────────────────────── Dummy Data ─────────────────────────── */
const STATS = [
  {
    id: "total_homestays",
    label: "Total Homestays",
    value: 8,
    sub: "+2 this month",
    trend: "up",
    icon: Home,
    color: "blue",
  },
  {
    id: "pending_approval",
    label: "Pending Approval",
    value: 3,
    sub: "Awaiting admin review",
    trend: "neutral",
    icon: Clock,
    color: "amber",
  },
  {
    id: "total_bookings",
    label: "Total Bookings",
    value: 124,
    sub: "+18 this month",
    trend: "up",
    icon: CalendarCheck,
    color: "emerald",
  },
  {
    id: "cancellation_rate",
    label: "Cancellation Rate",
    value: "6.4%",
    sub: "↓ 1.2% vs last month",
    trend: "down",
    icon: TrendingDown,
    color: "rose",
  },
];

const MONTHLY_EARNINGS = [
  { month: "Jan", amount: 18400 },
  { month: "Feb", amount: 21000 },
  { month: "Mar", amount: 17500 },
  { month: "Apr", amount: 26800 },
  { month: "May", amount: 31200 },
  { month: "Jun", amount: 28900 },
  { month: "Jul", amount: 35600 },
  { month: "Aug", amount: 40100 },
  { month: "Sep", amount: 33400 },
  { month: "Oct", amount: 38700 },
  { month: "Nov", amount: 29500 },
  { month: "Dec", amount: 44200 },
];

const RECENT_BOOKINGS = [
  { id: "BK-1021", guest: "Aarav Sharma", homestay: "Mountain Dew Cottage", nights: 3, status: "confirmed", amount: 7200 },
  { id: "BK-1020", guest: "Priya Mehta", homestay: "Riverside Retreat", nights: 5, status: "confirmed", amount: 12500 },
  { id: "BK-1019", guest: "Rahul Verma", homestay: "Forest Nest", nights: 2, status: "cancelled", amount: 4800 },
  { id: "BK-1018", guest: "Sneha Patel", homestay: "Valley View Villa", nights: 7, status: "confirmed", amount: 21000 },
  { id: "BK-1017", guest: "Kiran Rao", homestay: "Lakeside Haven", nights: 4, status: "pending", amount: 9600 },
];

const TOP_HOMESTAYS = [
  { name: "Mountain Dew Cottage", rating: 4.9, bookings: 34, revenue: 82000 },
  { name: "Riverside Retreat", rating: 4.7, bookings: 29, revenue: 72500 },
  { name: "Valley View Villa", rating: 4.8, bookings: 27, revenue: 81000 },
];

/* ─────────────────────────── Color Maps ─────────────────────────── */
const CARD_COLORS = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/50",
    badge: "text-blue-600 dark:text-blue-400",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/50",
    badge: "text-amber-600 dark:text-amber-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
    badge: "text-emerald-600 dark:text-emerald-400",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800/50",
    badge: "text-rose-600 dark:text-rose-400",
  },
};

const STATUS_BADGE = {
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
};

/* ─────────────────────────── Custom Tooltip ─────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 px-4 py-2.5 shadow-xl text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">{label}</p>
      <p className="text-blue-600 dark:text-blue-400 font-bold">
        ₹{Number(payload[0].value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

/* ─────────────────────────── Recharts Earnings Chart ─────────────────────────── */
function EarningsChart({ data, darkmode }) {
  const axisColor = darkmode ? "#64748b" : "#94a3b8";
  const gridColor = darkmode ? "rgba(148,163,184,0.1)" : "rgba(100,116,139,0.1)";

  return (
    <ResponsiveContainer width="100%" height={230}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="4 4"
          stroke={gridColor}
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: axisColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          dy={8}
        />

        <YAxis
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          tick={{ fill: axisColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={50}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#3b82f6", strokeWidth: 1.5, strokeDasharray: "4 3" }}
        />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#2563eb"
          strokeWidth={2.5}
          fill="url(#earningsGrad)"
          dot={{ r: 4, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─────────────────────────── Stat Card ─────────────────────────── */
function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const c = CARD_COLORS[stat.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-5 flex flex-col gap-3 group hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Glow blob */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl bg-current pointer-events-none" />

      <div className="flex items-start justify-between">
        <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${c.icon} shadow-sm`}>
          <Icon size={20} />
        </span>
        {stat.trend === "up" && <TrendingUp size={14} className="text-emerald-500 mt-1" />}
        {stat.trend === "down" && <TrendingDown size={14} className="text-rose-500 mt-1" />}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
      </div>

      <p className={`text-xs font-medium ${c.badge}`}>{stat.sub}</p>
    </motion.div>
  );
}

/* ─────────────────────────── Main Dashboard ─────────────────────────── */
const HostDashboard = () => {
  const { hostDetails, darkmode } = useContext(AppContext);

  const totalRevenue = MONTHLY_EARNINGS.reduce((s, d) => s + d.amount, 0);
  const thisMonthRevenue = MONTHLY_EARNINGS[MONTHLY_EARNINGS.length - 1].amount;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, {hostDetails?.name?.split(" ")[0] ?? "Host"} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Here's what's happening with your homestays today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm self-start sm:self-auto">
          <Dot size={16} className="text-emerald-500 animate-pulse" />
          Live · June 2026
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* ── Chart + Revenue Summary ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-800 dark:text-white">Monthly Earnings</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Jan – Dec 2026</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
              <TrendingUp size={12} />
              +18.3% YoY
            </span>
          </div>
          <EarningsChart data={MONTHLY_EARNINGS} darkmode={darkmode} />
        </motion.div>

        {/* Revenue Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm flex flex-col gap-5"
        >
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Revenue Summary</h2>

          {/* Total Earnings */}
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">
            <p className="text-xs opacity-80 mb-1">Total Earnings (2026)</p>
            <p className="text-2xl font-bold flex items-center gap-1">
              <IndianRupee size={18} />
              {totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs opacity-70 mt-1">Across all homestays</p>
          </div>

          {/* This month */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">This Month (Dec)</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">₹{thisMonthRevenue.toLocaleString("en-IN")}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
              Best month
            </span>
          </div>

          {/* Top Performing Homestays */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Top Homestays</p>
            <ul className="space-y-3">
              {TOP_HOMESTAYS.map((hs, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 truncate">{hs.name}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{hs.rating}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* ── Recent Bookings ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Recent Bookings</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium transition">
            View all <ChevronRight size={13} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-gray-800/60">
                {["Booking ID", "Guest", "Homestay", "Nights", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((bk, i) => (
                <motion.tr
                  key={bk.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{bk.id}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-white whitespace-nowrap">{bk.guest}</td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{bk.homestay}</td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{bk.nights} nights</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white whitespace-nowrap">
                    ₹{bk.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[bk.status]}`}>
                      {bk.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Cancellation Rate Detail ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.68, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20 p-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <TrendingDown size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Booking Cancellation Rate</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current month vs industry average (8%)</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xl font-bold text-rose-600 dark:text-rose-400">6.4%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your rate</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-400 dark:text-slate-500">8.0%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Industry avg</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">↓ 1.6%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Below avg</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Your rate: 6.4%</span>
            <span>Industry avg: 8.0%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-rose-200 dark:bg-rose-900/60 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 font-medium">
            ✓ You're performing better than the industry average!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HostDashboard;