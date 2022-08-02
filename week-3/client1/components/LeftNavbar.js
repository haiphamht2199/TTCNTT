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
  <div className={styles.navcontainer}>
   <div className={styles.wrapper}>
    <ul>
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

     <li onClick={() => props.handleLogout()}>
      <FontAwesomeIcon
       icon={faSignOutAlt}
       style={{ width: "18px", cursor: "pointer" }}
      />{" "}
      <a href="#">Logout</a>
     </li>
    </ul>
   </div>
  </div>
 )
}
