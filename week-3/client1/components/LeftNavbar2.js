import React from 'react'
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faBookOpen,
 faCog,
 faSignOutAlt,
 faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
export default function LeftNavbar(props) {
 return (
  <div className={styles.navcontainer2}>
   <div className={styles.wrapper2}>
    <span onClick={() => props.handleOnclick2()} className={styles.toggle2}>x</span>
    <ul>
     <li>
      <div className={styles.headwrapper2}>
       <div className={styles.profile2}>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" className={styles.image} />
       </div>
       <div className={styles.title2}>
        <p>welcome john.</p>
       </div>
      </div>
     </li>
     <li>
      <FontAwesomeIcon
       icon={faTachometerAlt}
       style={{ width: "18px", cursor: "pointer" }}
      />{" "}
      <Link href="/dashboard">
       <a href="#">Dashboard</a>
      </Link>
     </li>
     <li>
      <FontAwesomeIcon
       icon={faBookOpen}
       style={{ width: "18px", cursor: "pointer" }}
      />{" "}
      <Link href="/logs">
       <a href="#">Logs</a>
      </Link>
     </li>
     <li>
      <FontAwesomeIcon
       icon={faCog}
       style={{ width: "18px", cursor: "pointer" }}
      />{" "}

      <a href="#"> Setting</a>

     </li>

     <li>
      <FontAwesomeIcon
       icon={faSignOutAlt}
       style={{ width: "18px", cursor: "pointer" }}
      />{" "}
      <Link href="/">
       <a href="#">Logout</a>
      </Link>
     </li>
    </ul>
   </div>
  </div>
 )
}
