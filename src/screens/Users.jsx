"use client";

import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  loadUsers,
  updateUser,
} from "../services/users";

function Users() {
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const loadedUsers = await loadUsers();
        setUsers(loadedUsers);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleEdit(user) {
    setEditingUser({ ...user });
  }

  async function handleSave() {
    try {
      const updatedUser = await updateUser(editingUser.id, editingUser);
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setEditingUser(null);
      setError("");
    } catch (saveError) {
      setError(saveError.message || "Failed to update user.");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
      setError("");
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete user.");
    }
  }

  async function handleAddUser() {
    try {
      const createdUser = await createUser(newUser);
      setUsers((currentUsers) => [createdUser, ...currentUsers]);
      setNewUser(null);
      setError("");
    } catch (createError) {
      setError(createError.message || "Failed to create user.");
    }
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-bold">Edit User</h2>

            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="mb-4 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(null)}
                className="rounded bg-gray-400 px-3 py-1 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded bg-green-500 px-3 py-1 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {newUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-bold">Add User</h2>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              type="text"
              placeholder="City"
              value={newUser.address.city}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { city: e.target.value },
                })
              }
              className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <input
              type="text"
              placeholder="Company"
              value={newUser.company.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  company: { name: e.target.value },
                })
              }
              className="mb-4 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setNewUser(null)}
                className="rounded bg-gray-400 px-3 py-1 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="rounded bg-green-500 px-3 py-1 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage registered users, search records and keep data updated.
            </p>
          </div>

          <button
            onClick={() =>
              setNewUser({
                name: "",
                email: "",
                address: { city: "" },
                company: { name: "" },
              })
            }
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Add User
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Search user..."
          className="mb-4 w-full max-w-sm rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full rounded bg-white shadow dark:bg-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Actions</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Company</th>
              </tr>
            </thead>

            <tbody>
              {!isLoading &&
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <td className="flex gap-2 p-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="rounded bg-blue-500 px-2 py-1 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="rounded bg-red-500 px-2 py-1 text-white"
                      >
                        Delete
                      </button>
                    </td>

                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.address?.city}</td>
                    <td className="p-3">{user.company?.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <p className="pt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading users...
          </p>
        )}
      </div>
    </div>
  );
}

export default Users;
