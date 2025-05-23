"use client";

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
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "./fetch";
import { Bounce, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import path from "path";
import { dashboardSchema, DashboardSchema } from "./type";
import { FaceDetect } from "./face-detect";
import { User } from "./users-accordion";
import { Spinner } from "@/components/ui/spinner";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (newUser: User) => void;
  user: string;
}

export function AddUserModal({
  isOpen,
  onClose,
  onUserAdded,
  user,
}: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<DashboardSchema>({
    resolver: zodResolver(dashboardSchema),
    mode: "onChange",
  });

  const [username, fullname, apartment, gender, phone, email] = useWatch({
    control,
    name: ["username", "fullname", "apartment", "gender", "phone", "email"],
  });

  const [formStep, setFormStep] = useState(true);
  const [confirmStep, setConfirmStep] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      reset({ username: user });
    }
  }, [user, reset]);

  const onSubmit = async (form: DashboardSchema) => {
    try {
      const response = await addUser(form);

      if (response.success) {
        setFormStep(false);
        setId(response.id);
      }

      if (!response.success) {
        toast.error(response.message, {
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
      toast.error("Failed to add user", {
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

  const onComfirm = async () => {
    // onClose();
    // setConfirmStep(false);
    // setFormStep(true);

    setLoading(true);

    try {
      // Gọi API zip để tạo file ZIP
      const zipResponse = await fetch(`/api/zip`, { method: "POST" });

      if (!zipResponse.ok) {
        console.error(
          "Error creating ZIP:",
          zipResponse.status,
          await zipResponse.text()
        );
        setLoading(false);
        return;
      }

      // Lấy danh sách file ZIP từ API
      const { zipFiles } = await zipResponse.json();
      if (!zipFiles || zipFiles.length === 0) {
        console.error("No ZIP files created");
        setLoading(false);
        return;
      }

      // Đọc file ZIP từ server
      const zipFilePath = zipFiles[0]; // Lấy file đầu tiên (hoặc lặp qua nếu có nhiều file)
      const zipBlob = await fetch(
        `/api/download?file=${encodeURIComponent(zipFilePath)}`
      ).then((res) => res.blob());
      const zipFile = new File([zipBlob], path.basename(zipFilePath));

      // Chuẩn bị dữ liệu gửi đến API embed
      const formData = new FormData();
      formData.append("file", zipFile);

      // Gửi file ZIP đến API embed
      const embedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/embed?folder_id=${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (embedResponse.ok) {
        // Create new user object with the form data
        const newUser: User = {
          id: id,
          username: username,
          name: fullname,
          apartment: apartment,
          gender: gender,
          phone: phone || "",
          email: email || "",
          photoUrl: "", // You might need to get the actual photo URL from the response
        };

        // Call the callback to update parent component's state
        onUserAdded(newUser);

        reset();

        onClose();
        setConfirmStep(false);
        setFormStep(true);
        setLoading(false);
        toast.success("Add user successfully!", {
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
        reset();

        onClose();
        setConfirmStep(false);
        setFormStep(true);
        setLoading(false);

        toast.error(embedResponse.status, {
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
    } catch (error) {
      reset();

      onClose();
      setConfirmStep(false);
      setFormStep(true);
      setLoading(false);

      toast.error(String(error), {
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

  const ConfirmDialog = () => {
    return (
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
                src={`/data/pics/${id}/main.jpg`}
                alt={fullname || "New User"}
              />
              <AvatarFallback>
                {fullname ? fullname.substring(0, 2).toUpperCase() : "NU"}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-lg font-medium">{fullname || "New User"}</h3>
            <p className="text-sm text-muted-foreground">
              {username || "username"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border rounded-lg p-4 bg-muted/20">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Apartment
              </p>
              <p className="font-medium">{apartment || "--"}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gender
              </p>
              <p className="font-medium capitalize">
                {gender || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="font-medium">{phone || "--"}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{email || "--"}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {loading ? (
            <Button disabled>
              <Spinner />
              Please wait
            </Button>
          ) : (
            <Button className="flex items-center gap-2" onClick={onComfirm}>
              <Check className="h-4 w-4" /> Confirm & Add
            </Button>
          )}
        </DialogFooter>
      </>
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {formStep && (
          <>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details of the new user below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-5">
                  <Label htmlFor="username" className="text-right">
                    Host
                  </Label>
                  <Input
                    id="username"
                    className="col-span-3"
                    {...register("username")}
                    // value={user || ""}
                    disabled={!!user}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-5">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("fullname")}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-5">
                  <Label htmlFor="apartment" className="text-right">
                    Apartment
                  </Label>
                  <Input
                    id="apartment"
                    type="text"
                    {...register("apartment")}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 gap-5 items-center">
                  <Label htmlFor="gender" className="text-right">
                    Gender
                  </Label>
                  <div className="col-span-3">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-5">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    {...register("phone")}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-5">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
        {!formStep && !confirmStep && (
          <FaceDetect id={id} setConfirmStep={setConfirmStep} />
        )}
        {confirmStep && <ConfirmDialog />}
      </DialogContent>
    </Dialog>
  );
}
