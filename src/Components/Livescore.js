import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Livescore() {
    const [scoreData, setScoreData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        handleLivescore();
        const interval = setInterval(() => {
            handleLivescore();
        }, 30000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleLivescore = () => {
        axios
            .get('https://backend-ekms.onrender.com/cricinfo/Live_Interntonal/')
            .then(response => {
                console.log(response.data);
                setScoreData(response.data);
                setIsLoading(false); // Set isLoading to false when data is fetched
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false); // Set isLoading to false on error as well
            });
    };

    const ScoreCard = ({ score, index }) => {
        const country1 = score.live[`teams&run`][index * 2] || '';
        const country2 = score.live[`teams&run`][index * 2 + 1] || '';

        const img1 = score.live.img[index * 2] || '';
        const img2 = score.live.img[index * 2 + 1] || '';

        const result1 = score.live.result[index * 2] || '';
        const result2 = score.live.result[index * 2 + 1] || '';

        // Stop creating the card if both result1 and result2 are null
        if (!result1 && !result2) {
            return null;
        }

        return (
           
            <div className="col-sm-1 col-md-2 col-lg-4 my-3">
                <Link to='/scorecard' className="text-decoration-none">
                    <div className="card h-100 " key={index}>
                        <div className="card-body" id='AdminEmp'>
                            <h6 className="card-title" id='h1'>{score.live.overview[index]}</h6> <hr />
                            <div className='d-flex justify-content-between align-items-center '>
                                <span><img src={img1} className="img-fluid img-thumbnail" alt="Flag" /></span>
                                <span className='text-right' id='h1'>{country1}</span>
                            </div>
                            <div className='d-flex justify-content-between align-items-center my-1'>
                                <span><img src={img2} className="img-fluid img-thumbnail" alt="Flag" /></span>
                                <span className='text-right' id='h1'>{country2}</span>
                            </div>
                            <p className="card-text text-center text-success bg-dark rounded p-2 d-none">{result1}</p>
                            {result2 && <p className="card-text text-center text-light rounded p-2 my-1 " style={{backgroundColor:'#5c0380'}}>{result2}</p>}
                        </div>
                    </div>
                </Link>

            </div>
        );
    };

    return (
        <div className="container-fluid py-5" id='AdminEmp'>
            <div className="container">
                {isLoading ? ( // Show loading message while isLoading is true
                    <center><h5 id='h1'>Please wait....</h5></center>
                ) : (
                    scoreData && (
                        <div className="container">
                            <div className="row">
                                {scoreData.live.overview.map((_, index) => (
                                    <ScoreCard score={scoreData} index={index} key={index} />
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Livescore;
