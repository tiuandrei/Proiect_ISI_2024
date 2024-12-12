import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { setAssetPath as setCalciteComponentsAssetPath } from '@esri/calcite-components/dist/components';
import RestaurantMap from '../Map/RestaurantMap';
import './LocationField.css';


setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");

export default function LocationField({ value, onChange }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ name: '', address: '' });
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await fetch("https://services.arcgis.com/9nrie6KNVyjacEqa/arcgis/rest/services/Restaurante_Bucuresti/FeatureServer/0/query?where=1%3D1&outFields=*&f=json");
            const data = await response.json();
            console.log(data)
            setRestaurants(data.features.map(feature => feature.attributes));
        };

        fetchRestaurants();
        console.log(restaurants);
    }, []);

    const handleLocationSelect = (name, address, id) => {
        const locationInfo = `${name}, ${address}`;
        setSelectedLocation({ name, address, id });
    };
    
    return (
        <div>
            <button type="button" onClick={() => setModalIsOpen(true)}>
                Select Location
            </button>
            {value && <p>Selected Location: {value}</p>}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Select Location"
                appElement={document.getElementById('root')}
            >
                <h2>Select a Location</h2>
                <RestaurantMap selectedId={selectedLocation.id} />

                <div className="location-field">
                    <div className="div-container">
                        <ul className="restaurant-list">
                            {restaurants.map((restaurant, index) => {
                                const address = [
                                    restaurant.addr_street,
                                    restaurant.addr_city,
                                    restaurant.addr_country,
                                ].filter(Boolean).join(', ');

                                return (
                                    <li
                                        key={index}
                                        className="restaurant-item"
                                        onClick={() => handleLocationSelect(restaurant.name, address, restaurant.full_id)}
                                    >
                                        <strong>{restaurant.name}</strong>
                                        <br />
                                        <span>{address}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <form>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={selectedLocation.name} readOnly />

                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" value={selectedLocation.address} readOnly />
                        </form>
                    </div>

                </div>
                
                
                <button className="down-button" onClick={() => setModalIsOpen(false)}>Close</button>
                <button className="down-button save-button" 
                    type="button"
                    onClick={() => {
                        onChange(`${selectedLocation.name}, ${selectedLocation.address}`);
                        setModalIsOpen(false);
                    }}
                >
                    Save
                </button>
            </Modal>
        </div>
    );
}
