import axios from "axios";
import { useEffect, useState } from "react";
import url from "../../URL/url.js";
import Footer from '../Footer.js';

import './team.css'; // Import your CSS file
import { useNavigate } from "react-router-dom";

export default () => {
    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        axios.get(url.team.all)
            .then(response => {
                console.log('response.data', response);
                setTeamList(response.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    let navigate = useNavigate();

    return (
        <div className="container d-flex flex-column align-items-center position-relative">
            <button className="btn btn-secondary btn-lg position-absolute" onClick={() => navigate('/registerTeam', { state: {} })} style={{ right: '0', top: '3rem' }}>Register your team</button>
            <div className='text-center text-decoration-underline mt-5'>
                <h2>TEAMS</h2>
            </div>
            <div className="container text-center d-flex justify-content-around flex-wrap gap-5 mt-5">
                {
                    !teamList.length ?
                        <div className="row text-center">
                            <h4>No record found</h4>
                        </div>
                        : teamList.map((team, index) => (
                            <div key={index} className='mt-4 card col-md-2 col-sm-2 bg-dark' id="teamCard">
                                <img src={team.thumbnail} className="card-img-top" height='200px' alt='TeamImage' />
                                <div className="card-body">
                                    <h5 className="card-title mt-2 text-light">{team.team_name}</h5>
                                    {/* <p className="card-text mt-2">{team.captain_name}</p> */}
                                </div>
                                <button className="btn btn-secondary" onClick={() => navigate('/teamDetails', { state: team })} id="teamViewMore">View More</button>
                            </div>
                        ))
                }
            </div>
            <div className="mt-5" id="sectionLine"></div>
            <Footer />
        </div>
    );
};
