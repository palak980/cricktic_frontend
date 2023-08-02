import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Upcoming_Events = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('https://backend-ekms.onrender.com/cricinfo/InternetionalEvent/')
      .then(response => {
        setData(response.data.dict);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      
      <div className='container-fluid py-3' id='AdminEmp'>
        <div className='container my-3'id='AdminEmp'>
        <h1 className='text-center py-3' id='h1'>Match Events</h1>
          {Object.keys(data).length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Event Name & Venue</th>
                  <th>Team</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.date_venue_event.map((event, index) => {
                  // Check if both teams exist before rendering the row
                  if (data.team[index * 2] && data.team[index * 2 + 1]) {
                    return (
                      <tr key={index}>
                        <td>{data.date_venue_event[index * 2]} , {data.date_venue_event[index * 2 + 1]}</td>
                        <td>{data.team[index * 2]} <b className='text-dark'>vs</b> {data.team[index * 2 + 1]}</td>
                        <td>{data.time[index]}</td>
                      </tr>
                    );
                  }
                  // Return null if the data is missing to skip rendering the row
                  return null;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Upcoming_Events;
