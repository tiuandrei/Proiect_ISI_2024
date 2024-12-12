import React from 'react';
import './About.css';
import Illustration from '../about.svg';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>Despre Aplicație</h1>
                <p className="subtitle">Soluția ta completă pentru organizarea unei grupe de studenți</p>
            </div>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Aplicația noastră este special creată pentru a simplifica viața studenților.
                        Cu ajutorul acesteia, poți:
                    </p>
                    <ul>
                        <li>Gestiona conturile și informațiile colegilor din grupă.</li>
                        <li>Accesa rapid anunțuri importante și sistemul de vot.</li>
                        <li>Consulta un calendar sincronizat pentru întreaga grupă.</li>
                        <li>Organiza ieșiri în oraș cu locații disponibile pe o hartă interactivă.</li>
                        <li>Bucura-te de actualizări automate cu anunțuri relevante.</li>
                    </ul>
                    <p>
                        Totul într-un singur loc, accesibil oricând, oriunde! Începe acum și
                        organizează-ți activitățile cu ușurință.
                    </p>
                </div>
                <div className="about-illustration">
                    <img src={Illustration} alt="About Illustration" />
                </div>
            </div>
        </div>
    );
}