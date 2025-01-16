import React from 'react';
import './About.css';
import Image1 from './image1.png';
import Image2 from './image2.png';
import Image3 from './image3.png';
import Image4 from './image4.png';
import Image5 from './image5.png';

export default function About() {
    const features = [
        {
            title: "Gestionarea conturilor",
            text: "Administrează rapid și eficient informațiile despre membrii grupei, inclusiv detalii despre profiluri și activități. Creează grupuri personalizate și asigură o organizare simplă.",
            img: Image1,
        },
        {
            title: "Anunțuri și voturi",
            text: "Fii la curent cu cele mai recente notificări și ia decizii importante împreună cu colegii prin sistemul de vot integrat.",
            img: Image2,
        },
        {
            title: "Calendar sincronizat",
            text: "Urmărește orarul grupei și evenimentele planificate, cu actualizări automate pentru modificări importante.",
            img: Image3,
        },
        {
            title: "Organizarea ieșirilor",
            text: "Planifică ieșiri alături de colegi, alegând locații direct de pe o hartă interactivă, cu acces la detalii și rute personalizate.",
            img: Image4,
        },
        {
            title: "Actualizări automate",
            text: "Bucură-te de actualizări automate cu anunțuri și informații relevante pentru grupul tău.",
            img: Image5,
        },
    ];

    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Despre Aplicație</h1>
                <p className="subtitle">Soluția ta completă pentru organizarea unei grupe de studenți</p>
            </header>
            <main className="about-content">
                <section className="about-intro">
                    <p>
                        Aplicația noastră este special creată pentru a simplifica viața studenților.
                        Cu ajutorul acesteia, poți beneficia de următoarele funcționalități:
                    </p>
                </section>
                <section className="about-features">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-item ${index % 2 === 0 ? "even" : "odd"}`}
                        >
                            <img src={feature.img} alt={`Feature ${index + 1}`} />
                            <div className="feature-text">
                                <h3>{feature.title}</h3>
                                <p>{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </section>
                <section className="about-footer">
                    <p>
                        Totul într-un singur loc, accesibil oricând, oriunde! Începe acum și
                        organizează-ți activitățile cu ușurință.
                    </p>
                </section>
            </main>
        </div>
    );
}
