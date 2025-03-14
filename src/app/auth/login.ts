"use server";

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const user = process.env.NEXT_PUBLIC_USERNAME;
  const pwd = process.env.NEXT_PUBLIC_PASSWORD;

  if (data.username === user && data.password === pwd) {
    return {
      success: true,
      message: "Login successfully",
    };
  }

  return {
    success: false,
    message: "Incorrect username or password",
  };
};
