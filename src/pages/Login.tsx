import React, { useState } from "react";
import md5 from "md5";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonInput,
  IonButton,
  IonLabel,
  IonAlert,
  IonLoading,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPressed = () => {
    if (email && password) {
      setLoading(true);

      fetch("https://us-central1-uas-crossplatform.cloudfunctions.net/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password: md5(password),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            localStorage.setItem("email", data.data.email);
            localStorage.setItem("firstName", data.data.firstName);
            localStorage.setItem("lastName", data.data.lastName);
            setLoading(false);
            window.location.reload();
          } else {
            setLoading(false);
            setAlertMessage(data.message);
            setAlertOpen(true);
          }
        });
    } else {
      setAlertOpen(true);
      setAlertMessage("Email or password cannot be empty!");
    }
  };

  return (
    <IonPage
      style={{
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <IonText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 28 }}>
          Login
        </IonText>
        <IonInput
          placeholder="Email"
          value={email}
          onIonInput={(e: any) => setEmail(e.target.value)}
          style={{ marginBottom: 20, fontSize: 20 }}
        />
        <IonInput
          placeholder="Password"
          type="password"
          value={password}
          onIonInput={(e: any) => setPassword(e.target.value)}
          style={{ marginBottom: 20, fontSize: 20 }}
        />

        <Link to="/signup" style={{ marginBottom: 12 }}>
          <IonLabel
            style={{
              color: "rgba(0,0,0,0.8)",
              alignSelf: "flex-start",
            }}
          >
            Don't have an account? Signup now
          </IonLabel>
        </Link>

        <IonButton
          expand="block"
          style={{ width: "100%" }}
          onClick={onLoginPressed}
        >
          Login
        </IonButton>
      </div>

      <IonLoading isOpen={isLoading} />

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setAlertOpen(false)}
        header={"Error"}
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
    </IonPage>
  );
}
