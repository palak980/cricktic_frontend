import React, { useState, useEffect } from 'react';
import "../Styles/Upcoming_events.css";
function App() {
  const [upload_video, setupload_video] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    upload_videos();
  }, []);

  const upload_videos = async () => {
    const response = await fetch('https://cricktic.in/cricinfo/InternetionalEvent/');
    const data = await response.json();
    setupload_video(Array.isArray(data) ? data : [data]);
    setIsLoading(false);
  };

  const renderupload_videos = () => {
    return upload_video.map((data, i) => {
      return (
        <div classupload_video="event-list" key={i} className='container'>
          <h4>{data.upload_video}</h4> <hr />
          <table classupload_video="event-details" className='table-hover table table-responsive table-bordered'>
            <thead className='text-danger fs-5 '>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Match Type</th>
                <th>Team</th>
                <th>Vanue</th>
              </tr>
            </thead>

            <tbody className='font-weight-200 text-sm-start'>
              {data.date_time_event.map((event, index) => {
                const istIndex = event.indexOf("IST");
                const dateTime = event.substring(0, istIndex - 1).trim();
                const time = dateTime.split(",")[2].trim();
                const matches = event.substring(istIndex + 3).trim();
                // const eventupload_video = data.team[index] + " " + data.venue[index];

                return (
                  <tr key={index} className="font-weight-200 text-sm-start">
                    <td>{dateTime.split(",")[1].trim()}</td>
                    <td>{time}</td>
                    <td>{matches}</td>
                    <td>{data.team[index].replace(/      /g, ' VS ')}</td>
                    <td>{data.venue[index]}</td>
                    {/* <td>{eventupload_video}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };


  return (
    <div id="UpcomingEvents">
      <h1 id="h1">Upcoming Events And Schedules</h1>
      {isLoading ? (
        <h3 className='text-center' id='h1'>Please Wait...</h3>
      ) : (
        <ol className="ab">{renderupload_videos()}</ol>
      )}
    </div>
  );
}

export default App;

