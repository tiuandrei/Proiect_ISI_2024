import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const RestaurantMap = ({ selectedId }) => {
    const mapDiv = useRef(null);
    const viewRef = useRef(null);

    useEffect(() => {
        if (selectedId) {
            highlightRestaurant(selectedId);
        }
    }, [selectedId]);

    const highlightRestaurant = async (id) => {
        try {
            const featureLayer = new FeatureLayer({
                url: "https://services.arcgis.com/9nrie6KNVyjacEqa/arcgis/rest/services/Restaurante_Bucuresti/FeatureServer",
                outFields: ["*"],
                popupTemplate: {
                    title: "{Name}",
                    content: `<p>Address: {Addr_street}</p><p>Opening Hours: {Opening_hours}</p>`,
                },
            });

            const query = featureLayer.createQuery();
            query.where = `full_id = '${id}'`; // Filtrare pe baza ID-ului
            query.returnGeometry = true;
            query.outFields = ["*"];

            const result = await featureLayer.queryFeatures(query);

            if (result.features.length > 0) {
                const restaurantFeature = result.features[0];
                const geometry = restaurantFeature.geometry;

                featureLayer.renderer = {
                    type: "unique-value",
                    field: "full_id",
                    uniqueValueInfos: [
                        {
                            value: id,
                            symbol: {
                                type: "simple-marker",
                                color: "purple",
                                size: "12px",
                                outline: {
                                    color: "white",
                                    width: 2,
                                },
                            },
                        },
                    ],
                };

                console.log(`Restaurantul cu ID ${id} a fost evidențiat.`);

                // Zoom 
                if (viewRef.current) {
                    viewRef.current.goTo({
                        target: geometry,
                        zoom: 18,
                    });
                }
            } else {
                console.warn(`Nu a fost găsit niciun restaurant cu ID: ${id}`);
            }
        } catch (error) {
            console.error(`Eroare la evidențierea restaurantului: ${error}`);
        }
    };

    useEffect(() => {
        async function initializeMapView() {
            const map = new Map({
                basemap: "streets-navigation-vector",
            });

            const view = new MapView({
                container: mapDiv.current,
                map: map,
                center: [26.1, 44.43], // Bucharest
                zoom: 13,
            });

            viewRef.current = view;

            await view.when();
            setupLayer(map);
        }

        function setupLayer(map) {
            const restaurantsLayer = new FeatureLayer({
                url: "https://services.arcgis.com/9nrie6KNVyjacEqa/arcgis/rest/services/Restaurante_Bucuresti/FeatureServer",
                outFields: ["*"],
                popupTemplate: {
                    title: "{Name}",
                    content: `<p>Address: {Addr_street}</p><p>Opening Hours: {Opening_hours}</p>`,
                },
            });

            map.add(restaurantsLayer);
        }

        initializeMapView();

        return () => {
            if (viewRef.current) {
                viewRef.current.destroy();
            }
        };
    }, []);

    return <div ref={mapDiv} style={{ width: "100%", height: "340px" }}></div>;
};

export default RestaurantMap;
