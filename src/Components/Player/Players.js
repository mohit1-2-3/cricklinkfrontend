import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Footer from '../Footer.js';
import url from "../../URL/url.js";

import '../HomePage/homePage.css';

import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux-config/CategorySlice.js";
import { fetchSubCategory } from "../../redux-config/SubCategorySlice.js";

export default () => {
    const [PlayerList, setPlayerList] = useState([]);
    const [filterData, setFilterData] = useState('');
    const { categoryList } = useSelector(store => store.Category);
    const { SubcategoryList } = useSelector(store => store.SubCategory);

    useEffect(() => {
        axios.get(url.player.all)
            .then(response => {
                console.log('response.data.data', response.data.data);
                setPlayerList(response.data.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchSubCategory());
    }, [])

    let navigate = useNavigate();

    // let setFilter = (e) => {
    //     e.preventDefault(); // Prevent form submission
    //     console.log(e.target.name, e.target.value);

    //     axios.post(url.player.search, { searchBy: e.target.name, data: e.target.value })
    //         .then(response => {
    //             console.log(response);
    //             let flattenedArray = response.data.data;
    //             console.log('flattenedArray', flattenedArray);
    //             setFilterData(flattenedArray.flat()); // No need to spread the array if it's already flattened
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    let setFilter = (e) => {
        e.preventDefault(); // Prevent form submission
        console.log(e.target.name, e.target.value);

        axios.post(url.player.search, { searchBy: e.target.name, data: e.target.value })
            .then(response => {
                console.log(response);
                let flattenedArray = response.data.data;
                console.log('flattenedArray', flattenedArray);
                setFilterData(flattenedArray.flat()); // No need to spread the array if it's already flattened

                // Update checked state of checkboxes based on filtered data
                let filteredIds = flattenedArray.map(item => item.category_id || item.subCategory_id); // Assuming IDs are present in the data
                let categoryCheckboxes = document.getElementsByName("category_id");
                let subCategoryCheckboxes = document.getElementsByName("subCategory_id");

                categoryCheckboxes.forEach(checkbox => {
                    checkbox.checked = filteredIds.includes(checkbox.value);
                });

                subCategoryCheckboxes.forEach(checkbox => {
                    checkbox.checked = filteredIds.includes(checkbox.value);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    let playerList = filterData ? filterData : PlayerList;

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-5">
            <div className='text text-center text-decoration-underline' id="playerContainer"> <h2>PLAYERS</h2></div>
            <div className="container-fluid d-flex" style={{ position: 'relative' }}> {/* parent container */}
                {/* Left filter div */}
                <div id='filterArea' className="container-fluid d-flex flex-column align-items-center p-3 mt-5 col-3 rounded" style={{ top: '0', background: '#141414', position: 'sticky', bottom: '0' }}>
                    <h4>Filter</h4>
                    <Accordion style={{ backgroundColor: "#171919", width: "90%" }} defaultExpanded  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                            <Typography className=' text-primary ' style={{ fontSize: "17px", fontWeight: "600" }}>Role</Typography>
                        </AccordionSummary >
                        {
                            categoryList.data?.map((category, index) => {
                                return <>
                                    < AccordionDetails key={index}>
                                        <Typography>
                                            <input className="form-check-input ms-3" id="flexCheckDefault" type="checkbox" value={category.category_id} name="category_id" onClick={(e) => setFilter(e)} />
                                            <label className="form-check-label ms-3" for="flexCheckDefault">{category.role}</label>
                                        </Typography>
                                    </AccordionDetails>
                                </>
                            })
                        }
                    </Accordion>
                    <div className="mt-2" id="sectionLine" ></div>
                    <Accordion className="mt-4" style={{ backgroundColor: "#171919", width: "90%" }} defaultExpanded  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                            <Typography className=' text-primary ' style={{ fontSize: "17px", fontWeight: "600" }}>style</Typography>
                        </AccordionSummary >
                        {
                            SubcategoryList.data?.map((subCategory, index) => {
                                return <>
                                    < AccordionDetails key={index} >
                                        <Typography>
                                            <input className="form-check-input ms-3" id="flexCheckDefault" type="checkbox" value={subCategory.subCategory_id} name="subCategory_id" onClick={(e) => setFilter(e)} />
                                            <label className="form-check-label ms-3" for="flexCheckDefault">{subCategory.style}</label>
                                        </Typography>
                                    </AccordionDetails>
                                </>
                            })
                        }
                    </Accordion>
                    <div className="mt-2" id="sectionLine" ></div>
                    <Accordion className="mt-4" style={{ backgroundColor: "#171919", width: "90%" }} defaultExpanded  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                            <Typography className=' text-primary ' style={{ fontSize: "17px", fontWeight: "600" }}>Height</Typography>
                        </AccordionSummary >
                        <AccordionDetails >
                            <Typography>
                                <input className="form-check-input ms-3" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label ms-3" for="flexCheckDefault">4 - 5 Feet</label>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails >
                            <Typography>
                                <input className="form-check-input ms-3" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label ms-3" for="flexCheckDefault">5 - 6 Feet</label>
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails >
                            <Typography>
                                <input className="form-check-input ms-3" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label ms-3" for="flexCheckDefault">6 - 7 Feet</label>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                {/* Right player card div */}
                <div id='filterArea' className="container-fluid mt-5 col-8 text-center d-flex justify-content-between flex-wrap gap-5">
                    {/* Player cards */}
                    {
                        !playerList.length ? <>
                            <div className="container text-center">
                                <h3>No record found</h3>
                            </div>
                        </> :
                            playerList.map(player => {
                                return <>
                                    <div className='card bg-dark' id='player'>
                                        <img src={player.image} className="card-img-top" style={{ height: '11rem' }} alt='Player' />
                                        <div className="card-body">
                                            <h5 className="card-title text-nowrap " style={{ color: '#ffffff' }}>{(player.first_name.charAt(0).toUpperCase() + player.first_name.slice(1)) || "Unknown"} {player.last_name}</h5>
                                            <p className="card-text fs-6">{player.SubCategory.category.role}</p>
                                            <button className="btn btn-outline-secondary" onClick={() => navigate('/PlayerProfile', { state: player })}>View More</button>
                                        </div>
                                    </div>
                                </>
                            })
                    }
                </div>
            </div>
            <div className="mt-5" id="sectionLine"></div>
            <Footer />
        </div >
    );
}
