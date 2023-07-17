import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/newspopup.css";
import { Link } from 'react-router-dom';



function Scorecard() {
  const [selectedTeam, setSelectedTeam] = useState('team1');
  // Team 1 Hooks
  const [team1head, setTeam1head] = useState('')
  const [batTeam1, setbatTeam1] = useState([])
  const [bat1Team1data, setBat1Team1Data] = useState([])
  const [bowlTeam1, setBowlTeam1] = useState([])
  const [bowl1Team1data, setBowl1Team1Data] = useState([])
  const [partnershipT1, setPartnershipT1] = useState([])
  const [extraT1, setExtraT1] = useState([])
  const [scoreT1, setscoreT1] = useState([])
  const [wicketT1, setWicketT1] = useState([])

  // team2 Hooks

  const [team2head, setTeam2head] = useState('')
  const [batTeam2, setbatTeam2] = useState([])
  const [bat1Team2data, setBat1Team2Data] = useState([])
  const [bowlTeam2, setBowlTeam2] = useState([])
  const [bowl1Team2data, setBowl1Team2Data] = useState([])
  const [partnershipT2, setPartnershipT2] = useState([])
  const [extraT2, setExtraT2] = useState([])
  const [scoreT2, setscoreT2] = useState([])
  const [wicketT2, setWicketT2] = useState([])







  useEffect(() => {

    const getscorecard = () => {

      axios.get("https://backend-ekms.onrender.com/cricinfo/scorecard/")
        .then((response) => {
          console.log(response)
          // console.log(response.data.scoreCard[0].batTeamDetails.batsmenData)
          setBat1Team1Data(Object.values(response.data.scoreCard[0].batTeamDetails.batsmenData))
          setBowl1Team1Data(Object.values(response.data.scoreCard[0].bowlTeamDetails.bowlersData))
          setPartnershipT1(Object.values(response.data.scoreCard[0].partnershipsData))
          setExtraT1(Object.values(response.data.scoreCard[0].extrasData))
          setscoreT1(Object.values(response.data.scoreCard[0].scoreDetails))
          setWicketT1(Object.values(response.data.scoreCard[0].wicketsData))     


          setTeam1head(response.data.matchHeader.status)
          setbatTeam1(Object.values(response.data.scoreCard[0]))
          setBowlTeam1(Object.values(response.data.scoreCard[0]))


          // set value in hooks  team 2

          setBat1Team2Data(Object.values(response.data.scoreCard[1].batTeamDetails.batsmenData))
          setBowl1Team2Data(Object.values(response.data.scoreCard[1].bowlTeamDetails.bowlersData))
          setPartnershipT2(Object.values(response.data.scoreCard[1].partnershipsData))
          setExtraT2(Object.values(response.data.scoreCard[1].extrasData))
          setscoreT2(Object.values(response.data.scoreCard[1].scoreDetails))
          setWicketT2(Object.values(response.data.scoreCard[1].wicketsData))     


          setTeam2head(response.data.matchHeader.status)
          setbatTeam2(Object.values(response.data.scoreCard[1]))
          setBowlTeam2(Object.values(response.data.scoreCard[1]))



        }).catch((error) => {
          console.log(error)
        })

    }
    getscorecard();

  }, [])

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <>
      <div className='container-fluid py-5' id='AdminEmp'>
        <div className='container'>
          <div className="scorecard">
            <div className="team-buttons">
              <button onClick={() => handleTeamClick('team1')} className='btn btn-primary '>Team 1</button>
              <button onClick={() => handleTeamClick('team2')} className='btn btn-primary mx-3'>Team 2</button>
            </div>
            {selectedTeam === 'team1' && (
              <div className="team">
                <div className="team-scorecard">
                  <h3 className='text-success' id='h1'>Result : {team1head}</h3>
                  <h3 id='h1' className='text-left'>{scoreT1[6]}/{scoreT1[7]}&nbsp;({scoreT1[3]})&nbsp; RR:{scoreT1[5]}</h3>
                  <div className="table-responsive border border-secondary py-2 px-3">
                    <div className='container text-left px-3'>
                      {
                        batTeam1.map((item, index) => {
                          return (
                            <>
                              <h3 id='h1'>{item.batTeamName}</h3>
                            </>
                          )
                        })
                      }
                    </div>
                    <table className="table table-striped " id='table'>
                      <thead>
                        <tr>
                          <th>BatsMan Name</th>
                          <th>R</th>
                          <th>4</th>
                          <th>6</th>
                          <th>SR</th>
                          <th>W</th>
                        </tr>
                      </thead >

                      <tbody>
                        {
                          bat1Team1data.map((ele, index) => {
                            return (
                              <tr>
                                <td>{ele.batName}</td>
                                <td>{ele.runs}</td>
                                <td>{ele.fours}</td>
                                <td>{ele.sixes}</td>
                                <td>{ele.strikeRate}</td>
                                <td>{ele.wicketCode}</td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </table>
                  </div>
                  {/* bowlers details  */}
                  <div className=' table-responsive border border-secondary py-2 px-3 my-2' >

                    <div className='container text-left px-3'>
                      {
                        bowlTeam1.map((item, index) => {
                          return (
                            <>
                              <h3 id='h1' >{item.bowlTeamName} </h3>

                            </>
                          )
                        })
                      }
                    </div>
                    <table className="table table-striped " id='table'>
                      <thead>
                        <tr>
                          <th>Bowler Name</th>
                          <th>E</th>
                          <th>O</th>
                          <th>R</th>
                          <th>W</th>
                          <th>Wi</th>
                        </tr>
                      </thead >

                      <tbody>
                        {
                          bowl1Team1data.map((bowl, index) => {
                            return (
                              <tr key={index}>
                                <td>{bowl.bowlName}</td>
                                <td>{bowl.economy}</td>
                                <td>{bowl.overs}</td>
                                <td>{bowl.runs}</td>
                                <td>{bowl.wickets}</td>
                                <td>{bowl.wides}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>

                  </div>


                </div>

                {/* extra run */}
               
                <div className='table-responsive  border border-secondary py-2 px-3'>
                <h3 id='h1'>Extra Run</h3>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>B</th>
                        <th>LB</th>
                        <th>NB</th>
                        <th>P</th>
                        <th>R</th>
                        <th>Wide</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{extraT1[0]}</td>
                        <td>{extraT1[1]}</td>
                        <td>{extraT1[2]}</td>
                        <td>{extraT1[3]}</td>
                        <td>{extraT1[4]}</td>
                        <td>{extraT1[5]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* ParnerShip Data implement */}
                
                <div className='table-responsive  border border-secondary py-2 px-3 my-3 ' >
                <h3 id='h1'>Partnership </h3>
                  <table className='table table-striped ' id='table'>
                    <thead>
                      <tr>
                        <th>Bat 1</th>
                        <th>Bat 2</th>
                        <th>Total Run</th>
                        <th>Total Ball</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partnershipT1.map((partnership, index) => {
                          return (
                            <tr key={index}>
                              <td>{partnership.bat1Name}</td>
                              <td>{partnership.bat2Name}</td>
                              <td>{partnership.totalRuns}</td>
                              <td>{partnership.totalBalls}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>

                  </table>
                </div>



                {/* Wickets Data */}
                <div className='container'>
                  <div>
                    {
                      wicketT1
                        .sort((a, b) => a.wktOver - b.wktOver) // Sort the wickets array based on overs in ascending order
                        .map((wick, index) => (
                          <div key={index} className='border border-secondary p-2 my-1'>
                            <p>Wickets: (Name: {wick.batName}, O: {wick.wktOver}, Run: {wick.wktRuns})</p>
                          </div>
                        ))
                    }

                  </div>

                </div>

              </div>
//  team 2 manage code

            )}
            {selectedTeam === 'team2' && (
              <div className="team">
              <div className="team-scorecard">
                <h3 className='text-success' id='h1'>Result : &nbsp;{team2head}</h3>
                <h3 id='h1' className='text-left'>{scoreT2[6]}/{scoreT2[7]}&nbsp;({scoreT2[3]})&nbsp; RR:{scoreT2[5]}</h3>
                <div className="table-responsive border border-secondary py-2 px-3">
                  <div className='container text-left px-3'>
                    {
                      batTeam2.map((item, index) => {
                        return (
                          <>
                            <h3 id='h1'>{item.batTeamName}</h3>
                          </>
                        )
                      })
                    }
                  </div>
                  <table className="table table-striped " id='table'>
                    <thead>
                      <tr>
                        <th>BatsMan Name</th>
                        <th>R</th>
                        <th>4</th>
                        <th>6</th>
                        <th>SR</th>
                        <th>W</th>
                      </tr>
                    </thead >

                    <tbody>
                      {
                        bat1Team2data.map((ele, index) => {
                          return (
                            <tr>
                              <td>{ele.batName}</td>
                              <td>{ele.runs}</td>
                              <td>{ele.fours}</td>
                              <td>{ele.sixes}</td>
                              <td>{ele.strikeRate}</td>
                              <td>{ele.wicketCode}</td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>
                </div>
                {/* bowlers details  */}
                <div className=' table-responsive border border-secondary py-2 px-3 my-2' >

                  <div className='container text-left px-3'>
                    {
                      bowlTeam2.map((item, index) => {
                        return (
                          <>
                            <h3 id='h1' >{item.bowlTeamName} </h3>

                          </>
                        )
                      })
                    }
                  </div>
                  <table className="table table-striped " id='table'>
                    <thead>
                      <tr>
                        <th>Bowler Name</th>
                        <th>E</th>
                        <th>O</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Wi</th>
                      </tr>
                    </thead >

                    <tbody>
                      {
                        bowl1Team2data.map((bowl, index) => {
                          return (
                            <tr key={index}>
                              <td>{bowl.bowlName}</td>
                              <td>{bowl.economy}</td>
                              <td>{bowl.overs}</td>
                              <td>{bowl.runs}</td>
                              <td>{bowl.wickets}</td>
                              <td>{bowl.wides}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>


              </div>

              {/* extra run */}
             
              <div className='table-responsive  border border-secondary py-2 px-3'>
              <h3 id='h1'>Extra Run</h3>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>B</th>
                      <th>LB</th>
                      <th>NB</th>
                      <th>P</th>
                      <th>R</th>
                      <th>Wide</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{extraT2[1]}</td>
                      <td>{extraT2[0]}</td>
                      <td>{extraT2[2]}</td>
                      <td>{extraT2[3]}</td>
                      <td>{extraT2[4]}</td>
                      <td>{extraT2[5]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* ParnerShip Data implement */}
              
              <div className='table-responsive  border border-secondary py-2 px-3 my-3 ' >
              <h3 id='h1'>Partnership </h3>
                <table className='table table-striped ' id='table'>
                  <thead>
                    <tr>
                      <th>Bat 1</th>
                      <th>Bat 2</th>
                      <th>Total Run</th>
                      <th>Total Ball</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      partnershipT2.map((partnership, index) => {
                        return (
                          <tr key={index}>
                            <td>{partnership.bat1Name}</td>
                            <td>{partnership.bat2Name}</td>
                            <td>{partnership.totalRuns}</td>
                            <td>{partnership.totalBalls}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>

                </table>
              </div>



              {/* Wickets Data */}
              <div className='container'>
                <h3 className='text-left' id='h1'>Wickets:</h3>
                <div>
                  {
                    wicketT2
                      .sort((a, b) => a.wktOver - b.wktOver) // Sort the wickets array based on overs in ascending order
                      .map((wick, index) => (
                        <div key={index} className='border border-secondary p-2 my-1'>
                          <p id='h1'>Wickets: (Name: {wick.batName}, O: {wick.wktOver}, Run: {wick.wktRuns})</p>
                        </div>
                      ))
                  }

                </div>

              </div>
            </div>
            )}
          </div>

        </div>
      </div>

    </>
  )
}

export default Scorecard