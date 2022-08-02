import axios from 'axios'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Content.module.css'
import { useRouter } from 'next/router';
import { Doughnut } from "react-chartjs-2";
import Header from "../components/Header";
import LeftNavbar from "../components/LeftNavbar";
import LeftNavbar2 from "../components/LeftNavbar2";
import Cookies from 'js-cookie';

export default function Home() {

  const [data, setData] = useState([]);
  const [labels, setlabels] = useState([]);
  const [powers, setpowers] = useState([]);
  const [backgroundColor, setbackgroundColor] = useState([]);
  //add
  const [hide, setHide] = useState(false)
  const [name, setName] = useState("");
  const [mac, setMac] = useState("");
  const [ip, setIp] = useState("");
  const [date, setDate] = useState("");
  const [power, setPower] = useState("");
  const [name1, setName1] = useState("");
  //edit
  const [mac1, setMac1] = useState("");
  const [ip1, setIp1] = useState("");
  const [date1, setDate1] = useState("");
  const [power1, setPower1] = useState("");
  const [index, setIndex] = useState(0);

  //vadidate
  const [loading, setLoadning] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const router = useRouter();
  var total = data.reduce((a, c) => parseInt(a) + parseInt(c.power), 0);
  const data1 = {
    labels: labels,
    datasets: [
      {
        data: powers,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (Cookies.get("name")) {
      getListDevice();
    } else {
      router.push("/")
    }

  }, []);

  //getDevice
  const getListDevice = async () => {
    const res = await axios.get('http://localhost:5000/devices');
    setData(res.data.Devies);
    setlabels(res.data.labels);
    setpowers(res.data.powers);
    setbackgroundColor(res.data.backgroundColor);
  }
  //add
  const handleAdd = async () => {
    setLoading1(name ? false : true);
    setLoading2(mac ? false : true);
    setLoading3(ip ? false : true);
    setLoading4(date ? false : true);
    setLoading5(power ? false : true);
    if (name && mac && ip && power) {
      const device = {
        name, mac, ip, date, power
      };
      try {
        await axios.post('http://localhost:5000/adddevice', device);
        setName("");
        setMac("");
        setIp("");
        setDate("");
        setPower("");
        getListDevice();

      } catch (error) {

      }
    }


  }
  //delete
  const deletehandle = async (x) => {
    try {
      await axios.delete(`http://localhost:5000/deletedevice/?id=${x}`);
      getListDevice();
      // router.push('/');
    } catch (error) {

    }
  }
  //edit
  const Editehandle = async (x) => {
    setIndex(x);
    setHide(true);
    try {
      const res = await axios.get(`http://localhost:5000/getDeviceById?id=${x}`);
      const data = res.data;
      setName1(data.device);
      setMac1(data.macAdress);
      setIp1(data.ip);
      setDate1(data.createDate);
      setPower1(data.power);
    } catch (error) {

    }
  }
  //save edit
  const SaveEdit = async (index) => {
    const editDevice = {
      name1, mac1, ip1, date1, power1
    }
    await axios.put(`http://localhost:5000/edit?id=${index}`, editDevice);
    setHide(false);
    getListDevice();

  }
  const modalEdit = () => {
    setHide(false);
  }
  const handleOnclick = () => {
    setLoadning(true)
  }
  const handleOnclick2 = () => {
    setLoadning(false)
  }
  //logout
  const handleLogout = () => {
    Cookies.remove("name");
    router.push("/");
  }
  return (
    <>
      <LeftNavbar handleLogout={handleLogout} />
      {loading ? < LeftNavbar2 handleOnclick2={handleOnclick2} /> : ""}

      <Header handleOnclick={handleOnclick} />
      <div>
        <div className={hide ? styles.model_hide : styles.active} >
          <div className={styles.model_inner}>
            <div className={styles.model_herder}>
              <p>Edit Device</p>
              <span onClick={() => modalEdit()} className={styles.iconTimes}><i className="fa fa-times" aria-hidden="true" ></i></span>
            </div>
            <div className={styles.model_body}>
              <div className={styles.editDevice} s>
                <div className={styles.edit}>
                  <div className={styles.form_control1} >
                    <label>Device:</label>
                    <input value={name1} onChange={(e) => setName1(e.target.value)} id="nameEit" type="text" placeholder="name" />

                  </div>
                  <div className={styles.form_control1}>
                    <label>Mac Adress:</label>
                    <input value={mac1} onChange={(e) => setMac1(e.target.value)} id="macEdit" type="text" placeholder="Mac Adress" readonly />

                  </div>
                  <div className={styles.form_control1}>
                    <label>IP Adress:</label>
                    <input value={ip1} onChange={(e) => setIp1(e.target.value)} id="ipEdit" type="text" placeholder="IP" readonly />

                  </div>
                  <div className={styles.form_control1}>
                    <label>Create Date:</label>
                    <input value={date1} onChange={(e) => setDate1(e.target.value)} id="dateEdit" type="text" placeholder="dd/mm/yy" readonly />

                  </div>
                  <div className={styles.form_control1}>
                    <label>Power:</label>
                    <input value={power1} onChange={(e) => setPower1(e.target.value)} id="numberEdit" type="number" placeholder="Power" />

                  </div>
                  <small className="error-toggle"></small>
                </div>
              </div>
            </div>
            <div className={styles.model_footer}>
              <button onClick={() => SaveEdit(index)}>Save</button>
            </div>
          </div>
        </div>
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
                    data.map((divice, index) => (

                      <tr key={index}>
                        <td>{divice.device}</td>
                        <td>{divice.macAdress}</td>
                        <td>{divice.ip}</td>
                        <td>{divice.createDate}</td>
                        <td>{divice.power}</td>

                        <div className={styles.action}>
                          <span onClick={() => deletehandle(index)} className={styles.delete}><i className="fa fa-trash" aria-hidden="true"></i></span>
                          <span onClick={(e) => Editehandle(index)} className={styles.edit} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                        </div>
                      </tr>

                    ))
                  }


                </tbody>
              </table>
              <div className={styles.total}>
                <h2>Total:</h2>
                <span className={styles.spanTotal}>{total}</span>
              </div>
            </div>
            <div className={styles.Devices}>
              <div className={styles.chart}>

                <Doughnut datasetIdKey='id' data={data1} width={400} height={400} options={{
                  maintainAspectRatio: false,
                }}
                />

              </div>

              <div className={styles.addDevices}>
                <div className={styles.add}>

                  <div className={styles.formcontrol} >
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name..." />
                    <small className={styles.loi}>{loading1 ? "Không được để trống" : ""}</small>

                  </div>
                  <div className={styles.formcontrol}>
                    <input id="mac" type="text" placeholder="Mac Adress..." value={mac} onChange={(e) => setMac(e.target.value)} />
                    <small className={styles.loi}>{loading2 ? "Không được để trống" : ""}</small>

                  </div>
                  <div className={styles.formcontrol}>
                    <input id="ip" type="text" placeholder="IP..." value={ip} onChange={(e) => setIp(e.target.value)} />
                    <small className={styles.loi}>{loading3 ? "Không được để trống" : ""}</small>
                    <span></span>
                  </div>
                  <div className={styles.formcontrol}>
                    <input id="date" type="text" placeholder="dd/mm/yy" value={date} onChange={(e) => setDate(e.target.value)} />
                    <small className={styles.loi}>{loading4 ? "Không được để trống" : ""}</small>

                  </div>
                  <div className={styles.formcontrol}>
                    <input id="number" type="number" placeholder="Power..." value={power} onChange={(e) => setPower(e.target.value)} />
                    <small className={styles.loi}>{loading5 ? "Không được để trống" : ""}</small>

                  </div>
                  <small className={styles.errortoggle}></small>
                  <div className={styles.bntbutton}>

                    <button type="submit" onClick={handleAdd} className={styles.submit} >ADD DEVICE</button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        )

      </div>
    </>
  )
}
