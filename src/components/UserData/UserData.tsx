import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserData() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate()

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      let respone = await axios.post("https://dummyjson.com/users/add", data)
      console.log(respone);
      toast.success("User Added successfully ");
      navigate('/home/usersList')

    } catch (error) {
      toast.error("An error occurred while adding user. Please try again .");


    }
  };
  return (
    <div className='user-container'>
      <div className="title p-3 shadow">
        <h3>Add User</h3>
      </div>
      <div className="container">
        <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your first name"
                  aria-label="firstName"
                  aria-describedby="basic-addon1"
                  {...register("firstName", { required: "First name is required" })}
                />
              </div>
              {errors.firstName && (
                <p className="alert alert-danger">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                  aria-label="lastName"
                  aria-describedby="basic-addon1"
                  {...register("lastName", { required: "Last name is required" })}
                />
              </div>
              {errors.lastName && (
                <p className="alert alert-danger">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                />
              </div>
              {errors.email && (
                <p className="alert alert-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your age"
                  aria-label="age"
                  aria-describedby="basic-addon1"
                  {...register("age", { required: "Age is required", min: { value: 1, message: "Age must be greater than 0" } })}
                />
              </div>
              {errors.age && (
                <p className="alert alert-danger">{errors.age.message}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  aria-label="phone"
                  aria-describedby="basic-addon1"
                  {...register("phone", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" } })}
                />
              </div>
              {errors.phone && (
                <p className="alert alert-danger">{errors.phone.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className='mb-2'>Birth Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter your birth date"
                  aria-label="birthDate"
                  aria-describedby="basic-addon1"
                  {...register("birthDate", { required: "Birth date is required" })}
                />
              </div>
              {errors.birthDate && (
                <p className="alert alert-danger">{errors.birthDate.message}</p>
              )}
            </div>
          </div>
          <div className="text-center my-3">
            <button type="submit" className='btn btn-warning w-50'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
