import { useContext, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

// Define an interface for the user data
interface UserData {
  firstName: string;
  lastName: string;
  image: string;
}

export default function SideBar() {
  // Ensure AuthContext is not undefined
  const authContext = useContext(AuthContext);

  // Provide a default value if authContext is undefined
  const userData = authContext?.userData as UserData | undefined;

  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="sideBar-container">
      <Sidebar collapsed={isCollapse}>
        <Menu>
          <MenuItem icon={<i className='fa fa-bars'></i>} onClick={toggleCollapse} />

          <div className="profileData m-5">
            <img className="rounded-circle" src={userData?.image || 'default-profile.png'} alt="Profile" />
            <h1 className='h6 my-3'>
              {userData?.firstName} {userData?.lastName}
            </h1>
          </div>

          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/home" />}> Home </MenuItem>
          <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/home/userslist" />}> Users </MenuItem>
          <MenuItem icon={<i className='fa fa-user'></i>} component={<Link to="/home/userdata" />}> Add User </MenuItem>
          <MenuItem icon={<i className='fa fa-user'></i>} component={<Link to="/home/profile" />}> Profile </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
