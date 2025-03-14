"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserAccordionItem } from "./user-accordion-item";
import { UserProfileModal } from "./user-profile-modal";
import { AddUserModal } from "./add-user-modal";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";

interface User {
  id: string;
  username: string;
  name: string;
  apartment: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string;
}

// Update the mock data to include multiple users with the same username
const initialUsers: User[] = [
  {
    id: "USR12345",
    username: "johndoe",
    name: "John Doe",
    apartment: "A-1203",
    gender: "Male",
    phone: "+84 123 456 789",
    email: "john.doe@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12346",
    username: "janedoe",
    name: "Jane Doe",
    apartment: "B-2104",
    gender: "Female",
    phone: "+84 987 654 321",
    email: "jane.doe@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12347",
    username: "johndoe", // Same username as the first user
    name: "John Smith",
    apartment: "C-3305",
    gender: "Male",
    phone: "+84 555 123 456",
    email: "john.smith@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12348",
    username: "emilyjohnson",
    name: "Emily Johnson",
    apartment: "A-1506",
    gender: "Female",
    phone: "+84 333 789 012",
    email: "emily.johnson@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12349",
    username: "michaelwilson",
    name: "Michael Wilson",
    apartment: "D-4207",
    gender: "Male",
    phone: "+84 777 345 678",
    email: "michael.wilson@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12350",
    username: "johndoe", // Same username as the first user
    name: "Johnny Doe",
    apartment: "A-1204",
    gender: "Male",
    phone: "+84 111 222 333",
    email: "johnny.doe@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR12351",
    username: "janedoe", // Same username as the second user
    name: "Janet Doe",
    apartment: "B-2105",
    gender: "Female",
    phone: "+84 444 555 666",
    email: "janet.doe@example.com",
    photoUrl: "/placeholder.svg?height=40&width=40",
  },
];

export function UsersAccordion() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleAddUser = (newUser: Omit<User, "id" | "photoUrl">) => {
    // In a real app, you would generate a proper ID and handle the photo
    const userWithId: User = {
      ...newUser,
      id: `USR${Math.floor(10000 + Math.random() * 90000)}`,
      photoUrl: "/placeholder.svg?height=40&width=40",
    };

    setUsers([...users, userWithId]);
  };

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

      <div className="space-y-4">
        {Object.entries(usersByUsername).map(([username, usersGroup]) => (
          <UserAccordionItem
            key={username}
            username={username}
            users={usersGroup}
            onViewUser={handleViewUser}
            onDeleteUser={handleDeleteClick}
          />
        ))}
      </div>

      <UserProfileModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
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
