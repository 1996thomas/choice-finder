import { Button, Frog, TextInput } from "frog";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import axios from "axios";
import dotenv from "dotenv";
import { pinata } from "frog/hubs";

dotenv.config();
const bearerToken = process.env.BEARER_TOKEN;
const gatewayToken = process.env.GATEWAY_TOKEN;

const teamsData = {
  "1": {
    logo: "/east/01_uconn.png",
    name: "Connecticut Huskies",
  },
  "2": {
    logo: "/east/02_stetson.png",
    name: "Stetson Hatters",
  },
  "3": {
    logo: "/east/03_fla-atlantic.png",
    name: "Florida Atlantic Owls",
  },
  "4": {
    logo: "/east/04_northwestern.png",
    name: "Northwestern Wildcats",
  },
  "5": {
    logo: "/east/05_san-diego-st.png",
    name: "San Diego State Aztecs",
  },
  "6": {
    logo: "/east/06_uab.png",
    name: "UAB Blazers",
  },
  "7": {
    logo: "/east/07_auburn.png",
    name: "Auburn Tigers",
  },
  "8": {
    logo: "/east/08_yale.png",
    name: "Yale Bulldogs",
  },
  "9": {
    logo: "/east/09_byu.png",
    name: "Brigham Young Cougars",
  },
  "10": {
    logo: "/east/10_duquesne.png",
    name: "Duquesne Dukes",
  },
  "11": {
    logo: "/east/11_illinois.png",
    name: "Illinois Fighting Illini",
  },

  "12": {
    logo: "/east/12_morehead-st.png",
    name: "Morehead State Eagles",
  },
  "13": {
    logo: "/east/13_washington-st.png",
    name: "Washington State Cougars",
  },
  "14": {
    logo: "/east/14_drake.png",
    name: "Drake Bulldogs",
  },
  "15": {
    logo: "/east/15_iowa-st.png",
    name: "Iowa State Cyclones",
  },
  "16": {
    logo: "/east/16_south-dakota-st.png",
    name: "South Dakota State Jackrabbits",
  },
  "17": {
    logo: "/west/01_north-carolina.png",
    name: "North Carolina Tar Heels",
  },
  "18": {
    logo: "/west/02_west_howard_wagner.png",
    name: " Howard/Wagner",
  },
  "19": {
    logo: "/west/03_mississippi-st.png",
    name: "Mississippi State Bulldogs",
  },
  "20": {
    logo: "/west/04_michigan-st.png",
    name: "Michigan State Spartans",
  },
  "21": {
    logo: "/west/05_st-marys-ca.png",
    name: "Saint Mary's Gaels",
  },
  "22": {
    logo: "/west/06_grand-canyon.png",
    name: "Grand Canyon Antelopes",
  },
  "23": {
    logo: "/west/07_alabama.png",
    name: "Alabama Crimson Tide",
  },
  "24": {
    logo: "/west/08_col-of-charleston.png",
    name: "Charleston Cougars",
  },
  "25": {
    logo: "/west/09_clemson.png",
    name: "Clemson Tigers",
  },
  "26": {
    logo: "/west/10_new-mexico.png",
    name: "New Mexico Lobos",
  },
  "27": {
    logo: "/west/11_baylor.png",
    name: "Baylor Bears",
  },
  "28": {
    logo: "/west/12_colgate.png",
    name: "Colgate Raiders",
  },
  "29": {
    logo: "/west/13_dayton.png",
    name: "Dayton Flyers",
  },
  "30": {
    logo: "/west/14_nevada.png",
    name: "Nevada Wolf Pack",
  },
  "31": {
    logo: "/west/15_arizona.png",
    name: "Arizona Wildcats",
  },
  "32": {
    logo: "/west/16_long-beach-st.png",
    name: "Long Beach State 49ers",
  },
  "33": {
    logo: "/south/01_houston.png",
    name: "Houston Cougars",
  },
  "34": {
    logo: "/south/02_longwood.png",
    name: "Longwood Lancers",
  },
  "35": {
    logo: "/south/03_nebraska.png",
    name: "Nebraska Cornhuskers",
  },
  "36": {
    logo: "/south/04_texas-am.png",
    name: "Texas A&M Aggies",
  },
  "37": {
    logo: "/south/05_wisconsin.png",
    name: "Wisconsin Badgers",
  },
  "38": {
    logo: "/south/06_james-madison.png",
    name: "James Madison Dukes",
  },
  "39": {
    logo: "/south/07_duke.png",
    name: "Duke Blue Devils",
  },
  "40": {
    logo: "/south/08_vermont.png",
    name: "Vermont Catamounts",
  },
  "41": {
    logo: "/south/09_texas-tech.png",
    name: "Texas Tech Red Raiders",
  },
  "42": {
    logo: "/south/10_north-carolina-st.png",
    name: "North Carolina State Wolfpack",
  },
  "43": {
    logo: "/south/11_kentucky.png",
    name: "Kentucky Wildcats",
  },
  "44": {
    logo: "/south/12_oakland.png",
    name: "Oakland Golden Grizzlies",
  },
  "45": {
    logo: "/south/13_florida.png",
    name: "Florida Gators",
  },
  "46": {
    logo: "/south/14_south_colorado_boise-st.png",
    name: "Colorado/Boise St",
  },
  "47": {
    logo: "/south/15_marquette.png",
    name: "Marquette Golden Eagles",
  },
  "48": {
    logo: "/south/16_western-ky.png",
    name: "Western Kentucky Hilltoppers",
  },
  "49": {
    logo: "/midwest/01_purdue.png",
    name: "Purdue Boilermakers",
  },
  "50": {
    logo: "/midwest/02_midewest_grambling_montana-st.png",
    name: "Grambling/Montana St",
  },
  "51": {
    logo: "/midwest/03_utah-st.png",
    name: "Utah State Aggies",
  },
  "52": {
    logo: "/midwest/04_tcu.png",
    name: "TCU Horned Frogs",
  },
  "53": {
    logo: "/midwest/05_gonzaga.png",
    name: "Gonzaga Bulldogs",
  },
  "54": {
    logo: "/midwest/06_mcneese.png",
    name: "Mcneese State Cowboys",
  },
  "55": {
    logo: "/midwest/07_kansas.png",
    name: "Kansas Jayhawks",
  },
  "56": {
    logo: "/midwest/08_samford.png",
    name: "Samford Bulldogs",
  },
  "57": {
    logo: "/midwest/09_south-carolina.png",
    name: "South Carolina Gamecocks",
  },
  "58": {
    logo: "/midwest/10_oregon.png",
    name: "Oregon Ducks",
  },
  "59": {
    logo: "/midwest/11_creighton.png",
    name: "Creighton Bluejays",
  },
  "60": {
    logo: "/midwest/12_akron.png",
    name: "Akron Zips",
  },
  "61": {
    logo: "/midwest/13_texas.png",
    name: "Texas Longhorns",
  },
  "62": {
    logo: "/midwest/14_midwest_colorado-st_virginia.png",
    name: "Colorodo St/Virginia",
  },
  "63": {
    logo: "/midwest/15_tennessee.png",
    name: "Tennessee Volunteers",
  },
  "64": {
    logo: "/midwest/16_st-peters.png",
    name: "Saint Peter's Peacocks",
  },
};
// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

type MatchResult = {
  m: number;
  w: number;
};

type State = {
  matchDataArr: {
    ucs: MatchResult[];
  };
};

const primaryColor = "#0087F7";

const regionColor = {
  south: "#00C1AD",
  midwest: "#FFA901",
  west: "#AB87FF",
  east: "#E54E47",
  final_four: "#0087F7",
  final: "#0087F7",
};

export const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  initialState: {
    matchDataArr: [],
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <p style={{ fontSize: "3rem", color: primaryColor }}>
          Check your choices for March Madness 2024
        </p>
      </div>
    ),
    intents: [<Button action="/check-fid">Check</Button>],
  });
});

app.frame("/check-fid", async (c) => {
  const { deriveState } = c;
  let userData;
  let ipfsHash;
  //@ts-ignore
  let matchData;
  const fid = c.frameData?.fid;
  if (fid) {
    console.log("FID OK");
    try {
      const response = await axios.get(
        `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }
      );
      console.log("userDATA OK");
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
    console.log("IPFS HASH OK");
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

  try {
    const response = await axios.get(
      `https://framemadness.mypinata.cloud/ipfs/${ipfsHash}?pinataGatewayToken=${gatewayToken}`
    );
    console.log("matchDATA OK");
    matchData = response.data;
  } catch (error) {
    console.log(error);
  }
  const state = deriveState((previousState) => {
    //@ts-ignore
    previousState.matchDataArr = matchData;
  });
  console.log("state OK");
  console.log(matchData, "MATCH DATA")
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          paddingTop: "150px",
        }}
      >
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
        <img
          style={{ position: "absolute", top: "55%", left: "42%" }}
          src="/finalfourlogo.png"
          width={200}
          height={200}
          alt=""
        />
        <p
          style={{
            fontSize: "3rem",
            color: primaryColor,
            textAlign: "center",
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Your final bracket
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flex: 1,
            paddingRight: "100px",
          }}
        >
          <img
            src={teamsData[matchData.ucs[60].w].logo}
            alt=""
            width={200}
            height={200}
          />
          <p
            style={
              matchData.ucs[60].w === matchData.ucs[62].w
                ? {
                    color: "green",
                    fontSize: "2rem",
                  }
                : {
                    color: "red",
                    fontSize: "2rem",
                  }
            }
          >
            {
              //@ts-ignore
              teamsData[state.matchDataArr.ucs[60].w].name
            }
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "2rem",
            paddingLeft: "100px",
          }}
        >
          <img
            //@ts-ignore
            src={teamsData[state.matchDataArr.ucs[61].w].logo}
            alt=""
            width={200}
            height={200}
          />
          <p
            style={
              matchData.ucs[61].w === matchData.ucs[62].w
                ? {
                    color: "green",
                    fontSize: "2rem",
                  }
                : {
                    color: "red",
                    fontSize: "2rem",
                  }
            }
          >
            {
              //@ts-ignore
              teamsData[state.matchDataArr.ucs[61].w].name
            }
          </p>
        </div>
        <p
          style={{
            fontSize: "1.5rem",
            color: regionColor.midwest,
            position: "absolute",
            bottom: "1%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          check all your winner by region
        </p>
      </div>
    ),
    intents: [
      <Button action="/east">East</Button>,
      <Button action="/west">West</Button>,
      <Button action="/south">South</Button>,
      <Button action="/midwest">Midwest</Button>,
    ],
  });
});

app.frame("/:regionName", (c) => {
  const regionName = c.req.param("regionName");
  //@ts-ignore
  const color = regionColor[regionName];
  const regionDataMap = {
    east: {
      firstRound: c.previousState.matchDataArr.ucs.slice(0, 8),
      secondRound: c.previousState.matchDataArr.ucs.slice(32, 36),
      sweet: c.previousState.matchDataArr.ucs.slice(48, 50),
      elite: [c.previousState.matchDataArr.ucs[56]],
    },
    west: {
      firstRound: c.previousState.matchDataArr.ucs.slice(8, 16),
      secondRound: c.previousState.matchDataArr.ucs.slice(36, 40),
      sweet: c.previousState.matchDataArr.ucs.slice(50, 52),
      elite: [c.previousState.matchDataArr.ucs[57]],
    },
    south: {
      firstRound: c.previousState.matchDataArr.ucs.slice(16, 24),
      secondRound: c.previousState.matchDataArr.ucs.slice(40, 44),
      sweet: c.previousState.matchDataArr.ucs.slice(52, 54),
      elite: [c.previousState.matchDataArr.ucs[58]],
    },
    midwest: {
      firstRound: c.previousState.matchDataArr.ucs.slice(24, 32),
      secondRound: c.previousState.matchDataArr.ucs.slice(44, 48),
      sweet: c.previousState.matchDataArr.ucs.slice(54, 56),
      elite: [c.previousState.matchDataArr.ucs[59]],
    },
  };
  //@ts-ignore
  const renderRound = (title, matches) => (
    <div style={{ display: "flex", gap: "1.3rem" }}>
      <p style={{ color: "white", fontSize: "2rem", width: "200px" }}>
        {title}
      </p>
      {
        //@ts-ignore
        matches.map((match) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              width={96}
              height={96}
              style={{ border: `4px solid ${color}`, borderRadius: "50%" }}
              //@ts-ignore
              src={teamsData[match.w].logo}
              alt=""
            />
          </div>
        ))
      }
    </div>
  );
  //@ts-ignore
  const regionData = regionDataMap[regionName];

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
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
        <p
          style={{ color: primaryColor, fontSize: "3rem", alignText: "center" }}
        >
          Your picks for {regionName} bracket
        </p>
        {renderRound("1st round", regionData.firstRound)}
        {renderRound("2nd round", regionData.secondRound)}
        {renderRound("Sweet 16", regionData.sweet)}
        {renderRound("Elite 8", regionData.elite)}
      </div>
    ),
    intents: [<Button action="/check-fid">Return</Button>],
  });
});

export const GET = handle(app);
export const POST = handle(app);
