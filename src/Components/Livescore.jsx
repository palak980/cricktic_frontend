import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageNotFound from './PageNotFound'

function Livescore() {
  const [scoreData, setScoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("Livescore")
    window.scrollTo(0, 0);    
      // axios.get('https://liveupcomingpro-production-f9ac.up.railway.app/cricinfo/Live_Interntonal/')
      axios.get('https://cricktic.in/cricinfo/Live_Interntonal/')
        .then(response => {
          //console.log(response.data);
          setScoreData(response.data);
          setIsLoading(false); // Set isLoading to false when data is fetched
        })
        .catch(error => {
          //console.log(error);
          setIsLoading(false); // Set isLoading to false on error as well
        });
  
  }, []);

  const ScoreCard = ({ score, index }) => {
    const country1 = score.live[`teams&run`][index * 2] || '';
    const country2 = score.live[`teams&run`][index * 2 + 1] || '';


    return (
      <div className="col-sm-12 col-md-6 col-lg-4 my-3">
        <Link to='/scorecard' className="text-decoration-none">
          <div className="card h-100 " key={index} style={{height:'60px'}}>
            <div className="card-body d-flex flex-column" id="AdminEmp">
              <p className="card-title" style={{fontSize:'15px',fontWeight:'500'}} id='h1' >{score.live.overview[index]}</p>
               <span className="text-right" id='h1' style={{fontSize:'13px'}} >{score.live.date[index]}</span> <hr />
              <div className='d-flex justify-content-between align-items-center '>
                {/* <span><img src={img1} className="img-fluid img-thumbnail" alt="Flag" /></span> */}
                <b><span className='text-right ' id='livescoreScoreText' style={{fontSize:'13px' }} >{country1}</span></b>
              </div>
              <div className='d-flex justify-content-between align-items-center my-1'>
                {/* <span><img src={img2} className="img-fluid img-thumbnail" alt="Flag" /></span> */}
                <b><span className='text-right' id='livescoreScoreText' style={{fontSize:'13px' }}>{country2}</span></b>
              </div>
              <div className="mt-auto"> {/* This will push the result data to the bottom */}
                <p className="card-text text-center text-light rounded p-2 my-3" style={{ backgroundColor: "#321c60" }}>
                  {score.live.result[index]}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="container-fluid py-5 mt-3" id='AdminEmp'>
      <div className="container">
        {isLoading ? (
          // Show loading message while isLoading is true
          <center><h5 id='h1'>Please wait....</h5></center>
        ) : (
          scoreData && scoreData.live.overview.length > 0 ? (
            <div className="container">
              <div className="row">
                {scoreData.live.overview.map((_, index) => (
                  <ScoreCard score={scoreData} index={index} key={index} />
                ))}
              </div>
            </div>
          ) : (
            // Show a message when no data is present
            <center><h5 id='h1'> <PageNotFound /> </h5></center>
          )
        )}
      </div>
    </div>
  );
}

export default Livescore;
