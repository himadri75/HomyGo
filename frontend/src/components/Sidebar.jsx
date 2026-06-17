import { NavLink } from "react-router-dom";
import { LayoutDashboard, HomeIcon, SquarePen } from "lucide-react";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Homestay",
    to: "/admin/manage-homestay",
    icon: SquarePen,
  },
];

const hostNavItems = [
  {
    label: "Dashboard",
    to: "/host/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add Homestay",
    to: "/host/add-homestay",
    icon: SquarePen,
  },
];

function Sidebar({ role }) {
  const navItems = role === "ADMIN" ? adminNavItems : role === "HOST" ? hostNavItems : [];

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="sticky top-0 lg:top-20 p-4">
        <h2 className="mb-6 px-3 text-lg font-semibold text-slate-900 dark:text-white">
          Admin Panel
        </h2>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-slate-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;