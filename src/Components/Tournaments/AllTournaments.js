import axios from "axios";
import { useEffect, useState } from "react";
import url from "../../URL/url.js";

export default function AllTournament() {
    const [data, setUpcomingData] = useState([]);
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
        handleSelectUpcoming(); // Call handleSelectUpcoming after allData is set
    }, [allData]); // Trigger effect when allData changes

    const handleSelectUpcoming = () => {
        const currentDate = new Date();
        const filteredData = allData.filter((tournament) => {
            const tournamentApplyDate = new Date(tournament.tournament_apply_date);
            return tournamentApplyDate > currentDate;
        });
        setUpcomingData(filteredData);
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-evenly">
            <div className="row">
                <div className="col-12 d-flex mt-4 justify-content-center align-items-center mt-2">
                    <h2 className="text-decoration-underline">All Tournament</h2>
                </div>
            </div>

            {/* Current Tournament */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2 className="p-4 text-decoration-underline">Current Tournament</h2>
                </div>
                <div className="col-md-11 mx-auto d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
                    <div className="col-md-1 text-top">
                        <h4>Monday</h4>
                        <h5>15</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>Wed 15 2024 - Mon 30 2024</h5>
                        <h2>Ultimate Cricket Tournament</h2>
                        <h6>Venue: 12A Rajmohala, Indore</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula dolor eget nibh tristique, sit amet vestibulum ligula interdum. Donec nec augue justo. Etiam nec velit ac elit vestibulum interdum. Maecenas efficitur, enim ut fermentum ultrices, nulla ipsum ullamcorper sem, vel facilisis ex mi nec velit.</p>
                        <h3>₹ 2500</h3>
                    </div>
                    <div className="col-md-3">
                        <img src="https://marketplace.canva.com/EAFtFmZSh9M/1/0/1131w/canva-black-and-yellow-illustrated-cricket-tournament-flyer-h9hyrBDURVU.jpg" alt="Tournament" className="img-fluid" />
                    </div>
                </div>
            </div>

            <div id="sectionLine" className="mt-5"></div>
            {/* Upcoming Tournament */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <h2 className="p-4 text-decoration-underline">Upcoming Tournament</h2>
                </div>
                <div className="col-md-11 mx-auto d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
                    <div className="col-md-1 text-top">
                        <h4>Mon</h4>
                        <h5>15</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>Wed 15 2024 - Mon 30 2024</h5>
                        <h2>Ultimate Cricket Tournament</h2>
                        <h6>Venue: 12A Rajmohala, Indore</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula dolor eget nibh tristique, sit amet vestibulum ligula interdum. Donec nec augue justo. Etiam nec velit ac elit vestibulum interdum. Maecenas efficitur, enim ut fermentum ultrices, nulla ipsum ullamcorper sem, vel facilisis ex mi nec velit.</p>
                        <h3>₹ 2500</h3>
                    </div>
                    <div className="col-md-3">
                        <img src="https://marketplace.canva.com/EAFtFmZSh9M/1/0/1131w/canva-black-and-yellow-illustrated-cricket-tournament-flyer-h9hyrBDURVU.jpg" alt="Tournament" className="img-fluid" />
                    </div>
                </div>
            </div>

            <div id="sectionLine" className="mt-5"></div>
            {/* Completed Tournament */}
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2 className="p-4 text-decoration-underline">Completed Tournament</h2>
                </div>
                <div className="col-md-11 mx-auto d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center">
                    <div className="col-md-1 text-top">
                        <h4>Mon</h4>
                        <h5>15</h5>
                    </div>
                    <div className="col-md-6">
                        <h5>Wed 15 2024 - Mon 30 2024</h5>
                        <h2>Ultimate Cricket Tournament</h2>
                        <h6>Venue: 12A Rajmohala, Indore</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula dolor eget nibh tristique, sit amet vestibulum ligula interdum. Donec nec augue justo. Etiam nec velit ac elit vestibulum interdum. Maecenas efficitur, enim ut fermentum ultrices, nulla ipsum ullamcorper sem, vel facilisis ex mi nec velit.</p>
                        <h3>₹ 2500</h3>
                    </div>
                    <div className="col-md-3">
                        <img src="https://marketplace.canva.com/EAFtFmZSh9M/1/0/1131w/canva-black-and-yellow-illustrated-cricket-tournament-flyer-h9hyrBDURVU.jpg" alt="Tournament" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}
