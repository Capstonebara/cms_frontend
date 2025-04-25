"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { changePasswordSchema, ChangePasswordSchema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePassword } from "./fetch";
import { Bounce, toast } from "react-toastify";

interface ChangePasswordModalProps {
  user: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  user,
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({ username: user });
    }
  }, [user, reset]);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (form: ChangePasswordSchema) => {
    try {
      const res = await changePassword(form.username, form.new_password);
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
      toast.error("Fail to change password !", {
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
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Change password for the account !
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
                disabled={!!user}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="new_password" className="text-left">
                New Password
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="rePassword"
                  {...register("new_password")}
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
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
