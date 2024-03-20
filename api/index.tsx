import { Button, Frog } from "frog";
import { handle } from "frog/vercel";
import axios from "axios";
import dotenv from "dotenv";
import { pinata } from "frog/hubs";

dotenv.config();
const bearerToken = process.env.BEARER_TOKEN;
const gatewayToken = process.env.GATEWAY_TOKEN;

interface State {
  userInformation?: UserInformation | null;
  matchData?: MatchData | null;
  ipfs: String | null;
}

interface UserInformation {
  data: any;
}

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
    ipfs: "",
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
  const { deriveState, frameData } = c;
  const { fid } = frameData;
  const state = await deriveState(async (previousState) => {
    if (fid) {
      previousState.userInformation = await fetchUserData(fid);
      if (previousState.userInformation?.data.username) {
        previousState.ipfs = await fetchIPFSPinHash(
          previousState.userInformation.data.username
        );
        if (previousState.ipfs) {
          previousState.matchData = await fetchMatchData(previousState.ipfs);
        }
      }
    }
  });

  console.log(state.matchData);
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <p style={{ color: "white" }}>{state.userInformation?.data.username}</p>
        <p style={{ color: "white" }}>{state.ipfs}</p>
        <p style={{ color: "white" }}>{state.matchData?.ucs[60].w}</p>
      </div>
    ),
    intents: [<Button action="/check">Check</Button>],
  });
});

app.frame("/check", (c) => {
  const { previousState } = c;
  console.log(previousState.matchData?.ucs);
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <p style={{ color: "white" }}>{previousState.matchData?.ucs[60].w}</p>
      </div>
    ),
    intents: [<Button>Salut</Button>],
  });
});

async function fetchUserData(fid: string): Promise<UserInformation | null> {
  try {
    const response = await axios.get(
      `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    return response.data; // Retournez les données utilisateur
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchIPFSPinHash(username: any) {
  try {
    const response = await axios.get(
      `https://api.pinata.cloud/data/pinList?metadata[name]=${username}'s choices`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    return response.data.rows[0].ipfs_pin_hash;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchMatchData(ipfsHash: String) {
  try {
    const response = await axios.get(
      `https://framemadness.mypinata.cloud/ipfs/${ipfsHash}?pinataGatewayToken=${gatewayToken}`
    );
    return response.data as MatchData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const GET = handle(app);
export const POST = handle(app);
