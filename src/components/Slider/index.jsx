import React, { useCallback, useEffect, useState } from "react";
import img1 from "../../assets/images/banner/BANNER_1.png";
import img2 from "../../assets/images/banner/BANNER_2.png";
import img3 from "../../assets/images/banner/BANNER_3.png";
import SliderItem from "./SliderItem";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import "./Slide.scss";
import { IonButton, IonIcon } from "@ionic/react";
// Sử dụng component  IonButton, IonIcon của ionic

const img = [img1, img2, img3];
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = useCallback(() => {
    activeSlide === 2
      ? setActiveSlide(0)
      : setActiveSlide((state) => state + 1);
  }, [activeSlide]);
  const prevSlide = () => {
    activeSlide === 0
      ? setActiveSlide(2)
      : setActiveSlide((state) => state - 1);
  };
  useEffect(() => {
    const slideAuto = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(slideAuto);
  }, [nextSlide]);
  return (
    <div className="slider">
      {img.map((item, index) => (
        <SliderItem key={index} img={item} active={index === activeSlide} />
      ))}
      <div className="slider__control">
        <IonButton
          color={"transparent"}
          className="slider__control__item"
          onClick={prevSlide}
        >
          <IonIcon icon={chevronBackOutline} />
        </IonButton>
        <IonButton
          color={"transparent"}
          className="slider__control__item"
          onClick={nextSlide}
        >
          <IonIcon icon={chevronForwardOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default Slider;
