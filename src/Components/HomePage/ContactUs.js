import "./homePage.css";
// import TextField from '@mui/material/TextField';

// export default () => {
//     return <>
//         <footer id="contactUs">
//             <div>
//                 <div className="row">
//                     <div className="text-white text-decoration-underline">
//                         <h1 className="text-center">Contact Us</h1>
//                         <div className="row">
//                             <div className="col-md-5 me-5 mt-2 p-5 ">
//                                 <h1>Have questions? Get in touch !</h1>
//                                 <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
//                                 <i className="fa-solid fa-location-dot text-warning">&nbsp;&nbsp;&nbsp;</i>
//                                 <label>709 15h Street, Office Indore </label><br />
//                                 <i className="fa-solid fa-phone  text-warning">&nbsp;&nbsp;&nbsp;</i>
//                                 <label>+91 7865456798 </label><br />
//                                 <i className="fa-regular fa-envelope text-warning ">&nbsp;&nbsp;&nbsp;</i>
//                                 <label>info@gmail.com</label>
//                             </div>
//                             <div className="col-md-6 mt-4 ">
//                                 <form className="">
//                                     <div className="d-flex justify-content-around ">
//                                         <div className=''>
//                                             <i className="fas fa-user mt-1">&nbsp;&nbsp;&nbsp;</i>
//                                             <TextField id="standard-textarea" label="" placeholder="Name :" multiline variant="standard" />
//                                         </div>
//                                         <div>
//                                             <i className="fas fa-envelope ">&nbsp;&nbsp;&nbsp;</i>
//                                             <TextField className='' id="filled-textarea" label="" placeholder="Email :" multiline variant="standard" />
//                                         </div>
//                                     </div>
//                                     <div className=" d-flex justify-content-around mt-4" id="content" >
//                                         <div>
//                                             <i className="fas fa-phone mt-1 ">&nbsp;&nbsp;&nbsp;</i>
//                                             <TextField className='text-white' id="filled-textarea" label="" placeholder=" Phone :" multiline variant="standard" />
//                                         </div>
//                                         <div>
//                                             <i className="fas fa-info-circle mt-1 ml-3">&nbsp;&nbsp;&nbsp;</i>
//                                             <TextField className='text-white' id="filled-textarea" label="" placeholder="Subject :" multiline variant="standard" />
//                                         </div>
//                                     </div>
//                                     <div className="d-flex justify-content-center mt-4">
//                                         <i className="fa-solid fa-pen-to-square">&nbsp;&nbsp;&nbsp;</i>
//                                         <label for="message">How can we help you? Feel free to get in touch</label>
//                                     </div>
//                                     <div className="d-flex justify-content-center mt-4">
//                                         <button type="button" className=" fa-regular fa-comment btn btn-secondary btn-lg " id="box">GET IN TOUCH</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     </>
// }

import * as React from 'react';

export default () => {
    return <>
        <footer className="footer" id="f1">
            <div className="bakround">
                <div className="row">
                    <div className="text-center text-white">
                        <h1>Contact Us</h1>
                        <div className="row ">
                            <div className="col-md-5 me-5 mt-5 p-5 " id="question">
                                <div >
                                    <h1>Have questions? Get in touch !</h1>
                                    <p>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
                                    <i class="fa-solid fa-location-dot text-warning">&nbsp;&nbsp;&nbsp;</i>
                                    <label>709 15h Street, Office Indore </label><br />
                                    <i class="fa-solid fa-phone  text-warning">&nbsp;&nbsp;&nbsp;</i>
                                    <label>+91 7865456798 </label><br />
                                    <i class="fa-regular fa-envelope text-warning ">&nbsp;&nbsp;&nbsp;</i>
                                    <label>info@gmail.com</label>
                                </div>
                            </div>
                            <div className="col-md-6  " id="diteles">
                                <form>
                                    <div className="d-flex justify-content-around gap-4" id="contentt">
                                        <div id="login-box" className='col-md-7ml-4 '>
                                            <div id="user-box">
                                                <i class="fas fa-user mt-1" id="profile">&nbsp;&nbsp;&nbsp;</i>
                                                <input type="text" name=" " placeholder="Name" required=""></input>
                                            </div>
                                        </div>
                                        <div id="login-box" className='col-md-7ml-4 '>
                                            <div id="user-box">
                                                <i id="profile" class="fas fa-envelope ">&nbsp;&nbsp;&nbsp;</i>
                                                <input type="text" name=" " placeholder="Email" required=""></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" d-flex justify-content-around gap-4 mt-4" id="content" >
                                        <div id="login-box" className='col-md-7ml-4 '>
                                            <div id="user-box">
                                                <i id="profile" class="fas fa-phone mt-1 ">&nbsp;&nbsp;&nbsp;</i>
                                                <input type="text" name="" placeholder="Phone" required=""></input>
                                            </div>
                                        </div>
                                        <div id="login-box" className='col-md-7ml-4 '>
                                            <div id="user-box">
                                                <i id="profile" class="fas fa-info-circle mt-1 ml-3">&nbsp;&nbsp;&nbsp;</i>

                                                <input type="text" name=" " placeholder="Subject" required=""></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="justify-content-around mt-4 me-5">
                                        <i class="fa-solid fa-pen-to-square">&nbsp;&nbsp;</i>
                                        <label for="message">How can we help you? Feel free to get in touch</label>
                                    </div>
                                    <div>
                                        <div id="login-box" className='col-md-7ml-4 '>
                                            <div id="user-box">
                                                <input type="text" name=" " placeholder="Help" required=""></input>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-secondary btn-lg " id="box">GET IN TOUCH</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}