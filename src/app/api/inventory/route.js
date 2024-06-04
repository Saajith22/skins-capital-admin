import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mainURL = req.url.split("/").slice(0, 3).join("/");

  const steamID = searchParams.get("steamID");
  const gameID = searchParams.get("gameID");
  const update = searchParams.get("update") || false;

  if (!steamID || !gameID) return Response.redirect(mainURL);

  const userDetails = {
    steam_id: steamID,
    csgo_inventory: "[]",
    rust_inventory: "[]",
  };

  const games = [
    { name: "csgo", id: "730" },
    { name: "rust", id: "252490" },
  ];

  const game = games.find((g) => g.id === gameID);

  const invRes = await fetch(
    `https://skinscapitalbot1.up.railway.app/inventory?steamID=${steamID}&game=${game.id}`,
    {
      cache: "no-cache",
    }
  );

  const inventory = await invRes.json();

  if (!inventory || !inventory.length) {
    userDetails[`${game.name}_inventory`] = JSON.stringify([]);

    await prisma.users
      .update({
        where: {
          steam_id: userDetails.steam_id,
        },
        data: userDetails,
      })
      .catch((e) => null);

    return Response.json(null);
  }

  userDetails[`${game.name}_inventory`] = JSON.stringify(
    inventory?.map((d) => {
      const { name, market_hash_name, icon_url, appid, classid, assetid } = d;
      // const rarity =
      //   tags.find((t) => t.category === "Rarity")?.internal_name ||
      //   name_color;

      const final = {
        appid,
        classid,
        name,
        market_name: market_hash_name,
        image: icon_url,
        assetid,
      };

      if (game.name === "rust") {
        final.color = d.name_color.toUpperCase();
        final.text_color = d.background_color.toUpperCase();
      }
      return final;
    })
  );

  if (update)
    await prisma.users.update({
      where: {
        steam_id: userDetails.steam_id,
      },
      data: userDetails,
    });

  return Response.json(userDetails[`${game.name}_inventory`]);
}
