import axios from 'axios';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import styles from "./SignIn.module.css";

// Define an interface for form data
interface SignInFormData {
  username: string;
  password: string;
}

export default function SignIn() {
  // Directly type the context with a type assertion
  const authContext = useContext(AuthContext) as { saveUserData: () => void };

  const { saveUserData } = authContext;

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  // Define the onSubmit handler with proper typing
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", data);
      console.log(response);
      localStorage.setItem('userToken', response.data.token);
      saveUserData(); // Call the function directly
      toast.success("You have successfully logged in!");
      navigate('/home');
    } catch (error) {
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className={`${styles.authContainer} container-fluid`}>
      <div className="row vh-100 justify-content-center align-content-center">
        <div className="col-md-6 col-lg-4 bg-white rounded rounded-3 p-5">
          <h4 className={`mb-3 ${styles.title}`}>User Management System</h4>
          <h5 className='text-center'>Sign In</h5>
          <span className='text-muted text-center'>Enter your credentials to access your account</span>
          <form className='my-2' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className='mb-2'>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="alert alert-danger">{errors.username.message}</p>
            )}
            <div className="mb-3">
              <label className='mb-2'>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^.{8,}$/,
                    message: "Password must be at least 8 characters long"
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className="alert alert-danger">{errors.password.message}</p>
            )}
            <button type="submit" className='btn btn-warning text-white w-100 py-2'>SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
