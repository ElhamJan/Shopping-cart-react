import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { loginService } from "../../services/loginService";
import { useEffect, useState } from "react";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  const setAuth = useAuthActions();
  const auth = useAuth();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginService(values);
      setAuth(data);
      //localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      history.push(redirect);
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
        <Input formik={formik} name="email" type="email" label="Email" />
        <Input
          formik={formik}
          name="password"
          type="password"
          label="Password"
        />
        <button
          style={{ width: "100%" }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Not sign up yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
