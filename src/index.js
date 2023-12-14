import React from "react";
import { createRoot } from 'react-dom/client';
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

function App() {
  const onDrawCreate = ({ features }) => {
    console.log(features);
    const Coords = [];
    let totalCoordinates = 0;
  
    for (const feature of features) {
      const featureCoordinates = feature.geometry.coordinates;
      Coords.push(featureCoordinates);
      totalCoordinates += featureCoordinates.length;
    }
  
    let LongitudeSum = 0;
    let LatitudeSum = 0;
  
    Coords.forEach((item) => {
      for (const coordinates of item) {
        LongitudeSum += coordinates[0];
        LatitudeSum += coordinates[1];
      }
    });
  
    const avgLongitude = LongitudeSum / totalCoordinates;
    const avgLatitude = LatitudeSum / totalCoordinates;
  
    console.log(avgLongitude);
    console.log(avgLatitude);
  };
  
  const onDrawUpdate = ({ features }) => {
    alert("onUpdateisCalled");
    console.log(features);
  };

  return (
      <Map
        style="mapbox://styles/mapbox/streets-v9" 
        containerStyle={{
          height: "600px",
          width: "100vw"
        }}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>

  );
}


const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(<App />);