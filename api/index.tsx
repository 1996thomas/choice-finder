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
    intents: [<Button action="/check">Check</Button>],
  });
});

app.frame("/check", (c) => {
    console.log(c)
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
    intents: [<Button action="/coucou">Check</Button>],
  });
});

export const GET = handle(app);
export const POST = handle(app);
