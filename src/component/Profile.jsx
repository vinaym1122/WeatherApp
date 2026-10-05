import React, { useEffect, useState } from "react";
import { imgurl, apiUrl, callApi } from "../lib";
import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated");
            setLoading(false);
            return;
        }

        const endpoints = ["user/profile", "users/profile"];

        const tryLoadProfile = (index) => {
            const endpoint = apiUrl(endpoints[index]);

            callApi("GET", endpoint, "", "", (res) => {
                console.log("Profile API response:", res);

                const payload = res && (res.data || res.profile || res);

                if (res && (res.code === 200 || res.success === true) && payload) {
                    setProfile(payload);
                    setLoading(false);
                    return;
                }

                if (index < endpoints.length - 1) {
                    tryLoadProfile(index + 1);
                    return;
                }

                alert(res?.message || "Unable to fetch profile");
                setLoading(false);
            }, token);
        };

        tryLoadProfile(0);
    }, []);


    if (loading) {
        return (
            <div className="profile-container">
                <h2>Loading Profile...</h2>
            </div>
        );
    }


    if (!profile) {
        return (
            <div className="profile-container">
                <h2>Profile Not Available</h2>
            </div>
        );
    }


    return (

        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-title">
                    User Profile
                </h2>


                <div className="profile-photo-section">
                    <img
                        src={
                            profile.photo
                                ? imgurl + profile.photo
                                : "default-profile.png"
                        }
                        alt="Profile"
                        className="profile-photo"
                    />

                </div>


                <div className="profile-details">

                    <div className="profile-row">

                        <span className="profile-label">
                            Full Name
                        </span>

                        <span className="profile-value">
                            {profile.fullname}
                        </span>

                    </div>


                    <div className="profile-row">

                        <span className="profile-label">
                            Mobile Number
                        </span>

                        <span className="profile-value">
                            {profile.mobileno}
                        </span>

                    </div>


                    <div className="profile-row">

                        <span className="profile-label">
                            Email ID
                        </span>

                        <span className="profile-value">
                            {profile.emailid}
                        </span>

                    </div>


                    <div className="profile-row">

                        <span className="profile-label">
                            Role
                        </span>

                        <span className="profile-value role">
                            {profile.role}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;