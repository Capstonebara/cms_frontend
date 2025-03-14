"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
import { UserAccordionItem } from "./user-accordion-item";
import { UserProfileModal } from "./user-profile-modal";
import { AddUserModal } from "./add-user-modal";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { deleteUser, getUsers } from "./fetch";
import { Bounce, toast } from "react-toastify";

export interface User {
  id: string;
  username: string;
  name: string;
  apartment: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export function UsersAccordion() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAddUserModalOpen) {
      async function fetchUsers() {
        try {
          setIsLoading(true);
          const data = await getUsers();
          setUsers(data);
        } catch (error) {
          console.error("Failed to fetch users", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchUsers();
    }
  }, [isAddUserModalOpen]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        const response = await deleteUser(userToDelete.id);
        if (response.success) {
          setUsers(users?.filter((user) => user.id !== userToDelete.id) || []);
          toast.success(response.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch {
        toast.error("False to delete user", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  if (!users) {
    return;
  }

  // Group users by username for accordion
  const usersByUsername = users.reduce<Record<string, User[]>>((acc, user) => {
    if (!acc[user.username]) {
      acc[user.username] = [];
    }
    acc[user.username].push(user);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">
            Total {users.length} users in the system
          </p>
        </div>
        <Button onClick={() => setIsAddUserModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader className="animate-spin h-10 w-10 text-gray-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(usersByUsername).map(([username, usersGroup]) => (
            <UserAccordionItem
              key={username}
              username={username}
              users={usersGroup}
              onViewUser={handleViewUser}
              onDeleteUser={(user: User) => {
                handleDeleteClick(user);
              }}
            />
          ))}
        </div>
      )}

      <UserProfileModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        user={userToDelete}
      />
    </div>
  );
}
