import React, { useState, useEffect } from "react";
import axios from 'axios';

function TeamRanking() {
  const [team1HeaderName, setTeam1HeaderName] = useState('');
  const [team2HeaderName, setTeam2HeaderName] = useState('');
  const [team3HeaderName, setTeam3HeaderName] = useState('');
  const [team4HeaderName, setTeam4HeaderName] = useState('');
  const [team5HeaderName, setTeam5HeaderName] = useState('');

  const [team1, setTeam1] = useState([]);
  const [team1Header, setTeam1Header] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team2Header, setTeam2Header] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [team4, setTeam4] = useState([]);
  const [team5, setTeam5] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleTeam = () => {
    setIsLoading(true);

    const t1 = axios.get('https://65.1.75.185/cricinfo/WomenT20Teams/');
    const t2 = axios.get('https://65.1.75.185/cricinfo/WomenODITeams/');
    const t3 = axios.get('https://65.1.75.185/cricinfo/MenTeamsTestRanking/');
    const t4 = axios.get('https://65.1.75.185/cricinfo/MenODITeamsRanking/');
    const t5 = axios.get('https://65.1.75.185/cricinfo/MenT20TeamsRanking/');

    axios.all([t1, t2, t3, t4, t5])
      .then(axios.spread((t11, t22, t33, t44, t55) => {
        // Team 1 ranking Data
        console.log(t11)
        setTeam1(t11.data.data);
        setTeam1HeaderName(t11.statusText === "OK" ? 'Women T20 Teams Rank ' : 'Failed');

        // Team 2 ranking Data

        setTeam2(t22.data.data);

        setTeam2HeaderName(t22.statusText === "OK" ? 'Women ODI Teams Rank' : 'Failed');

        // Team 3 ranking Data
        setTeam3(JSON.parse(t33.data["news from times of india"]));
        setTeam3HeaderName(t33.statusText === "OK" ? 'Man Test Teams Rank' : 'Failed');

        // Team 4 ranking Data
        setTeam4(JSON.parse(t44.data["news from times of india"]));
        setTeam4HeaderName(t44.statusText === "OK" ? 'Man ODI Teams Rank' : 'Failed');

        // Team 5 ranking Data
        setTeam5(JSON.parse(t55.data["news from times of india"]));
        setTeam5HeaderName(t55.statusText === "OK" ? 'Man T20 Teams Rank' : 'Failed');

        setIsLoading(false);
      }))
      .catch((error) => {
        console.log(error.statusText);
        console.error(error);
      });
  };

  useEffect(() => {
    handleTeam();
  }, []); // Dependency array

  return (
    <>
      <div className="container-fluid p-5" id="Team-rank-full-width">
        <div className="row">
          <div className="col-md-10 container">
            <div className="container">
              <center>
                <h2 id="h1">{team1HeaderName}</h2>
              </center>
              {isLoading ? (
                <center>
                  <h2 className="text-center">Please Wait.....</h2>
                </center>
              ) : (
                <div className='container'>
                  <div className='table-responsive'>
                    <table className='table  table-hover'>
                      <thead>
                        {team1.length > 0 && (
                          <tr>
                            {team1[0].map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {Array.isArray(team1) && team1.length > 1 ? (
                          team1.slice(1).map((row, index) => (
                            <tr key={index}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                  </div>

                </div>
              )}


              <center className="mt-5">
                <h2 id="h1">{team2HeaderName}</h2>
              </center>
              {isLoading ? (
                <center>
                  <h2 className="text-center d-none"></h2>
                </center>
              ) : (
                <div className='container'>
                  <div className="table-responsive">
                    <table className='table  table-hover'>
                      <thead>
                        {team2.length > 0 && (
                          <tr>
                            {team2[0].map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {Array.isArray(team2) && team2.length > 1 ? (
                          team2.slice(1).map((row, index) => (
                            <tr key={index}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              <center className="mt-5">
                <h2 id="h1">{team3HeaderName}</h2>
              </center>
              {isLoading ? (
                <center>
                  <h2 className="text-center d-none"></h2>
                </center>
              ) : (
                <table className="table  table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Country</th>
                      <th>Rating</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team3.map((item, index) => {
                      return (
                        <tr key={index} className="my-3">
                          <td>{item.Rank}</td>
                          <td>{item.Country}</td>
                          <td>{item.Rating}</td>
                          <td>{item.Points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              <center className="mt-5">
                <h2 id="h1">{team4HeaderName}</h2>
              </center>
              {isLoading ? (
                <center>
                  <h2 className="text-center d-none"></h2>
                </center>
              ) : (
                <table className="table  table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Country</th>
                      <th>Rating</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team4.map((item, index) => {
                      return (
                        <tr key={index} className="my-3">
                          <td>{item.Rank}</td>
                          <td>{item.Country}</td>
                          <td>{item.Rating}</td>
                          <td>{item.Points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              <center className="mt-5">
                <h2 id="h1">{team5HeaderName}</h2>
              </center>
              {isLoading ? (
                <center>
                  <h2 className="text-center d-none"></h2>
                </center>
              ) : (
                <table className="table  table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Country</th>
                      <th>Rating</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team5.map((item, index) => {
                      return (
                        <tr key={index} className="my-3">
                          <td>{item.Rank}</td>
                          <td>{item.Country}</td>
                          <td>{item.Rating}</td>
                          <td>{item.Points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamRanking;
