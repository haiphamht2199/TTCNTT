import React from 'react'
import styles from "../styles/Home.module.css";
export default function Header(props) {

 return (
  <div>
   <div className={styles.headcontainer}>
    <div class={styles.toggle} onClick={() => props.handleOnclick()}></div>
    <div className={styles.headwrapper}>
     <div className={styles.profile}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" className={styles.image} />
     </div>
     <div className={styles.title}>
      <p>welcome john.</p>
     </div>
    </div>
   </div>
  </div>
 )
}
