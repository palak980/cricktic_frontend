import React, { useState,useEffect} from "react";
import "../Styles/Ranking.css";
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("batsman");

  const headings = {
    batsman: ['BatsMan-Test Rank', 'BatsMan-ODI Rank', 'BatsMan-T20 Rank'],
    bowlers: ["Bowl Man Test Rank", 'Bowl Man ODI Rank', 'Bowl Man T20 Rank'],
    allRounders: ["All Rounder Man Test Rank", 'All Rounder Bowl Man ODI Rank', 'All Rounder Bowl Man T20 Rank'],
    womenODI: ["Bat Women-ODI Rank","Bowl Women-ODI Rank"],
    womenT20: ["Bowl Women-T20 Rank", "Bat Women-T20 Rank","All Rounder Women Rank"]
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Load batsman data when the component mounts
    handleClick(
      [
        "https://backend-ekms.onrender.com/cricinfo/BatMenTestRanking/",
        "https://backend-ekms.onrender.com/cricinfo/BatMenODIRanking/",
        "https://backend-ekms.onrender.com/cricinfo/BatMenT20Ranking/",
      ],
      "batsman"
    );
  }, []);

  const handleClick = async (urls, category) => {
    setIsLoading(true);
    try {
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const jsons = responses.map((response) => response.data);
      
      if (responses[0].status === 200) {
        console.log("yes");
      } else {
        console.log("No");
      }
      
      const newData = jsons.map((rankings) => {
        const [rankingsKey] = Object.keys(rankings);
        const rankingsData = rankings[rankingsKey];
        if (Array.isArray(rankingsData)) {
          const updatedData = rankingsData.map((player) => {
            if (player.price && typeof player.price === "string") {
              return { ...player, price: player.price.replace(/aeur/g, "") };
            } else {
              return player;
            }
          });
          return {
            upload_video: category,
            value: updatedData,
          };
        } else {
          return { upload_video: category, value: rankingsData };
        }
      });
      
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" id="btn_container">
      <div className="btn_container container d-inline-block">
        <button
           className={`btn btn-info rounded-pill ${currentCategory === "batsman" ? "active" : ""}`}
          onClick={() =>
            handleClick(
              [
                "https://backend-ekms.onrender.com/cricinfo/BatMenTestRanking/",
                "https://backend-ekms.onrender.com/cricinfo/BatMenODIRanking/",
                "https://backend-ekms.onrender.com/cricinfo/BatMenT20Ranking/",
              ],
              "batsman"
            )
          }
        >
          Batsman
        </button>
        <button
          className="btn btn-info rounded-pill"
          onClick={() =>
            handleClick(
              [
                "https://backend-ekms.onrender.com/cricinfo/bowlerMenTestRanking/",
                "https://backend-ekms.onrender.com/cricinfo/bowlerMenODIRanking/",
                "https://backend-ekms.onrender.com/cricinfo/bowlerMenT20Ranking/",
              ],
              "bowlers"
            )
          }
        >
          Bowlers
        </button>
        <button
          className="btn btn-info rounded-pill"
          onClick={() =>
            handleClick(
              [
                "https://backend-ekms.onrender.com/cricinfo/AllrounderMenTestRanking/",
                "https://backend-ekms.onrender.com/cricinfo/AllrounderMenODIRanking/",
                "https://backend-ekms.onrender.com/cricinfo/AllrounderMenT20Ranking/",
              ],
              "allRounders"
            )
          }
        >
          All-rounders
        </button>
        <button
          className="btn btn-info rounded-pill"
          onClick={() =>
            handleClick(
              [
                "https://backend-ekms.onrender.com/cricinfo/BatWoMenODIRanking/",
                "https://backend-ekms.onrender.com/cricinfo/BowlerWoMenODIRanking/",
                "https://backend-ekms.onrender.com/cricinfo/AllrounderWoMenODIRanking/",
              ],
              "womenODI"
            )
          }
        >
          Women-ODI
        </button>
        <button
          className="btn btn-info rounded-pill"
          onClick={() =>
            handleClick(
              [
                "https://backend-ekms.onrender.com/cricinfo/WomenT20Bowler/",
                "https://backend-ekms.onrender.com/cricinfo/WomenT20Bat/",
                "https://backend-ekms.onrender.com/cricinfo/WomenT20Allrounder/",
              ],
              "womenT20"
            )
          }
        >
          Women-T20
        </button>
      </div>

      {isLoading ? (
        <div className="loading"><center><h2 id='h1'>Loading...</h2></center></div>
      ) : (
        <div id="full-rank-container">
          {data.map(({ upload_video, value }, index) => (
            <div key={`ranking-${index}`} className="container">
              {Array.isArray(value) && (
                <div>
                  <h2 className="container bg-none text-left" id="h1">
                    {Array.isArray(headings[upload_video]) && (
                      <span id='h1'>{headings[upload_video][index]}</span>
                    )}
                  </h2>
                  <div className="table-responsive">
                    <table className="table  text-capitalize  table-hover">
                      <thead className="fs-5 text-dark outline-light">
                        <tr>
                          <th>Rank</th>
                          <th>Points</th>
                          <th>Player</th>
                          <th>Surname</th>
                          <th>Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((item, index) => {
                          const parts = item.split(/aeur"| /).filter(Boolean);
                          const [rank, points, player, sur, country] = parts;
                         
                          return (
                            <tr key={index}>
                              <td>{rank}</td>
                              <td>{points}</td>
                              <td>{player}</td>
                              <td>{sur}</td>
                              <td>{country}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
