import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Other import
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  const email = localStorage.getItem("email");

  const MainNavigator = () => (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tab1" component={Tab1} exact={true} />
        <Route path="/tab2" component={Tab2} exact={true} />
        <Route path="/tab3" component={Tab3} />
        <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        <Route
          path="/login"
          render={() => <Redirect to="/tab1" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Friends</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={square} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );

  const AuthNavigator = () => (
    <IonRouterOutlet>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Redirect exact from="/" to="/login" />
    </IonRouterOutlet>
  );

  return (
    <IonApp>
      <IonReactRouter>
        {email ? <MainNavigator /> : <AuthNavigator />}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
