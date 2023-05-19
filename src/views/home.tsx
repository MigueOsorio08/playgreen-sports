import Axios from "axios";
import React, { useState, useEffect } from "react";
import logOut from '../functions/logout';
// import '../style/home.css';
import styled from 'styled-components';

interface Team {
    idTeam: string;
    strTeamBadge: string;
    strTeam: string;
}

const ThemeSelect = styled.div`
      
   `;

const MainContent = styled.div`
   display: flex;
   align-items:center;
   `;   

function Login(user: any) {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios({
                    url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain"
                });

                setTeams(response.data.teams);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <main className="main">
            <ThemeSelect>
                Theme
                <input type="checkbox" name="theme" id="theme" />
            </ThemeSelect>
            <MainContent className="main-content">
                {teams.map((team) => (
                    <div key={team.idTeam} id={team.idTeam} className="team">
                        <img src={team.strTeamBadge} alt={team.strTeam} className="team-image" />
                        <h3 className="team-name">{team.strTeam}</h3>
                    </div>
                ))}
            </MainContent>
            <section className="navigation">
                <div className="home">Home</div>
                <div className="history">Historial</div>
                <button onClick={logOut}>Logout</button>
            </section>
        </main>
    )
}

export default Login;
