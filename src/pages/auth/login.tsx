import * as React from "react";
import * as Yup from "yup";
import { updateUser } from "store/action";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLazyLoginQuery } from "@api/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux-hooks";

export default function Login(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const user = useAppSelector((store) => store.userDetails);

    const initialValues = {
        email: '',
        password: '',
    }

    const [login, {isLoading}] = useLazyLoginQuery();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password should have at least 8 characters"),
    });

    const [show, setShow] = React.useState(false);

    // Handle toggle show password
    const handleShow = () => {
        setShow(!show);
    };

    const handleFormSubmission = async (values: typeof initialValues) => {
        try {
          const response = await login(values).unwrap();
          if(Array.isArray(response)) {
            const [userData] = response;

            dispatch(updateUser(userData));
            sessionStorage.setItem('user', JSON.stringify(userData));
            navigate("/dashboard")
          }else{
            navigate("/signup")
          }

          
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <>
            <Formik
            onSubmit={handleFormSubmission}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            <Form>
              <div className="mb-4">
                <label className="mb-2 block font-normal text-[#333]">
                  Enter your email address
                </label>
                <div className="mb-2">
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email Address"
                    autoComplete="username"
                  />
                </div>

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-[#EA580C]"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-normal text-[#333]">
                  Enter your password
                </label>
                <div className="relative">
                  <Field
                    as="input"
                    type={`${show ? "text" : "password"}`}
                    name="password"
                    className="input"
                    placeholder="Password"
                    role="textbox"
                    autoComplete="current-password"
                  />
                  <span
                    onClick={handleShow}
                    className="absolute right-2 bottom-[35%] text-active text-xs font-bold cursor-pointer"
                  >
                    {show ? "HIDE" : "SHOW"}
                  </span>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-[#EA580C]"
                />
              </div>

              <div className="mb-10 text-base">
                <span className="text-[#333]">Forgot your Password?</span>{" "}
                <Link
                  className="text-active font-semibold"
                  to="/forgot-password"
                >
                  Reset
                </Link>
              </div>

              <div className="mb-4">
                <button
                  className="w-full text-center flex items-center justify-center font-semibold !py-3 -mt-2"
                  type="submit"
                >
                  {isLoading ? "loading" : "Log In"}
                </button>
              </div>
            </Form>
          </Formik>
        </>
    )
    
}