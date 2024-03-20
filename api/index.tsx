import { Button, Frog } from "frog";
import { handle } from "frog/vercel";
import axios from "axios";
import dotenv from "dotenv";
import { pinata } from "frog/hubs";

dotenv.config();
const bearerToken = process.env.BEARER_TOKEN;
const gatewayToken = process.env.GATEWAY_TOKEN;

interface State {
  userInformation: UserInformation;
  matchData: MatchData;
}

interface UserInformation {}

interface MatchData {
  ucs: Array<{
    w: string;
    m: string;
  }>;
}

export const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
  initialState: {
    userInformation: [],
    matchData: [],
  },
    hub: pinata(),
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      ></div>
    ),
    intents: [<Button action="/menu">Enter</Button>],
  });
});

app.frame("/menu", async (c) => {
  const { frameData } = c;
  //@ts-ignore
  const { fid } = frameData;
  let userData: UserInformation;
  let ipfsHash: String;
  let matchData: MatchData;
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
    if (userData && userData !== undefined) {
      try {
        const response = await axios.get(
          `https://api.pinata.cloud/data/pinList?metadata[name]=${userData.data.username}'s choices`,
          {
            headers: { Authorization: `Bearer ${bearerToken}` },
          }
        );
        ipfsHash = response.data.rows[0].ipfs_pin_hash;
      } catch (error) {
        console.log(error);
        return c.res({
          image: (
            <div style={{ display: "flex", height: "100%", width: "100%" }}>
              <img
                src="/background.png"
                width={1200}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                alt=""
              />
              <p style={{ color: "red" }}>
                Oops, we found no IPFS files rattached to your name
              </p>
            </div>
          ),
          intents: [
            <Button action="/">Retry</Button>,
            <Button.Link href="https://warpcast.com/eco/0x4ac9bc11">
              Try it !
            </Button.Link>,
          ],
        });
      }
      if (ipfsHash && ipfsHash !== undefined) {
        try {
          const response = await axios.get(
            `https://framemadness.mypinata.cloud/ipfs/${ipfsHash}?pinataGatewayToken=${gatewayToken}`
          );
          matchData = response.data as MatchData;
          console.log(matchData);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      ></div>
    ),
    intents: [
      <Button action="/check">Check</Button>,
      <Button.Link href="/">Try it</Button.Link>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
