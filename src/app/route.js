const allowed = [
  "77.101.93.28",
  "5.194.75.18",
  "86.40.242.171",
  "99.99.66.240",
  "217.132.132.127",
  "192.168.1.12",
  "2.49.102.39",
  "::1",
];

export async function GET(req) {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  console.log(ip, "IP OF USER");

  if (!allowed.includes(ip))
    return Response.json("UNKNOWN SITE. DANGER!", {
      status: 404,
    });

  const url = req.url.split("/").slice(0, 3).join("/");
  return Response.redirect(`${url}/dashboard`);
}
