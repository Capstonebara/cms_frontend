"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, UserPlus, Lock, Unlock } from "lucide-react";
import { AddAccountModal } from "./add-account-modal";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { deleteAccount, getAllAccounts, updateStatusAccount } from "./fetch";
import { Bounce, toast } from "react-toastify";
import { formatTimestamp } from "@/lib/common";
import { AddUserModal } from "./add-user-modal";
import { Spinner } from "@/components/ui/spinner";

interface Account {
  id: string;
  username: string;
  status: boolean;
  member: number;
  created_time: number;
  last_login: number;
}

export function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>();
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!isAddAccountModalOpen) {
      async function fetchAccounts() {
        try {
          setIsLoading(true);
          const data = await getAllAccounts();
          setAccounts(data);
        } catch (error) {
          console.error("Failed to fetch users", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAccounts();
    }
  }, [isAddAccountModalOpen]);

  if (!accounts) {
    return;
  }

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAccount = async () => {
    if (accountToDelete) {
      try {
        const response = await deleteAccount(accountToDelete.id);
        if (response.success) {
          setAccounts(
            accounts?.filter((account) => account.id !== accountToDelete.id) ||
              []
          );
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
      setAccountToDelete(null);
    }
  };

  const toggleAccountStatus = async (username: string) => {
    console.log(username);
    try {
      const response = await updateStatusAccount(username);
      if (response.success) {
        setAccounts(
          (prevAccounts) =>
            prevAccounts?.map((account) =>
              account.username === username
                ? { ...account, status: !account.status }
                : account
            ) || []
        );

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
      toast.error("Failed to update account status", {
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
  };

  const getStatusBadge = (status: Account["status"]) => {
    if (status) {
      return <Badge className="bg-green-500">Active</Badge>;
    }

    return (
      <Badge variant="outline" className="text-muted-foreground">
        Inactive
      </Badge>
    );
  };

  const handleAddUser = (username: string) => {
    setUser(username);
    setIsAddUserModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Accounts</h2>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => setIsAddAccountModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="rounded-md border px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell className="font-medium">
                    {account.username}
                  </TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                  <TableCell>{account.member}</TableCell>
                  <TableCell>{formatTimestamp(account.created_time)}</TableCell>
                  <TableCell>
                    {account.last_login !== 0
                      ? formatTimestamp(account.last_login)
                      : "--"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Add Member"
                        onClick={() => handleAddUser(account.username)}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={
                          account.status === true
                            ? "Lock Account"
                            : "Unlock Account"
                        }
                        onClick={() => toggleAccountStatus(account.username)}
                      >
                        {account.status === true ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete Account"
                        onClick={() => handleDeleteClick(account)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={() => {}}
        user={user}
      />

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
        user={
          accountToDelete
            ? {
                id: accountToDelete.id,
                name: accountToDelete.username,
                username: accountToDelete.username,
                apartment: "",
                gender: "M",
                phone: "",
                email: "",
                photoUrl: "",
              }
            : null
        }
      />
    </div>
  );
}
