import { Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import HostAuth from "./HostAuth";

function Host() {
  const { hostDetails, darkmode, loading } = useContext(AppContext);

  if (!hostDetails) {
    return <HostAuth/>;
  }

  return (
    <section
      className={`flex min-h-screen flex-col lg:flex-row ${darkmode ? "bg-gray-950 text-white" : "bg-gray-50 text-slate-900"}`}
    >
      <Sidebar role={"HOST"} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div
            className={`rounded-xl border ${darkmode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}
          >
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Host;