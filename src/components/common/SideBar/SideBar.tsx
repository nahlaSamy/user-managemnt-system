import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import profilephoto from "../../../assets/imgs/profile-photo.png"
import { Link } from 'react-router-dom';
export default function SideBar() {
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
        <img  className="rounded-circle" src={profilephoto} alt="" />
        <h1 className='h6 my-3'> Karthi Madesh</h1>
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
