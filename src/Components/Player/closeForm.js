import React, { useState } from 'react';
import UpdateProfileForm from './UpdateProfileForm'; // UpdateProfileForm ko import karein

const ParentComponent = () => {
    const [showForm, setShowForm] = useState(false);

    // Close form function
    const closeForm = (value) => {
        setShowForm(value);
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Update Profile</button>

            {showForm && <UpdateProfileForm closeForm={closeForm} />}
        </div>
    );
};

export default ParentComponent;
