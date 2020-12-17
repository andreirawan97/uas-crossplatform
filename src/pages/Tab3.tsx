import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

import GambarAndre from "../assets/andre.jpg";

import "./Tab3.css";
import { useHistory } from "react-router";

const Tab3: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const firstName_ = localStorage.getItem("firstName");
    const lastName_ = localStorage.getItem("lastName");

    setFirstName(firstName_ || "");
    setLastName(lastName_ || "");

    fetch(
      "https://us-central1-uas-crossplatform.cloudfunctions.net/showAllLocation",
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.data.locations);
      });
  }, []);

  const onLogOutPressed = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <IonPage>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <IonAvatar style={{ width: 125, height: 125, marginBottom: 20 }}>
          <IonImg src={GambarAndre} />
        </IonAvatar>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <IonText style={{ marginRight: 3, fontSize: 18 }}>
            {firstName}
          </IonText>
          <IonText style={{ fontSize: 18 }}>{lastName}</IonText>
        </div>

        <IonText style={{ marginBottom: 8 }}>00000022705</IonText>

        <IonText style={{ marginBottom: 8, marginLeft: 20, marginRight: 20 }}>
          Kesan dan Pesan: Saya ingin menggunakan React Native.
        </IonText>

        <IonButton
          color="danger"
          onClick={onLogOutPressed}
          style={{ marginBottom: 32 }}
        >
          Log Out
        </IonButton>

        <div style={{ width: "100%" }}>
          <IonText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 20,
              marginLeft: 20,
            }}
          >
            Lokasi Terakhir
          </IonText>
          {locations ? (
            <IonList style={{ marginTop: 12 }}>
              {(locations || []).map((location) => {
                let { name, lat, long, date } = location;
                let date_ = new Date(date);

                return (
                  <IonItem>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 2,
                        }}
                      >
                        <IonLabel style={{ marginRight: 8 }}>{name}</IonLabel>
                        <IonLabel style={{ color: "rgba(0,0,0,0.5)" }}>
                          ({lat}, {long})
                        </IonLabel>
                      </div>
                      <IonLabel style={{ marginRight: 12 }}>
                        {date_.getDate()}-{date_.getMonth() + 1}-
                        {date_.getFullYear()} {date_.getHours()}:
                        {date_.getMinutes()}:{date_.getSeconds()}
                      </IonLabel>
                    </div>
                  </IonItem>
                );
              })}
            </IonList>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IonLabel style={{ color: "rgba(0,0,0,0.4)", marginTop: 100 }}>
                No recent locations
              </IonLabel>
            </div>
          )}
        </div>
      </div>
    </IonPage>
  );
};

export default Tab3;
