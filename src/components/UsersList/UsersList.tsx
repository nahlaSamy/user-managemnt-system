import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the User interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
}

export default function UsersList() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null); // Updated to use null

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setUserId(id);
    setShow(true);
  };

  const getUsersList = async () => {
    try {
      let response = await axios.get("https://dummyjson.com/users");
      setUsersList(response.data.users);
    } catch (error) {
      console.log("🚀 ~ getUsersList ~ error:", error);
    }
  };

  const navigateToUserData = (id?: number) => {
    if (id) {
      navigate(`/home/userdata/${id}`);
    } else {
      navigate('/home/userdata');
    }
  };

  const deleteUser = async () => {
    if (userId === null) return; // Prevent deletion if no userId

    try {
      let response = await axios.delete(`https://dummyjson.com/users/${userId}`);
      console.log("🚀 ~ deleteUser ~ response:", response);
      handleClose();
      toast.success("Deleted successfully");
      getUsersList(); // Refresh the list after deletion
    } catch (error) {
      toast.error("An error occurred, please try again.");
      console.log("🚀 ~ deleteUser ~ error:", error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <div className='title d-flex justify-content-between p-4'>
        <h4>Users List</h4>
        <button onClick={() => navigateToUserData()} className='btn btn-warning'>Add New User</button>
      </div>
      <div className="table-container p-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 ? usersList.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>
                  <i onClick={() => handleShow(user.id)} className='fa fa-trash text-warning mx-2'></i>
                  <i onClick={() => navigateToUserData(user.id)} className='fa fa-edit text-warning'></i>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6}><h3>No data available</h3></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h5>Are you sure you want to delete?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
