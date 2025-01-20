// import React, { useState } from 'react';
// import url from '../../URL/url';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     team_name: '',
//     total_player: 0,
//     no_of_batsman: 0,
//     no_of_bowler: 0,
//     no_of_allrounder: 0,
//     no_of_wicket_keeper: 0,
//     captain_id: sessionStorage.getItem('currentUserId'), // Fixing sessionStorage.getItem
//     thumbnail: 'https://t4.ftcdn.net/jpg/04/09/80/17/240_F_409801747_J4rfgUDys79Bdxm1176Bp3NMj4eLvNT4.jpg'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   function handleClick(iconStatus) {
//     Swal.fire({
//       title: 'Successfully',
//       text: 'Team Registered',
//       icon: iconStatus,
//       // position: 'center',
//       // showConfirmButton: true,
//       timer: 3000
//     });
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // updateRegistration(formData);

//     axios.post(url.team.register, formData)
//       .then(response => {
//         console.log(response.data.data);
//         handleClick('success');
//         navigate(-1);
//       })
//       .catch(error => {
//         handleClick('failed');
//         console.log(error);
//       });
//   };
//   let navigate = useNavigate();

//   return <>
//     <section className="h-100 h-custom" style={{ backgroundColor: '#272929' }}>
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-lg-8 col-xl-6">
//             <div className="card rounded-3">
//               <img
//                 src="https://www.sportphotogallery.com/content/images/cmsfiles/product/38650/39455-list.jpg"
//                 className="w-100 "
//                 style={{ borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem', height: '350px' }}
//               />
//               <div className="card-body p-4 p-md-5 text-center bg-dark text-light">
//                 <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 fw-bold">Registration Info</h3>
//                 <form className="px-md-2" onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="mb-4 gap-4 d-flex">
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">Team Name</label>
//                         <input type="text" className="form-control" name="team_name" onChange={handleChange} />
//                       </div>
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">Total Player</label>
//                         <input type="text" className="form-control" name="total_player" onChange={handleChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="mb-4 gap-4 d-flex">
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">No. of Batsman</label>
//                         <input type="text" className="form-control" name="no_of_batsman" onChange={handleChange} />
//                       </div>
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">No. of Bowler</label>
//                         <input type="text" className="form-control" name="no_of_bowler" onChange={handleChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="mb-4 gap-4 d-flex">
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">No. of Allrounder</label>
//                         <input type="text" className="form-control" name="no_of_allrounder" onChange={handleChange} />
//                       </div>
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">No. of Wicket Keeper</label>
//                         <input type="text" className="form-control" name="no_of_wicket_keeper" onChange={handleChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="mb-4 gap-4 d-flex">
//                       <div data-mdb-input-init className="col-md-6 form-outline datepicker">
//                         <label className="form-label fw-bold">Attach Image</label>
//                         <input type="text" className="form-control" name="thumbnail" onChange={handleChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg mt-3">
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   </>
// };

// export default RegistrationForm;
