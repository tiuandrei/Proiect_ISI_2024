import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getProfile } from '../../network/api';


export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1>Profile</h1>
                </div>
                <div className="profile-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Group:</strong> {user.group}</p>
                </div>
            </div>
        </div>
    );
}
