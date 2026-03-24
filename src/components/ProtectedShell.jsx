"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function ProtectedShell({ children, session }) {
  return (
    <div className="flex">
      <Sidebar session={session} />

      <div className="ml-64 min-h-screen flex-1 bg-gray-100 dark:bg-gray-900 dark:text-white">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
}

export default ProtectedShell;
