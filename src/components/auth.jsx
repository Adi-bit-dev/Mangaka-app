import React, { useState, useEffect } from "react";
import "./authStyles.css";

function Auth() {

    useEffect(() => {
        document.title = "Login - Mangaka (Manual)";
    }, [])

    const [showmessage, setShowmessage] = useState(false); // when either of the input fields is empty
    const [error, setError] = useState(false); // when user is not found in databse

    async function handleLogin() {
        const email = document.getElementById("email").value.trim();
        const pwd = document.getElementById("password").value.trim();

        if (email !== '' && pwd !== '') {
            setShowmessage(false);
            // send to backend
            try {
                const res = await fetch('http://localhost:3000/login-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        pwd
                    })
                });

                const responseData = await res.json();

                if (res.status === 201) {
                    localStorage.setItem('isLoggedin', 'true');
                    window.location.href = '/';
                } else if (res.status === 400) {
                    setError(true);
                } else {
                    console.error("Unexpected response:", responseData);
                    setShowmessage(true);
                }
            } catch (err) {
                console.error("Login failed:", err);
                setShowmessage(true);
            }
        } else {
            setShowmessage(true);
        }
    }

    return (
        <div className="auth-parent">
            <div className="auth-box">
                <div className="auth-one">
                    <div>Login</div>
                </div>

                {showmessage && <div className="conditional-text">Please enter both the fields</div>}
                {error && <div className="conditional-text">Email or password incorrect</div>}

                <div className="auth-two">
                    <div className="auth-frm">
                        <div className="auth-upper">Email</div>
                        <input type="text" placeholder="Enter your email" spellCheck="false" id="email" className="auth-input" />
                    </div>
                    <div className="auth-frm">
                        <div className="auth-upper">Password</div>
                        <input type="password" placeholder="Enter your password" spellCheck="false" id="password" className="auth-input" />
                    </div>
                    <div className="auth-txt">Forgot password?</div>
                </div>
                <div className="auth-three">
                    <button className="auth-login_but" onClick={handleLogin}>Login</button>
                </div>
                <div className="auth-four">
                    <div>Don't have an account?</div>
                    <button className="google-btn">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-logo" />
                        Continue with Google
                    </button>

                </div>
            </div>
        </div>

    );
}
export default Auth;
