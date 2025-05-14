// import React, { useState, useEffect } from "react";
// import { CssBaseline, Grid } from "@material-ui/core";
// import Header from "./components/Header/Header";
// import List from "./components/List/List";
// import Map from "./components/Map/Map";
// import { getPlacesData, getWeatherData } from "./api/Index";
// import "./Attraction.css";

// const Attraction = () => {
//   const [places, setPlaces] = useState([]);
//   const [weatherData, setWeatherData] = useState([]);
//   const [childClicked, setChildClicked] = useState(null);
//   const [coordinates, setCoords] = useState({});
//   const [bounds, setBounds] = useState({}); //null
//   const [isLoading, setIsLoading] = useState(false);
//   const [type, setType] = useState("");
//   const [rating, setRating] = useState("");
//   const [filteredPlaces, setFilteredPlaces] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords: { latitude, longitude } }) => {
//         setCoords({ lat: latitude, lng: longitude });
//       }
//     );
//   }, []);
//   useEffect(() => {
//     const filteredPlaces = places.filter(
//       (place) => Number(place.rating) > rating
//     );

//     setFilteredPlaces(filteredPlaces);
//   }, [rating, places]);
  
//   useEffect(() => {
//     if (bounds.sw && bounds.ne) {
//       setIsLoading(true);
//       getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
//         setWeatherData(data)
//       );
//       getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
//         setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
//         setFilteredPlaces([]);
//         setIsLoading(false);
//       });
//     }
//   }, [type, bounds, coordinates.lat, coordinates.lng]);
//   return (
//     <>
//       <CssBaseline />
//       <Header setCoords={setCoords} />
//       <Grid container spacing={3} style={{ width: "100%" }}>
//         <Grid item xs={12} md={4}>
//           <List
//             places={filteredPlaces.length ? filteredPlaces : places}
//             childClicked={childClicked}
//             isLoading={isLoading}
//             type={type}
//             setType={setType}
//             rating={rating}
//             setRating={setRating}
//           />
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Map
//             setCoords={setCoords}
//             setBounds={setBounds}
//             coordinates={coordinates}
//             places={filteredPlaces.length ? filteredPlaces : places}
//             setChildClicked={setChildClicked}
//             weatherData={weatherData}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Attraction;



import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api/Index";
import "./Attraction.css";

const Attraction = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (rating) {
      const filtered = (places || []).filter(
        (place) => Number(place.rating) > Number(rating)
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces([]);
    }
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        const filtered = (data || []).filter(
          (place) => place.name && place.num_reviews > 0
        );
        setPlaces(filtered);
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds, coordinates.lat, coordinates.lng]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Attraction;


// import React, { useState, useEffect } from "react";
// import { CssBaseline, Grid } from "@material-ui/core";
// import Header from "./components/Header/Header";
// import List from "./components/List/List";
// import Map from "./components/Map/Map";
// import { getPlacesData, getWeatherData } from "./api/Index";
// import "./Attraction.css";

// const Attraction = () => {
//   const [places, setPlaces] = useState([]);
//   const [filteredPlaces, setFilteredPlaces] = useState([]);
//   const [weatherData, setWeatherData] = useState([]);
//   const [childClicked, setChildClicked] = useState(null);
//   const [coordinates, setCoords] = useState({ lat: 0, lng: 0 });
//   const [bounds, setBounds] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [type, setType] = useState("restaurants");
//   const [rating, setRating] = useState("");

//   // Get user location on load
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         ({ coords: { latitude, longitude } }) => {
//           setCoords({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Geolocation error:", error.message);
//           alert("Unable to fetch your location. Please enable GPS or try again.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   // Filter places based on rating
//   useEffect(() => {
//     if (rating) {
//       const filtered = places.filter((place) => {
//         const r = Number(place.rating);
//         return !isNaN(r) && r > Number(rating);
//       });
//       setFilteredPlaces(filtered);
//     } else {
//       setFilteredPlaces([]);
//     }
//   }, [rating, places]);

//   // Fetch data when bounds or type changes
//   useEffect(() => {
//     if (bounds?.sw && bounds?.ne) {
//       setIsLoading(true);

//       // Fetch weather data
//       getWeatherData(coordinates.lat, coordinates.lng)
//         .then((data) => {
//           setWeatherData(data);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch weather data:", err);
//           alert("Weather data could not be loaded.");
//         });

//       // Fetch places data
//       getPlacesData(type, bounds.sw, bounds.ne)
//         .then((data) => {
//           console.log("Fetched Places Data:", data);
//           const validPlaces = (data || []).filter(
//             (place) => place.name && place.num_reviews > 0
//           );
//           setPlaces(validPlaces);
//           setFilteredPlaces([]);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch places:", err);
//           alert("Places data could not be loaded. Please try again.");
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   }, [type, bounds, coordinates.lat, coordinates.lng]);

//   return (
//     <>
//       <CssBaseline />
//       <Header setCoords={setCoords} />
//       <Grid container spacing={3} style={{ width: "100%" }}>
//         <Grid item xs={12} md={4}>
//           <List
//             places={filteredPlaces.length ? filteredPlaces : places}
//             childClicked={childClicked}
//             isLoading={isLoading}
//             type={type}
//             setType={setType}
//             rating={rating}
//             setRating={setRating}
//           />
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Map
//             setCoords={setCoords}
//             setBounds={setBounds}
//             coordinates={coordinates}
//             places={filteredPlaces.length ? filteredPlaces : places}
//             setChildClicked={setChildClicked}
//             weatherData={weatherData}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Attraction;

