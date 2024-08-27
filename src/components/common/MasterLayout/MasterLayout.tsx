import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
export default function MasterLayout() {
  return (
    <>
    <div className="d-flex">
     <div className="">

        <SideBar/>
     </div>
     <div className=" w-100">
      <NavBar/>
      <Outlet/>
     </div>
    </div>
    </>
  )
}
