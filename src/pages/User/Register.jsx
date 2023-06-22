import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import Helmet from "./../../components/Helmet/index";
import "./User.scss";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import { isValidEmail, isValidPassword } from "../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  selectErrors,
  selectIsLoading,
  selectUser,
} from "../../service/auth/authSlice";
import { useEffect, useState } from "react";
// Sử dụng component  IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText của ionic
/*
ví dụ: sử dụng IonRow, IonCol:
  <IonRow>
    <IonCol>Column 1</IonCol>
    <IonCol size = "8">Column 2</IonCol>
    <IonCol>Column 3</IonCol>
  </IonRow>
  Thì trong html css sẽ là
  html:
      <div class="row">
        <div class="col">Column 1</div>
        <div class="col col-8">Column 2</div>
        <div class="col">Column 3</div>
      </div>
  css:
  .row{
    display: flex;
    flex-wrap: wrap;
  }
  .col{
    flex: 1;
  }
  .col-8{
    flex-basis: 8/12%;
  }
*/
const validateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng nhập đúng email")
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  fullName: yup.string().required("Vui lòng nhập họ và tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
});
const Register = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const initialValues = { fullName: "", email: "", password: "", phone: "" };
  const dispatch = useDispatch();
  const inProgress = useSelector(selectIsLoading);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setFormValues({ ...formValues, [input.name]: input.value });
  };
  const hanldeBlur = (e) => {
    const name = e.target.name;
    const error = validate(formValues);
    if (name === "email") {
      setFormErrors({ ...formErrors, [name]: error.email });
    } else if (name === "fullName") {
      setFormErrors({ ...formErrors, [name]: error.fullName });
    } else if (name === "password") {
      setFormErrors({ ...formErrors, [name]: error.password });
    } else if (name === "phone") {
      setFormErrors({ ...formErrors, [name]: error.phone });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(formValues));
  };
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  const validate = (values) => {
    const errors = { fullName: "", email: "", password: "", phone: "" };
    if (!values.fullName) {
      errors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!values.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Vui lòng nhập đúng email!";
    }
    if (!values.password) {
      errors.password = "Vui lòng nhập password";
    } else if (!isValidPassword(values.password)) {
      errors.password = "Mật khẩu ít nhất 6 ký tự!";
    }
    if (!values.phone) {
      errors.phone = "Vui lòng nhập số điện thoại";
    }
    return errors;
  };
  return (
    <Helmet title="Đăng ký">
      <IonRow className="login">
        <IonCol className="login__title">
          <IonText color={"light"}>
            <h1>Đăng nhập</h1>
          </IonText>
        </IonCol>
        <IonCol className="login__content">
          <div className="login__content__form">
            <Input
              type="text"
              placeholder="Họ và tên"
              name="fullName"
              value={formValues.fullName}
              error={formErrors.fullName}
              onChange={handleChange}
              onBlur={hanldeBlur}
            />
            <Input
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              style={{ marginTop: 30 }}
              error={formErrors.phone}
              onBlur={hanldeBlur}
            />
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={formValues.email}
              error={formErrors.email}
              style={{ marginTop: 30 }}
              onChange={handleChange}
              onBlur={hanldeBlur}
              autocomplete="off"
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              style={{ marginTop: 30 }}
              error={formErrors.password}
              onBlur={hanldeBlur}
              autocomplete="off"
            />
            <IonButton
              onClick={handleSubmit}
              disabled={
                !isValidEmail(formValues.email) ||
                !isValidPassword(formValues.password)
              }
              color={"primary"}
              style={{ marginTop: 30 }}
            >
              {/* {inProgress? <div className="loader"></div> : 'Đăng nhập'} */}
              Đăng nhập
            </IonButton>
            <IonItem
              lines="none"
              text-center
              color={"transparent"}
              className="forgot--password"
            >
              <IonLabel>
                <Link to="/user/login">Đăng nhập</Link>
              </IonLabel>
            </IonItem>
          </div>
        </IonCol>
      </IonRow>
    </Helmet>
  );
};
export default Register;
