"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Check } from "lucide-react";

interface User {
  username: string;
  name: string;
  apartment: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser?: (user: Omit<User, "photoUrl">) => void;
}

export function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
}: AddUserModalProps) {
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    apartment: "",
    gender: "",
    phone: "",
    email: "",
    photoUrl: "/placeholder.svg?height=100&width=100",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleNext = () => {
    // In a real app, you would validate the form here
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // In a real app, you would submit the data to your backend here
    if (onAddUser) {
      const { photoUrl, ...userData } = formData;
      onAddUser(userData);
    }

    // Reset form and close modal
    setFormData({
      username: "",
      name: "",
      apartment: "",
      gender: "",
      phone: "",
      email: "",
      photoUrl: "/placeholder.svg?height=100&width=100",
    });
    setStep(1);
    onClose();
  };

  const handleModalClose = () => {
    // Reset form when modal is closed
    setFormData({
      username: "",
      name: "",
      apartment: "",
      gender: "",
      phone: "",
      email: "",
      photoUrl: "/placeholder.svg?height=100&width=100",
    });
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details of the new user below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apartment" className="text-right">
                  Apartment
                </Label>
                <Input
                  id="apartment"
                  className="col-span-3"
                  value={formData.apartment}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="gender" className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button onClick={handleNext}>Review Information</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm User Information</DialogTitle>
              <DialogDescription>
                Please review the information before adding the user.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={formData.photoUrl}
                    alt={formData.name || "New User"}
                  />
                  <AvatarFallback>
                    {formData.name
                      ? formData.name.substring(0, 2).toUpperCase()
                      : "NU"}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-lg font-medium">
                  {formData.name || "New User"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formData.username || "username"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border rounded-lg p-4 bg-muted/20">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Apartment
                  </p>
                  <p className="font-medium">
                    {formData.apartment || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Gender
                  </p>
                  <p className="font-medium capitalize">
                    {formData.gender || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="font-medium">
                    {formData.phone || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="font-medium">
                    {formData.email || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Edit
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" /> Confirm & Add
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
