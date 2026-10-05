import { useEffect, useState } from "react";
import './Homepage.css';
import { apiUrl, callApi, imgurl } from '../lib';
import WeatherReport from "./WeatherReport";
import UserManager from "./UserManager";
import Profile from "./Profile";

const Homepage = () =>{
    const [fullname, setFullname] = useState("");
    const [activeMenu, setActiveMenu] = useState(1);
    const menuList = [
        { mid: 1, menu: "Weather Board", component: WeatherReport },
        { mid: 2, menu: "User Management", component: UserManager },
        { mid: 3, menu: "My Profile", component: Profile }
    ];

    function loadFullname(response) {
        if(response.code !== 200) {
            alert(response.message);
        }
        else{
            setFullname(response.fullname);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            logout();
            return;
        }
        callApi("GET", apiUrl("users/fullname"), "", "", loadFullname, token);
    }, []);

    function logout(){
       localStorage.clear();
       window.location.replace("/");
    }

    const ActiveComponent = menuList.find((item) => item.mid === activeMenu).component;

    return(
        <div className="home">
            <div className='home-header'>
             <img className='home-header-logo' src={imgurl + "weather.jpg"}></img>

             <div className='home-header-text'> <span>Live</span> Weather Monitering System</div>
            <div className='header-rightside'> 
               <img  className='signoutlogo'  src={imgurl + "signout.jpg"} alt="Sign Out" onClick={logout} ></img>
               <span className='logout-tooltip'>Logout</span>
               <div className='username-text'>Hello, {fullname}</div>
            </div>
        </div>

             <div className="home-workspace"> 
                 <div className="home-menu">
                 <img className='menu-image' src={imgurl + "menu.jpg"} alt="Menu"></img>
                     Menu
                    <ul>
                    {menuList.map((m) => (
                        <li key={m.mid} className={activeMenu === m.mid ? "active" : ""} onClick={() => setActiveMenu(m.mid)}>
                            {m.menu}
                        </li>
                    ))}
                 </ul>
                 </div>
                 <div className="home-content">
                     <ActiveComponent />
                 </div>
             </div>


             <div className="home-footer"> 
              copyright @2026 all rights reserved
            </div>
          
        </div>
    )
}

export default Homepage;