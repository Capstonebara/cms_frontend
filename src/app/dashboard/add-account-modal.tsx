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
import { LucideEye, LucideEyeOff } from "lucide-react";
import { accountSchema, AccountSchema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addAccount } from "./fetch";
import { Bounce, toast } from "react-toastify";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (form: AccountSchema) => {
    try {
      const res = await addAccount(form);
      if (res.success) {
        onClose();
        reset();
        toast.success(res.message, {
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
      } else {
        toast.error(res.message, {
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
      toast.error("Fail to add account", {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <DialogDescription>
            Create a new user account. You can add members to this account
            later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                className="col-span-3"
                {...register("username")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                />
                <Button
                  className="absolute right-6"
                  variant="link"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <LucideEyeOff className="h-5 w-5" />
                  ) : (
                    <LucideEye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="rePassword" className="text-left">
                Re-enter Password
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="rePassword"
                  {...register("re_password")}
                />
                <Button
                  className="absolute right-6"
                  variant="link"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <LucideEyeOff className="h-5 w-5" />
                  ) : (
                    <LucideEye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
