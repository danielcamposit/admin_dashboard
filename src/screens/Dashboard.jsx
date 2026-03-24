"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Card from "../components/Card";
import { loadUsers } from "../services/users";

function Dashboard() {
  const companyColors = [
    "#0f766e",
    "#2563eb",
    "#f97316",
    "#e11d48",
    "#7c3aed",
    "#ca8a04",
  ];
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const loadedUsers = await loadUsers();
        setUsers(loadedUsers);
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const uniqueCompanies = new Set(
    users.map((user) => user.company?.name).filter(Boolean)
  ).size;
  const uniqueCities = new Set(
    users.map((user) => user.address?.city).filter(Boolean)
  ).size;

  const cityCount = {};
  users.forEach((user) => {
    const city = user.address?.city || "Unknown";
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const chartData = Object.keys(cityCount).map((city) => ({
    city,
    users: cityCount[city],
  }));

  const companyCount = {};
  users.forEach((user) => {
    const company = user.company?.name || "Unknown";
    companyCount[company] = (companyCount[company] || 0) + 1;
  });

  const companyChartData = Object.keys(companyCount).map((company) => ({
    name: company,
    value: companyCount[company],
  }));

  const recentUsers = [...users]
    .sort((firstUser, secondUser) => secondUser.id - firstUser.id)
    .slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
        <Card title="Total Users" value={totalUsers} />
        <Card title="Companies" value={uniqueCompanies} />
        <Card title="Cities" value={uniqueCities} />
      </div>

      {error && (
        <div className="px-6">
          <p className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>
        </div>
      )}

      {(chartData.length > 0 || companyChartData.length > 0) && (
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          {chartData.length > 0 && (
            <div className="rounded bg-white p-6 shadow dark:bg-gray-800">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Users by City</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Every user added in the Users area updates this chart.
                </p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {companyChartData.length > 0 && (
            <div className="rounded bg-white p-6 shadow dark:bg-gray-800">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Users by Company</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Distribution of users across registered companies.
                </p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={companyChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label
                    >
                      {companyChartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={companyColors[index % companyColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6 pt-0">
        <div className="rounded bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Users Added</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest users saved from the Users page.
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {recentUsers.length} of {users.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full rounded">
              <thead className="border-b border-gray-200 text-left dark:border-gray-700">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Company</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.address?.city || "Unknown"}</td>
                    <td className="p-3">{user.company?.name || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <p className="pt-4 text-sm text-gray-500 dark:text-gray-400">
              No users available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
