import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Locate from "@arcgis/core/widgets/Locate";
import Track from "@arcgis/core/widgets/Track";
import Graphic from "@arcgis/core/Graphic";
import * as route from "@arcgis/core/rest/route";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import esriConfig from "@arcgis/core/config";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurGG_U2RWHeEHGIagzmBlgZ-UkjjFW8kgxM2TNGLHabmwdG9wmPAnLHIdBOj6E1rMuFMQWVSPcsX6bjQO6qm4xtP6XOWlC5_pc-bOHOYkNS4Y-N8UgRtQCRl742dJRLzMlC1ejdYZ8yqsx2sirdN5h-4oqcQ3aweGPpLoUisQ0QvysF8nmjvI1afYlbjRisvcnj_skC25wxOIQ5wernoTBt0.AT1_fYrBJDap";
esriConfig.request.proxyUrl = "http://localhost:3000/proxy?url=";

const RestaurantMap = ({ selectedId }) => {
    const mapDiv = useRef(null);
    const viewRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

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
            query.where = `full_id = '${id}'`;
            query.returnGeometry = true;

            const result = await featureLayer.queryFeatures(query);

            if (result.features.length > 0) {
                const restaurantFeature = result.features[0];
                const geometry = restaurantFeature.geometry;

                setSelectedLocation(geometry);

                if (viewRef.current) {
                    viewRef.current.goTo({
                        target: geometry,
                        zoom: 18,
                    });
                }
            }
        } catch (error) {
            console.error(`Eroare la evidențierea restaurantului: ${error}`);
        }
    };

    const showRoute = async () => {
        if (!selectedLocation) {
            console.error("Locația selectată nu este definită.");
            return;
        }

        if (!currentLocation) {
            console.error("Locația curenta nu este definită.");
            return;
        }
    
        const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    
        const routeParams = new RouteParameters({
            stops: new FeatureSet({
                features: [
                    new Graphic({ geometry: currentLocation }),
                    new Graphic({ geometry: selectedLocation }),
                ],
            }),
            returnDirections: true,
        });

        console.log("Rută de la", currentLocation, "la", selectedLocation);
    
        try {
            const result = await route.solve(routeUrl, routeParams);
            if (result.routeResults.length === 0) {
                console.error("Nicio rută găsită.");
                return;
            }
            viewRef.current.graphics.removeAll();
            result.routeResults.forEach(function(line) {
                line.route.symbol = {
                  type: "simple-line",
                  color: [5, 150, 255],
                  width: 3
                };
                viewRef.current.graphics.add(line.route);
            });

    
            
        } catch (error) {
            console.error("Eroare la generarea traseului:", error);
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
                center: [26.1, 44.43],
                zoom: 13,
            });

            viewRef.current = view;

            await view.when();
            setupLayer(map);

            const locateWidget = new Locate({
                view: view,
                useHeadingEnabled: false,
                goToOverride: (view, options) => {
                    options.target.scale = 1500;
                    return view.goTo(options.target);
                },
            });
            
            projection.load().then(() => {
                locateWidget.on("locate", (event) => {
                    const coords = event.position.coords;
            
                    // Creează un punct în WKID 4326 (WGS84)
                    const point = {
                        type: "point",
                        x: coords.longitude,
                        y: coords.latitude,
                        spatialReference: { wkid: 4326 },
                    };
            
                    // Proiectează punctul în WKID 102100 (Web Mercator)
                    const projectedPoint = projection.project(point, new SpatialReference({ wkid: 102100 }));
            
                    if (projectedPoint) {
                        console.log("Locația curentă reproiectată:", projectedPoint);
                        setCurrentLocation(projectedPoint);
                    } else {
                        console.error("Eroare la reproiectarea locației curente.");
                    }
                });
            });
            view.ui.add(locateWidget, "top-left");

            const trackWidget = new Track({
                view: view,
                graphic: new Graphic({
                    symbol: {
                        type: "simple-marker",
                        size: "12px",
                        color: "green",
                        outline: {
                            color: "#ffffff",
                            width: 2,
                        },
                    },
                }),
                useHeadingEnabled: false,
            });
            view.ui.add(trackWidget, "top-left");
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

    return (
        <div>
            <div ref={mapDiv} style={{ width: "100%", height: "340px" }}></div>
            {selectedId && (
                <button onClick={showRoute} style={{ marginTop: "10px" }}>
                    Arată drum
                </button>
            )}
        </div>
    );
};

export default RestaurantMap;
