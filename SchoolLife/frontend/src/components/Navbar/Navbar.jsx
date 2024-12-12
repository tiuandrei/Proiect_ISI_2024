import React from 'react';
import './Navbar.css';

const navLinksLeft = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'About',
        path: '/about'
    },
    {
        title: 'Announcements',
        path: '/announcements'
    }
];

const navLinksLeftAdmin = [
    {
        title: 'Add Announcement',
        path: '/addAnnouncement'
    }
]
const navLinksRightLoggedOut = [
    {
        title: 'Login',
        path: '/login'
    },
    {
        title: 'Register',
        path: '/register'
    }
];

const navLinksRightLoggedIn = [
    {
        title: 'Profile',
        path: '/profile'
    },
    {
        title: 'Calendar',
        path: '/calendar'
    }
];

export default function Navbar(props) {
    const isAdminLinkPresent = navLinksLeft.some(link => navLinksLeftAdmin.some(adminLink => adminLink.path === link.path));

    if (props.isAdmin && !isAdminLinkPresent) {
        navLinksLeft.push(...navLinksLeftAdmin);
    }

    return (
        <div className="navbar">
            <nav className="navbar-nav">
                <ul className="left">
                    {navLinksLeft.map((link, index) => (
                        <li key={index}>
                            <a href={link.path}>{link.title}</a>
                        </li>
                    ))}
                </ul>
                <ul className="right">
                    {props.isLoggedIn ? (
                        <>
                            {navLinksRightLoggedIn.map((link, index) => (
                                <li key={index}>
                                    <a href={link.path}>{link.title}</a>
                                </li>
                            ))}
                            <li>
                                <a href="#" onClick={props.logoutCallback}>Logout</a>
                            </li>
                        </>
                    ) : (
                        navLinksRightLoggedOut.map((link, index) => (
                            <li key={index}>
                                <a href={link.path}>{link.title}</a>
                            </li>
                        ))
                    )}


                </ul>
            </nav>
        </div>
    );
}