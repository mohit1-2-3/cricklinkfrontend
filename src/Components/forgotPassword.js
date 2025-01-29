import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP Verification

  const sendOTP = () => {
    if (!email) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter your email address.',
        icon: 'error',
      });
      return;
    }

    // Replace with your custom API for sending OTP
    axios
      .post('http://localhost:3001/user/sendOTP', { email })
      .then((response) => {
        Swal.fire({
          title: 'Success',
          text: 'OTP sent to your email!',
          icon: 'success',
        });
        setStep(2);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.error || 'Failed to send OTP. Try again.',
          icon: 'error',
        });
      });
  };

  const verifyOTPAndResetPassword = () => {
    if (!otp || !newPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter OTP and new password.',
        icon: 'error',
      });
      return;
    }

    // Replace with your custom API for verifying OTP and resetting password
    axios
      .post('http://localhost:3001/user/updatePassword', {
        email,
        otp,
        newPassword,
      })
      .then((response) => {
        Swal.fire({
          title: 'Success',
          text: 'Password updated successfully!',
          icon: 'success',
        });
        setStep(1); // Reset to initial step
        setEmail('');
        setOtp('');
        setNewPassword('');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.error || 'Failed to update password. Try again.',
          icon: 'error',
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            {step === 1 && (
              <>
                <h2 className="text-center mb-4">Forgot Password</h2>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="emailInput">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailInput"
                    className="form-control"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block w-100"
                  onClick={sendOTP}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-center mb-4">Verify OTP & Reset Password</h2>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="otpInput">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otpInput"
                    className="form-control"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="newPasswordInput">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPasswordInput"
                    className="form-control"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-block w-100"
                  onClick={verifyOTPAndResetPassword}
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
