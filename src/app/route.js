const allowed = ["164.92.120.155", "5.194.75.18", "146.190.158.54"];

export async function GET(req) {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  console.log(ip, "IP OF USER");
  if (!allowed.includes(ip)) return Response.redirect(`https://google.com`);

  const url = req.url.split("/").slice(0, 3).join("/");
  return Response.redirect(`${url}/dashboard`);
}
