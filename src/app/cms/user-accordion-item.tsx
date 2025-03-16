"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { User } from "./users-accordion";

interface UserAccordionItemProps {
  username: string;
  users: User[];
  onViewUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onEditUser: (user: User) => void;
}

export function UserAccordionItem({
  username,
  users,
  onViewUser,
  onDeleteUser,
  onEditUser,
}: UserAccordionItemProps) {
  // Use the first user for the accordion header
  const firstUser = users[0];

  return (
    <Accordion type="single" collapsible className="border rounded-md">
      <AccordionItem value={username} className="border-none">
        <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={firstUser.photoUrl} alt={firstUser.name} />
              <AvatarFallback>
                {firstUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{username}</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({users.length} {users.length === 1 ? "member" : "members"})
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-2 px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Apartment</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.apartment}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewUser(user)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit Account"
                        onClick={() => {
                          onEditUser(user);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteUser(user)}
                        title="Remove User"
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
