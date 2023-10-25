import React from "react";
import { Link} from "react-router-dom"; 

export default function Nav() {
  const auth = localStorage.getItem('user');
 
  function logout() {
    localStorage.clear();
  }

  if (!auth) {
    var Class = "nav-ul2";
  }
  return (
    <div>
      <ul className="nav-ul">
        <li><img style={{ width: "60px", height: "60px", borderRadius: "50%" }} src="https://e24joaz2t6m.exactdn.com/wp-content/uploads/2020/03/microsofttododarkmode.jpg?strip=all&lossy=1&sharp=1&ssl=1" alt="logo" /></li>
        <li style={{ marginTop: "15px", fontSize: "20px" }}><b><i>To-Do Application</i></b> </li>
        {auth ?
          <>
            <div style={{ alignSelf: "center" }}>
              <li><b>{JSON.parse(auth).name}</b></li>
              <li style={{ position: "absolute", right: "10px" }}><Link onClick={logout} to="/login">Logout</Link></li>
            </div>
          </>
          :
          <>
            <div className={Class} >
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </div>
          </>
        }
      </ul>
    </div >
  );
}

