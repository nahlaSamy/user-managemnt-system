import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
};

export default function UserData() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
  const [isUpdate, setIsUpdate] = useState(false);

  let navigate = useNavigate();
  const { userId } = useParams();

  const onSubmit = async (data: FormValues) => {
    try {
      if (isUpdate) {
        await axios.put(`https://dummyjson.com/users/${userId}`, data);
        toast.success("User updated successfully");
      } else {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User added successfully");
      }
      navigate('/home/userslist');
    } catch (error) {
      toast.error(`An error occurred while ${isUpdate ? "updating" : "adding"} the user. Please try again.`);
    }
  };

  useEffect(() => {
    if (userId) {
      setIsUpdate(true);
      axios.get(`https://dummyjson.com/users/${userId}`)
        .then(response => {
          const userData = response.data;
          Object.keys(userData).forEach(key => {
            if (key === 'birthDate') {
              const formattedDate = new Date(userData[key]).toISOString().split('T')[0];
              setValue(key as keyof FormValues, formattedDate);
            } else {
              setValue(key as keyof FormValues, userData[key]);
            }
          });
        })
        .catch(error => {
          toast.error(error ? error.message : "An error occurred while fetching user data.");
        });
    }
  }, [userId, setValue]);

  return (
    <div className='user-container'>
      <div className="title p-3 shadow">
        <h3>{isUpdate ? "Update User" : "Add User"}</h3>
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
                <p className="alert alert-danger">{errors.firstName.message as string}</p>
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
                <p className="alert alert-danger">{errors.lastName.message as string}</p>
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
                <p className="alert alert-danger">{errors.email.message as string}</p>
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
                <p className="alert alert-danger">{errors.age.message as string}</p>
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
                <p className="alert alert-danger">{errors.phone.message as string}</p>
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
                <p className="alert alert-danger">{errors.birthDate.message as string}</p>
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
