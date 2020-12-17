import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GoogleMapReact from "google-map-react";

import "./Tab2.css";

const Tab2: React.FC = (props: any) => {
  const [isLoading, setLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoadingMap, setLoadingMap] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      setLoadingMap(false);
    } else {
      setAlertMessage(
        "Web app ini menggunakan navigator.geolocation dari browser dan untuk pertama kali akan diminta untuk menyalakan lokasi. Mohon di allow. Kalau anda melihat pesan ini, browser anda tidak support navigator.geolocation"
      );
      setAlertOpen(true);
    }
  }, []);

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: currentLocation.lat, lng: currentLocation.lng },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  const onMapClicked = (value: any) => {
    console.log(value);
  };

  const onGoogleApiLoaded = (map: any, maps: any) => {
    renderMarkers(map, maps);
  };

  const onNoteClick = () => {
    setAlertMessage(
      "Web app ini menggunakan navigator.geolocation dari browser dan untuk pertama kali akan diminta untuk menyalakan lokasi. Mohon di allow. Kalau markernya tidak muncul, coba refresh lagi. Marker yang muncul adalah marker lokasi pengguna."
    );
    setAlertOpen(true);
  };

  const onSubmitLocation = () => {
    if (locationName) {
      setLoading(true);
      const email = localStorage.getItem("email");
      fetch(
        "https://us-central1-uas-crossplatform.cloudfunctions.net/addNewLocation",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            name: locationName,
            lat: currentLocation.lat,
            long: currentLocation.lng,
            date: Date.now(),
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
        });
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isLoadingMap ? (
        <IonText>Loading map...</IonText>
      ) : (
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyASwzVRZutrNETQTe6zbueCZjjzm9SuOas",
            }}
            defaultCenter={{ lat: -6.250247, lng: 106.616089 }}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
            onClick={onMapClicked}
          ></GoogleMapReact>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              zIndex: 1,
              width: "100%",
              height: "20%",
              backgroundColor: "white",
              padding: 20,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <IonText
              style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}
            >
              Your Location
            </IonText>

            <div style={{ display: "flex", width: "100%" }}>
              <IonInput
                placeholder="Enter current location's name"
                onIonInput={(e: any) => setLocationName(e.target.value)}
              />

              <IonButton fill="outline" onClick={onSubmitLocation}>
                Submit
              </IonButton>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonText style={{ color: "rgba(0,0,0,0.5)", marginRight: 12 }}>
                ({currentLocation.lat}, {currentLocation.lng})
              </IonText>

              <IonText
                onClick={onNoteClick}
                style={{ fontWeight: "bold", color: "#3880ff" }}
              >
                NOTE
              </IonText>
            </div>
          </div>
        </div>
      )}

      <IonLoading isOpen={isLoading} />

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setAlertOpen(false)}
        header={"Info"}
        message={alertMessage}
        buttons={[
          {
            text: "Okay",
            handler: () => {
              console.log("Confirm Okay");
            },
          },
        ]}
      />
    </div>
  );
};

export default Tab2;
