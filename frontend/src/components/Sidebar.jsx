import { NavLink } from "react-router-dom";
import { LayoutDashboard, SquarePen, Lock, User } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    label: "Manage Homestay",
    to: "/admin/manage-homestay",
    icon: SquarePen,
    disabled: false,
  },
];

const hostNavItems = (hostVerification) => [
  {
    label: "Dashboard",
    to: "/host/dashboard",
    icon: LayoutDashboard,
    disabled: !hostVerification,
  },
  {
    label: "Add Homestay",
    to: "/host/add-homestay",
    icon: SquarePen,
    disabled: !hostVerification,
  },
  {

    label: "Profile",
    to: "/host/profile",
    icon: User,
    disabled: false,
  },
];

function Sidebar({ role }) {
  const { hostDetails } = useContext(AppContext);

  const navItems =
    role === "ADMIN"
      ? adminNavItems
      : role === "HOST"
        ? hostNavItems(hostDetails?.is_verified)
        : [];

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="sticky top-0 lg:top-20 p-4">
        <h2 className="mb-6 px-3 text-lg font-semibold text-slate-900 dark:text-white">
          {role === "ADMIN" ? "Admin" : "Host"} Panel
        </h2>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    toast.error(
                      "Please complete your profile!"
                    )
                  }
                  className="w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-colors text-slate-400 dark:text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>

                  <Lock
                    size={14}
                    className="text-amber-500 dark:text-amber-600 animate-pulse"
                  />
                </button>
              );
            }

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