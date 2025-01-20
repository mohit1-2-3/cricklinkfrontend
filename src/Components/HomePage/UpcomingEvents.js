import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvent() {

    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]); // Changed Alldata to allData

    useEffect(() => {
        axios.get(url.tournament.all)
            .then(response => {
                console.log('response.data.Tournaments', response.data);
                setAllData(response.data.Tournaments); // Setting allData here
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        handleSelect(); // Call handleSelect after allData is set
    }, [allData]); // Trigger effect when allData changes

    const handleSelect = () => {
        const currentDate = new Date();
        const filteredData = allData.filter((tournament) => {
            const tournamentApplyDate = new Date(tournament.tournament_apply_date);
            return tournamentApplyDate > currentDate;
        });
        setData(filteredData);
    };

    let navigate = useNavigate();

    return (
        <>
            <div className="container text-center text-decoration-underline" id="tournamentContainer">
                <h1>Upcoming Events</h1>
            </div>
            <div className="container text-white mt-3" id="tournamentContainer">
                {
                    data.map((upcomingData) => (
                        <div className="row" key={upcomingData.tournament_id}>
                            <div className="col-2">
                                <h2>{new Date(upcomingData.tournament_apply_date).toLocaleString("en", { weekday: "short" })}</h2>
                                <h2>{new Date(upcomingData.tournament_apply_date).getDate()}</h2>
                            </div>
                            <div className="col-6">
                                <span>{new Date(upcomingData.tournament_apply_date).toLocaleString("en", { weekday: "short" })} {new Date(upcomingData.tournament_apply_date).getDate()} {new Date(upcomingData.tournament_apply_date).getFullYear()} - {new Date(upcomingData.tournament_end_date).toLocaleString("en", { weekday: "short" })} {new Date(upcomingData.tournament_end_date).getDate()} {new Date(upcomingData.tournament_end_date).getFullYear()}</span>
                                <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/tournament', { state: upcomingData.tournament_id })}>{upcomingData.tournament_name}</h1>
                                <p>{upcomingData.tournament_address}</p>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nostrum laboriosam dolore eaque asperiores veniam maxime velit itaque, maiores optio nulla cupiditate ipsam, tempora nam. Culpa, sit reprehenderit blanditiis rem explicabo nemo a atque deserunt!</p>
                                <h2>&#8377; {upcomingData.tournament_fees}</h2>
                            </div>
                            <div className="col-4">
                                <img src={upcomingData.banner} style={{ cursor: 'pointer' }} onClick={() => navigate('/tournament', { state: upcomingData.tournament_id })} alt="Tournament" width='100%' height='300px'></img>
                            </div>
                            <h1 className="m-4 ps-5"></h1>
                        </div>
                    ))
                }
            </div>
        </>
    );
}