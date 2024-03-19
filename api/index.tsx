import { Button, Frog, TextInput } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import axios from "axios";
import dotenv from "dotenv";
import { pinata } from "frog/hubs";

dotenv.config();
const bearerToken = process.env.BEARER_TOKEN;
const gatewayToken = process.env.GATEWAY_TOKEN;

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  hub: pinata(),
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div style={{ display: "flex" }}>
        <p style={{ color: "white" }}>Salut</p>
      </div>
    ),
    intents: [<Button action="/check-fid">Check</Button>],
  });
});

app.frame("/check-fid", async (c) => {
  let userData;
  let ipfsHash;
  const fid = c.frameData?.fid;
  if (fid) {
    try {
      const response = await axios.get(
        `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }
      );
      userData = response.data;
    } catch (error) {
      console.error(error);
      return c.res({
        image: (
          <div style={{ display: "flex" }}>
            <p style={{ color: "red" }}>Erreur lors de la requête</p>
          </div>
        ),
      });
    }
  }

  try {
    const response = await axios.get(
      `https://api.pinata.cloud/data/pinList?metadata[name]=${userData.data.username}'s choices`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    ipfsHash = response.data.rows[0].ipfs_pin_hash;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await axios.get(
      `https://framemadness.mypinata.cloud/ipfs/${ipfsHash}?pinataGatewayToken=${gatewayToken}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

  return c.res({
    image: (
      <div style={{ display: "flex" }}>
        <p style={{ color: "red" }}>coucou</p>
      </div>
    ),
  });
});

export const GET = handle(app);
export const POST = handle(app);
