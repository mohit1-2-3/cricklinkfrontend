// import React, { useState } from 'react';
// import SweetAlert2 from 'react-sweetalert2';

// export default function Swal() {
//     const [swalProps, setSwalProps] = useState({});
//     return (
//         <div>
//             <button onClick={() => {
//                 setSwalProps({
//                     show: true,
//                     title: 'Basic Usage',
//                     text: 'Hello World',

//                 });
//             }}>
//                 Open
//             </button>

//             <SweetAlert2 {...swalProps} />
//         </div>
//     );
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import React from 'react';
import Swal from 'sweetalert2';

export default function test() {

    function handleClick() {
        Swal.fire({
            title: 'Successfully',
            text: 'Team Registered',
            icon: 'success',
            // position: 'center',
            // showConfirmButton: true,
            timer: 3000
        });
    }

    return (
        <button onClick={handleClick} className='text-dark p-2'>
            Open
        </button>
    );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import React, { useState } from 'react';
// import SweetAlert2 from 'react-sweetalert2';

// export default function App() {
//     const [swalProps, setSwalProps] = useState({});

//     function handleClick() {
//         setSwalProps({
//             show: true,
//             title: 'Example',
//             text: 'Hello World',
//         });
//     }

//     return (
//         <div>
//             <button onClick={handleClick} className='btn-dark p-3'>
//                 Alert
//             </button>
//             <SweetAlert2 {...swalProps}
//                 didOpen={() => {
//                     // run when swal is opened...
//                 }}
//                 didClose={() => {
//                     // run when swal is closed...
//                 }}
//                 onConfirm={result => {
//                     // run when clieked in confirm and promise is resolved...
//                 }}
//                 onError={error => {
//                     // run when promise rejected...
//                 }}
//                 onResolve={result => {
//                     // run when promise is resolved...
//                 }}
//             />
//         </div>
//     );
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import React from 'react';
// import { withSwal } from 'react-sweetalert2';

// export default withSwal(({ swal }, ref) => (
//     <button onClick={e => {
//         swal.fire({
//             title: 'Example',
//             text: 'Hello World',
//             didOpen: () => {
//                 // run when swal is opened...
//             },
//             didClose: () => {
//                 // run when swal is closed...
//             }
//         }).then(result => {
//             // when confirmed and promise resolved...
//         }).catch(error => {
//             // when promise rejected...
//         });
//     }}>
//         Show Alert
//     </button>
// ));