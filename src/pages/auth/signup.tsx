import * as React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSignupMutation } from "@api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { acc_no } from "@utils/acc_no_generator";

export default function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    acc_no: acc_no,
    balance: 0,
    password: '',


  }

  const [signup, { isLoading }] = useSignupMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full name is required"),
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
      const response = await signup(values).unwrap();
      if(response) {
        // console.log(user);
        // const [userData] = response;
        navigate("../login");
        toast.success("user created successfully");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmission}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form>
          <h1 className="header">MobiWal</h1>
          <div className="mb-4">
            <label className="mb-2 block font-normal text-[#333]">
              Enter your name
            </label>
            <div className="mb-2">
              <Field
                as="input"
                type="text"
                name="name"
                className="input"
                placeholder="Enter your name"
                autoComplete="false"
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

          <div className="mb-4">
            <button
              className="w-full text-center flex items-center justify-center font-semibold !py-3 -mt-2"
              type="submit"
            >
              {isLoading ? "loading" : "Sign up"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )

}