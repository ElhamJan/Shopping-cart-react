import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signUp.css";
import { Link, withRouter } from "react-router-dom";
import { signUpService } from "../../services/signUpService";
import { useEffect, useState } from "react";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]{11}$/, "Invalid phone number!")
    .nullable(),
  password: Yup.string().required("Password is required"),
  passConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = (props) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  const setAuth = useAuthActions();
  const auth = useAuth();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) props.history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;

    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };

    try {
      const { data } = await signUpService(userData);
      setAuth(data);
      //localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      props.history.push(redirect);
    } catch (error) {
      if (error.response && error.response.data.message)
        setError(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" type="email" label="Email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          type="password"
          label="Password"
        />
        <Input
          formik={formik}
          name="passConfirm"
          type="password"
          label="Password confirmation"
        />
        <button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Submit
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already login?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(SignUpForm);
