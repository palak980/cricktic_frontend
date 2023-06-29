import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import "../Styles/header.css";
import { Link } from 'react-router-dom'

function Navbar() {
  const [theme, setTheme] = useState("light-theme")

  const handleLiaghtDarkMode = () => {
    if(theme==="dark-theme")
    {
      setTheme("light-theme")
    }else{
      setTheme("dark-theme")
    }
  }

  useEffect(() => {
    document.body.className=theme;  

  }, [theme])



  const navRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light sticky-top  header1">
        <div class="container-fluid" id='container-fluid'>
          <Link class="navbar-brand" to="/"><img src="./logo.png" classupload_video="App-logo" alt="logo" className="logo" /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">


              <li class="nav-item" id="languageHindi">
                <div className="dropdown english ">
                  <button className="btn btn-outline-none dropdown-toggle text-light " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    English
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/">Hindi</Link>
                  </div>
                </div>
              </li>
            </ul>

            <form class="d-flex form ">
            <i class="fa-solid fa-sun fa-spin fa-2xl mx-5" id='icon' onClick={handleLiaghtDarkMode} style={{color: '#d8dfee',cursor:'pointer'}}></i>
            <Link to='/login'> <button className="btn btn-secondary Sign_Btn">Sign In</button></Link>
            </form>
          </div>
        </div>
      </nav>

      <header className="container-fluid Navbar active d-flex justify-content-start header2   " >
        <nav ref={navRef} className="nav " >
          <Link to="/home" className="active nav_link"><i class="fa-solid fa-house text-primary mx-1"></i>Home</Link>
          <Link to="/livescore" className="active nav_link"><i className="fa-solid fa-circle-dot text-success mx-1"></i>Livescore</Link>
          <Link to="/upcoming_events" className="active nav_link"> <i class="fa-solid fa-calendar-days mx-1 text-info"></i>Upcoming Events</Link>
          <Link to="/manualNewsGet" className="active nav_link"><i class="fa-regular fa-newspaper text-danger mx-1"></i>News</Link>

          <Link to="/ranking" className="active nav_link"><i class="fa-solid fa-arrow-up-right-dots mx-1 text-success"></i>Ranking</Link>
          <Link to="/aboutUs" className="active nav_link"><i class="fa-solid fa-circle-question mx-1 text-danger"></i>About Us</Link>
          <Link to="/teamRanking" className="active nav_link"><i class="fa-solid fa-arrow-up-right-dots mx-1 text-primary"></i>Team Ranking</Link>
          <Link to="/trandingTweet" className="active nav_link"><i class="fa-brands fa-twitter mx-1 text-info"></i>Trending Tweet</Link>
         


          {isMobile && (
            <button classupload_video="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          )}

        </nav>

        {isMobile && (
          <button className="my-5" classupload_video="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        )}

      </header>

    </>
  );
}

export default Navbar;
