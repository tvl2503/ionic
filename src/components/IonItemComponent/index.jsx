import { IonItem } from "@ionic/react";
import React from "react";
import "./index.styles.scss";
// Sử dụng component IonItem và IonText của ionic

const IonItemComponent = (props) => {
  const { children, className, ...propsIon } = props;
  return (
    <IonItem
      color={"transparent"}
      className={`ionic-item ${className}`}
      lines="none"
      {...propsIon}
    >
      {props.children}
    </IonItem>
  );
};

export default IonItemComponent;
