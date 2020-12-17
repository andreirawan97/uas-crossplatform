import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const [friends, setFriends] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [friendEmail, setFriendEmail] = useState("");

  const onSearchFriend = () => {
    if (friendEmail) {
      const email = localStorage.getItem("email");
      setLoading(true);
      fetch(
        "https://us-central1-uas-crossplatform.cloudfunctions.net/addNewFriend",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            friendEmail,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setLoading(false);
            setAlertMessage("Friend successfully added!");
            setAlertOpen(true);
            setFriendEmail("");

            fetch(
              "https://us-central1-uas-crossplatform.cloudfunctions.net/showAllFriend",
              {
                method: "POST",
                body: JSON.stringify({
                  email,
                }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setFriends(data.data.friends);
              });
          } else {
            setLoading(false);
            setAlertMessage(data.message);
            setAlertOpen(true);
          }
        });
    }
  };

  const onDeleteFriend = (friendEmail: string) => {
    const email = localStorage.getItem("email");

    setLoading(true);
    fetch(
      "https://us-central1-uas-crossplatform.cloudfunctions.net/removeFriend",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          friendEmail,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setFriends(data.data.friends);
        console.log(data);
      });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    setLoading(true);
    fetch(
      "https://us-central1-uas-crossplatform.cloudfunctions.net/showAllFriend",
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setFriends(data.data.friends);
        console.log(data);
      });
  }, []);

  return (
    <IonPage style={{ padding: 20 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <IonText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 28 }}>
          Friends
        </IonText>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <IonInput
            placeholder="Input friend's email..."
            value={friendEmail}
            onIonInput={(e: any) => setFriendEmail(e.target.value)}
          />

          <IonIcon
            name="search-outline"
            size="large"
            onClick={onSearchFriend}
          ></IonIcon>
        </div>

        {friends ? (
          <IonList>
            {(friends || []).map((friend) => {
              let { firstName, lastName, email } = friend;

              return (
                <IonItemSliding>
                  <IonItem>
                    <IonLabel>
                      {firstName} {lastName}
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => {
                        onDeleteFriend(email);
                      }}
                    >
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        ) : (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <IonLabel style={{ color: "rgba(0,0,0,0.4)", marginTop: 100 }}>
              You have no friend :(
            </IonLabel>
          </div>
        )}
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
};

export default Tab1;
