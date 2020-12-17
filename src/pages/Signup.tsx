import React, { useState } from "react";
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
import md5 from "md5";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignupPressed = () => {
    if (email && password && firstName && lastName && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true);
        fetch(
          "https://us-central1-uas-crossplatform.cloudfunctions.net/signup",
          {
            method: "POST",
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password: md5(password),
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
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
        setAlertMessage("Password not match!");
      }
    } else {
      setAlertOpen(true);
      setAlertMessage("Fields cannot be empty!");
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
          Signup
        </IonText>
        <IonInput
          placeholder="First Name"
          value={firstName}
          onIonInput={(e: any) => setFirstName(e.target.value)}
          style={{ marginBottom: 20, fontSize: 20 }}
        />
        <IonInput
          placeholder="Last Name"
          value={lastName}
          onIonInput={(e: any) => setLastName(e.target.value)}
          style={{ marginBottom: 20, fontSize: 20 }}
        />
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
        <IonInput
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onIonInput={(e: any) => setConfirmPassword(e.target.value)}
          style={{ marginBottom: 20, fontSize: 20 }}
        />

        <Link to="/login" style={{ marginBottom: 12 }}>
          <IonLabel
            style={{
              color: "rgba(0,0,0,0.8)",
              alignSelf: "flex-start",
            }}
          >
            Already have an account? Login now
          </IonLabel>
        </Link>

        <IonButton
          expand="block"
          style={{ width: "100%" }}
          onClick={onSignupPressed}
        >
          Signup
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
