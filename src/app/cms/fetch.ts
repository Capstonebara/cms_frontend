"use server";

import { DashboardSchema } from "./type";

export async function getUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users_info`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function addUser(form: DashboardSchema) {
  const formData = {
    username: form.username,
    name: form.fullname,
    apartment_number: form.apartment,
    gender: form.gender,
    phone: form.phone || "",
    email: form.email || "",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    console.log("Error response:", result);
    throw new Error(result.message || "Add user failed");
  }

  return result;
}

export async function deleteUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/delete?resident_id=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}
