import { cookies } from "next/headers";

const accounts = [
  {
    name: "Admin 1",
    email: "skinscapital@admin.com",
    password: "admin@#1",
  },
];

export async function GET(req) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const email = params.get("email");
  const password = params.get("password");

  const findAccount = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!findAccount) return Response.json("Unknown Account!!");

  const cooks = cookies();
  const co = cooks.set("user", JSON.stringify(findAccount), {
    expires: Date.now() + 60 * 60000,
  });

  console.log(co);
  return Response.json("OK");
}
