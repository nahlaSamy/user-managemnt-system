import React, { useState,useContext } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import profilephoto from "../../../assets/imgs/profile-photo.png"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function SideBar() {
  let {userData}=useContext(AuthContext)

  const [isCollapse,setIsCollapse]=useState(false)
  const toggleCollapse =()=>{
    setIsCollapse(!isCollapse)
  }
  return (
<div className="sideBar-conatiner">

    <Sidebar collapsed={isCollapse}>

      <Menu>
      <MenuItem icon={<i className='fa fa-bars'></i>} onClick={toggleCollapse} >  </MenuItem>

        <div className="profileData m-5">
        <img  className="rounded-circle" src={userData?.image} alt="" />
        <h1 className='h6 my-3'> {userData?.firstName} {userData?.lastName}</h1>
          </div>
      <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to ="/home"/>} > Home </MenuItem>
        <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to ="/home/userslist"/>} > users </MenuItem>
        <MenuItem icon={<i className='fa fa-user'></i>}component={<Link to ="/home/userdata"/>} > Add users </MenuItem>
        <MenuItem icon={<i className='fa fa-user'></i>} component={<Link to ="/home/profile"/>} > Profile </MenuItem>

      </Menu>
    </Sidebar>
</div>
  )
}
