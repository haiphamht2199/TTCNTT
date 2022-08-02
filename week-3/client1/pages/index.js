import React, { useEffect, useContext, useReducer, useState } from 'react';
import jsCookie from 'js-cookie';
import axios from 'axios'
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
export default function login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const router = useRouter();
  //login
  const Login = async () => {
    setLoading1(name ? false : true);
    setLoading2(password ? false : true);
    if (name && password) {
      const data = {
        name,
        password
      }
      const res = await axios.post('http://localhost:5000/signin', data);
      if (res.data !== "no") {
        Cookies.set('name', res.data);
        router.push('/dashboard');
      } else {
        setLoading(true)
      }
    }

  }
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1>SOIOT SYSTEM</h1>
        <div className={styles.form_control} >
          <input value={name} onChange={(e) => setName(e.target.value)} id="email" type="text" placeholder="user name" />
          <span></span>
          <small className={styles.loi}>{loading1 ? "Không được để trống" : ""}</small>
        </div>
        <div className={styles.form_control}>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="text" placeholder="password" />
          <span></span>
          <small className={styles.loi}>{loading2 ? "Không được để trống" : ""}</small>
        </div>
        <small className={styles.loi1}>{loading ? "Mật khẩu hoặc tài khoản sai!" : ""}</small>
        <div className={styles.bnt_button}>
          <button onClick={Login} type="submit" class={styles.submit}>LOGIN</button>
          <button className={styles.submit_2}>or create new account</button>
        </div>
      </div>
    </div>
  )
}
