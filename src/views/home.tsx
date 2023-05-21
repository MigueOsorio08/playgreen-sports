import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Navigation from './navigation';
import "firebase/database";
import { getDatabase, ref, set } from "firebase/database";


interface Team {
    idTeam: string;
    strTeamBadge: string;
    strTeam: string;
}


const Main = styled.main`
.home{
    height : 100vh;
    position: relative;
    background-color : #181828;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.home.light{
    background-color: #e5e5e5;
}
    .home.light div.theme{
        background-color: white;
        transition: all 0.5s ease-in-out;
    }

    .home.light .team{
        transition: all 0.5s ease-in-out;
       background-color: #181828;
    }

    .home.light .team .options .btn-cancel{
  transition: all 0.5s ease-in-out;
        background: white;
    }
    
    .home.light .team .options .btn-cancel path{
  transition: all 0.5s ease-in-out;
        fill: red;
    }

    .home.light .team .options .btn:hover path{
        fill : red;
    }

    .home.light section {
  transition: all 0.5s ease-in-out;
        background-color: white;
    }

    .home.light section .history-nav:hover,
    .home.light section .logout:hover,
    .home.light section .home-nav{
        background-color: #e5e5e5;
    }
    
    .home.light section .history-nav:hover path,
    .home.light section .logout:hover path,
    .home.light section .home-nav path{
        fill: #1A5BE1;
    }
`;

const ThemeSelect = styled.div`
    position: absolute;
    top: 20px;
    left: 5%;
    cursor: pointer;
    z-index: 10;
    
    div.theme{
        background-color: #2c2b3e;
        backdrop-filter : blur(10px);
        width: 62px;
        height: 63px;
        display: inline-block;
        border-radius: 18px;
        top: 22px;
        left: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
   `;

const MainContent = styled.div`
   display: flex;
   align-items:center;
   
   .team{
       background-color: #e5e5e5;
       width: 100vw;
       height: 500px;
       padding: 57px 20px 30px 19px;
       box-sizing: border-box;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       border-radius: 32px;
       position: relative;
   }

   .team .team-image{
    width: 90%;
    margin: 0 auto;
   }

   .team .team-name{
    color: #fefefe;
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(360deg, #000000 0%, #000000 58.85%, rgba(0,0,0,0) 100%);
    border-radius: 0px 0px 32px 32px;
    margin: 0 -21px -30px -21px;
    padding: 0 21px 30px 21px;
   }

   .team .options{
       position: absolute;
       bottom: -7rem;
       display: flex;
       align-items: center;
       width: inherit;
       justify-content: center;
       margin-left: -21px;
    }

    .team .options .btn{
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 11px;
        cursor: pointer;
    }

    .team .options .btn-cancel{
        width: 51px;
        height: 51px;
        background: #222243;
    }

    .team .options .btn:hover path{
        fill : red;
    }

    .team .options .btn-heart{
        background: linear-gradient(125.02deg, #236bfe -17.11%, #063ba8 98.58%);
        box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
        width: 81px;
        height: 81px;
    }


   @media screen and (min-width: 450px){
    .team{
        width: 450px;
        margin-top: 50px;
    }
   }
   `;

function Home(user: any) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    let [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(
                    "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain"
                );
                setTeams(response.data.teams);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleNext = () => {
        if (currentIndex === teams.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleCancel = (event: any) => {
        let img = teams[currentIndex].strTeamBadge.slice(52, -4)
        const userId = user.user.uid;
        const decision = "cancel";
        const database = getDatabase();
        set(ref(database, `decisions/${userId}/${img}`), decision);
        handleNext();
    }

    const handleLove = (event: any) => {
        let img = teams[currentIndex].strTeamBadge.slice(52, -4)
        const userId = user.user.uid;
        const decision = "like";
        const database = getDatabase();
        set(ref(database, `decisions/${userId}/${img}`), decision);
        handleNext();
    }

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    let themes = theme
    
    const themeClass = theme === "dark" ? "dark" : "light";
    const themeText = theme === "dark" ? "🌤️" : "🌙";
    sessionStorage.setItem("theme", themeClass);
    
    return (
        <Main >
            <div className={"home " + themes}>
                <ThemeSelect>
                    <div onClick={changeTheme} tabIndex={0} className="theme">{themeText}</div>
                </ThemeSelect>
                <MainContent className="main-content">
                    {teams.length > 0 && (
                        <div key={teams[currentIndex].idTeam} id={teams[currentIndex].idTeam} className="team">
                            <img src={teams[currentIndex].strTeamBadge} alt={teams[currentIndex].strTeam} className="team-image" />
                            <h3 className="team-name">{teams[currentIndex].strTeam}</h3>
                            <div className="options">
                                <div id={teams[currentIndex].idTeam} onClick={handleCancel} tabIndex={0} className="btn btn-cancel"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.998921 0.998837C1.59792 0.399837 2.56909 0.399837 3.16809 0.998837L7.86796 5.6987L12.5678 0.998837C13.1668 0.399838 14.138 0.399837 14.737 0.998837C15.336 1.59784 15.336 2.56901 14.737 3.16801L10.0371 7.86787L14.737 12.5677C15.336 13.1667 15.336 14.1379 14.737 14.7369C14.138 15.3359 13.1668 15.3359 12.5678 14.7369L7.86796 10.037L3.16809 14.7369C2.56909 15.3359 1.59792 15.3359 0.998921 14.7369C0.399921 14.1379 0.399921 13.1667 0.998921 12.5677L5.69879 7.86787L0.998921 3.16801C0.399921 2.56901 0.399921 1.59784 0.998921 0.998837Z" fill="white" />
                                </svg></div>
                                <div id={teams[currentIndex].idTeam} onClick={handleLove} tabIndex={0} className="btn btn-heart"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="35" viewBox="0 0 38 35" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26.1913 0.300248C27.3413 0.300248 28.4895 0.462449 29.5812 0.828768C36.3079 3.01574 38.7318 10.3968 36.7071 16.8484C35.5589 20.1452 33.6817 23.1542 31.2232 25.6127C27.704 29.0207 23.8422 32.046 19.6851 34.6522L19.2295 34.9274L18.7556 34.634C14.584 32.046 10.7003 29.0207 7.14824 25.5945C4.70611 23.1359 2.82714 20.1452 1.66075 16.8484C-0.398654 10.3968 2.02525 3.01574 8.82492 0.790496C9.35344 0.608248 9.89836 0.480674 10.4451 0.409597H10.6638C11.1759 0.334875 11.6844 0.300248 12.1947 0.300248H12.3952C13.5433 0.334875 14.655 0.535348 15.7321 0.901667H15.8396C15.9125 0.936294 15.9672 0.974566 16.0037 1.00919C16.4064 1.13859 16.7873 1.28439 17.1518 1.48486L17.8444 1.79468C18.0117 1.88393 18.1996 2.0203 18.3619 2.13816C18.4647 2.21284 18.5574 2.28008 18.628 2.3232C18.6578 2.34075 18.688 2.3584 18.7185 2.37619C18.8748 2.46741 19.0375 2.56242 19.1748 2.66765C21.1996 1.12036 23.6581 0.282023 26.1913 0.300248ZM31.0389 13.4226C31.7861 13.4026 32.424 12.803 32.4787 12.0357V11.8188C32.5333 9.26553 30.9861 6.9528 28.6332 6.05979C27.886 5.80282 27.0659 6.20558 26.7925 6.97103C26.5374 7.73647 26.9383 8.57481 27.7038 8.84636C28.872 9.28375 29.6538 10.4337 29.6538 11.7077V11.7642C29.6192 12.1815 29.745 12.5843 30.0001 12.8941C30.2552 13.2039 30.638 13.3843 31.0389 13.4226Z" fill="white" />
                                </svg></div>
                            </div>
                        </div>
                    )}
                </MainContent>
                <Navigation></Navigation>
            </div>
        </Main>
    )
};


export default Home;