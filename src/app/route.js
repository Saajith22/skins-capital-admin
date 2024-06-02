export async function GET(req) {
  console.log("RAN ROUTE MFS");

  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  console.log(ip, "IP MS");

  return Response.redirect("/dashboard");
}
