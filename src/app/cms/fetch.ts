"use server";

import { AccountSchema, DashboardSchema } from "./type";

export async function getUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/residents_info`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/admin/create_resident`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/admin/delete_resident?resident_id=${userId}`,
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

export async function addAccount(form: AccountSchema) {
  const formData = {
    user: form.username,
    password: form.password,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  if (!response.ok) {
    console.log("Error response:", result);
    throw new Error(result.message || "Add account failed");
  }

  return result;
}

export async function getAllAccounts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/all_accounts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function deleteAccount(accountId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/delete_account?account_id=${accountId}`,
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

export async function editUser(form: DashboardSchema, id: string) {
  const formData = {
    username: form.username,
    name: form.fullname,
    apartment_number: form.apartment,
    gender: form.gender,
    phone: form.phone || "",
    email: form.email || "",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/update_resident?resident_id=${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    console.log("Error response:", result);
    throw new Error(result.message || "Edit user failed");
  }

  return result;
}

export async function getLogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/recent_logs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return res.json();
}

export async function getLogsByDay() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/logs_by_day`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return res.json();
}

export async function updateStatusAccount(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/update_account?username=${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return res.json();
}
