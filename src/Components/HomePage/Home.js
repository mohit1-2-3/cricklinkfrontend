import Banner from "./Banner.js";
import ContactUs from "./ContactUs.js";
import Players from "./Player.js"; // Corrected import
import UpcomingEvent from "./UpcomingEvents.js";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import Teams from "./Teams.js";

export default function Home() {
    let [searchedList, setSearchedList] = useState('');
    let [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        console.log('searchedList', searchedList);

        axios.post(url.player.searchByCategory, { searchedList })
            .then(response => {
                let flattedArray = response.data.data;
                console.log("Before", flattedArray);
                flattedArray = flattedArray.map(subCategory => subCategory.players).flat();
                setFilteredData("After", flattedArray);
            })
            .catch(error => {
                console.log(error);
            });
    }, [searchedList]);

    return (
        <>
        {/* <div style={{bg:"white"}}> */}
            <Header setSearchedList={setSearchedList} />
            <div className="d-flex flex-column align-items-center gap-4" style={{background:"linear-gradient (90deg, #002366, #ffffff)"}}>
                {
                    searchedList ?
                        // <Players filteredData={filteredData} /> :
                        <h1>
                            No Record Found
                        </h1>
                        :
                        <>
                            <Banner />
                            <div id="sectionLine"></div>
                            <Players filteredData={[]} />
                            <div id="sectionLine"></div>

                            <h3 className="text-center mb-4"
                                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", color: "#ffffff", textDecoration: "underline", }}>Teams</h3>
                            <Teams />
                            <div id="sectionLine"></div>


                            <h3 className="text-center mb-4"
                                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", color: "#ffffff", textDecoration: "underline", }}>Upcoming Events</h3>
                            <UpcomingEvent />
                            <div id="sectionLine"></div>


                            <ContactUs />
                        </>
                }
                <div id="sectionLine"></div>
                <Footer />
            </div>
           
        </>
    );
}
