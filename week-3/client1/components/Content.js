import React from 'react'
import styles from "../styles/Content.module.css";
const Devices = [
 {
  "device": "TV",
  "macAdress": "00:1B:44:11:3A:B7",
  "ip": "127.0.0.2",
  "createDate": "2021-05-31",
  "power": "50"
 },
 {
  "device": "Sasher",
  "macAdress": "00:1B:44:11:3A:B8",
  "ip": "127.0.0.3",
  "createDate": "2021-05-31",
  "power": "60"
 },
 {
  "device": "Refigerator",
  "macAdress": "00:1B:44:11:3A:B9",
  "ip": "127.0.0.4",
  "createDate": "2021-05-31",
  "power": "80"
 },
 {
  "device": "Selling Fan",
  "macAdress": "00:1B:44:11:3A:B2",
  "ip": "127.0.0.5",
  "createDate": "2021-05-31",
  "power": "100"
 }
]
export async function getStaticProps() {
 const res = await fetch('http://jsonplaceholder.typicode.com/users')
 const data = await res.json();
 return {
  props: { Data: data }
 };
}
const Content = ({ Data }) => {
 console.log(Data);
 const products = Devices;
 return (
  <div className={styles.main}>
   <div className={styles.cardBoad}>
    <div className={styles.card}>
     <table>
      <thead>
       <tr>
        <td>Device</td>
        <td>MAC Adress</td>
        <td>IP</td>
        <td>Create Date</td>
        <td>Power Consumption</td>
        <td>Action</td>
       </tr>
      </thead>
      <tbody className={styles.maindevice}>
       {
        products.map((divice, index) => (
         <tr key={index}>
          <td>{divice.device}</td>
          <td>{divice.macAdress}</td>
          <td>{divice.ip}</td>
          <td>{divice.createDate}</td>
          <td>{divice.power}</td>

          {/* <div class="action">
           <span onclick="DeleteDe(${index})" class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span>
           <span onclick="Edit(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
          </div> */}
         </tr>
        ))
       }


      </tbody>
     </table>
     <div className={styles.total}>
      <h2>Total:</h2>
      <span className="spanTotal"></span>
     </div>
    </div>
    <div className={styles.Devices}>
     <div className={styles.chart}>
      <canvas id="myChart">
      </canvas>
     </div>
     <div className={styles.addDevices}>
      <div className={styles.add}>
       <div className={styles.formcontrol} >
        <input id="name" type="text" placeholder="name..." />
        <small></small>

       </div>
       <div className={styles.formcontrol}>
        <input id="mac" type="text" placeholder="Mac Adress..." />
        <small></small>

       </div>
       <div className={styles.formcontrol}>
        <input id="ip" type="text" placeholder="IP..." />
        <small></small>
        <span></span>
       </div>
       <div className={styles.formcontrol}>
        <input id="date" type="text" placeholder="dd/mm/yy" />
        <small></small>

       </div>
       <div className={styles.formcontrol}>
        <input id="number" type="number" placeholder="Power..." />
        <small></small>

       </div>
       <small className={styles.errortoggle}></small>
       <div className={styles.bntbutton}>

        <button type="submit" className={styles.submit} >ADD DEVICE</button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}
export default Content;


