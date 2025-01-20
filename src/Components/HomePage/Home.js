// import About from "./About.js";
// import Banner from "./Banner.js";
// import ContactUs from "./ContactUs.js";
// import Players from "./Player.js";
// import UpcomingEvent from "./UpcomingEvents.js";
// import Header from '../Header.js';
// import Footer from '../Footer.js';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import url from "../../URL/url.js";

// export default function Home() {
//     let [searchedList, setSearchedList] = useState('');
//     let [filteredData, setFilteredData] = useState([]);

//     useEffect(() => {
//         axios.post(url.player.searchByCategory, { searchedList })
//             .then(response => {
//                 console.log(response.data.data);
//                 setFilteredData(response.data.data)
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, [searchedList]);

//     return <>
//         <Header setSearchedList={setSearchedList} />
//         {
//             searchedList ?
//                 <>
//                     <Players filteredData={filteredData} />
//                 </>
//                 :
//                 < div className="d-flex flex-column align-items-center gap-4">
//                     <Banner />
//                     <div id="sectionLine"></div>
//                     <Players filteredData={[]} />
//                     <div id="sectionLine"></div>
//                     <UpcomingEvent />
//                     <div id="sectionLine"></div>
//                     <About />
//                     <div id="sectionLine"></div>
//                     <ContactUs />
//                     <div id="sectionLine"></div>
//                 </div >
//         }
//         <Footer />
//     </>
// }

// // https://cricket.sportmonks.com/api/v2.0/players?api_token=PinCoryvGKxL0aaJdX8Z0zPKRxWYF1okRObrLL0dEO1XiaHSy9tMVgv2Dgh5

import Banner from "./Banner.js";
import ContactUs from "./ContactUs.js";
import Players from "./Player.js"; // Corrected import
import UpcomingEvent from "./UpcomingEvents.js";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";

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
            <Header setSearchedList={setSearchedList} />
            <div className="d-flex flex-column align-items-center gap-4">
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
