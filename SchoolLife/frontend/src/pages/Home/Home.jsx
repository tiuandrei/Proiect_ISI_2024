import React from 'react';
import './Home.css';
import Illustration from '../homepage.svg'; // Înlocuiește cu calea către SVG-ul tău

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Bine ai venit!</h1>
                <p>Organizează-ți activitățile!</p>
                <img src={Illustration} alt="Welcome Illustration" className="home-illustration" />
            </div>
        </div>
    );
}
