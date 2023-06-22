import { IonInput, IonText } from "@ionic/react";

import "./Input.scss";

// Sử dụng component IonInput và IonText của ionic
const Input = (props) => {
  const { error, onChange, onBlur, ...InputProps } = props;
  return (
    <>
      <IonInput
        className="input-class"
        {...InputProps}
        onInput={onChange}
        onIonBlur={onBlur}
      />
      {error && (
        <IonText className="text-error">
          <p>{error}</p>
        </IonText>
      )}
    </>
  );
};
export default Input;
