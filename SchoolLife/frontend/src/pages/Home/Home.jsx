import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LeftImage from './left-image (2).svg';
import RightImage from './right-image.svg';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-illustration-left">
                    <img src={LeftImage} alt="Left Illustration" />
                </div>
                <div className="home-text">
                    <h1>Aplicația ta pentru organizare și socializare în grupă</h1>
                    <p>
                        Aplicația noastră facilitează organizarea și socializarea studenților din cadrul unei grupe, cu un calendar sincronizat, sistem de anunțuri și hărți interactive.
                    </p>
                    <button
                        className="cta-button"
                        onClick={() => navigate('/about')}
                    >
                        Descoperă mai multe
                    </button>
                </div>
                <div className="home-illustration-right">
                    <img src={RightImage} alt="Right Illustration" />
                </div>
            </div>
        </div>
    );
}
