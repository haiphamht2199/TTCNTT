import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/log.module.css'
import Header from "../components/Header";
import LeftNavbar from "../components/LeftNavbar";
import Cookies from 'js-cookie';
export default function Logs() {
  const [logsList, setLogsList] = useState([]);
  const [page, setPage] = useState(1);
  const [ofset, setOfset] = useState(0);
  const [pageszise] = useState(8);
  const [nbPage, setNbPage] = useState(0);
  const [keyword, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //get Log
  useEffect(() => {
    if (Cookies.get("name")) {
      getLogsList();
    } else {
      router.push("/")
    }

  }, []);
  //prev page
  const prevPage = async () => {
    const pg = (page === 1 ? 1 : page - 1);
    setPage(pg);
    await getLogsList(pg)
  }
  //next page
  const nextPage = () => {
    const pg = (page < nbPage ? page + 1 : page);
    console.log(pg)
    setPage(pg);
    
    getLogsList(pg);



  }
  const getLogsList = async (kw = keyword, pg = page, pgSize = pageszise) => {
    try {
      const params = {
        page: pg,
        pageSize: pgSize,
        _key: kw
      }

      const res = await axios.post('http://localhost:5000/logs', params);
      console.log(res);
      if (res) {
        setLogsList(res.data.data);
        setNbPage(res.data.numberPage);
        setOfset(res.data.page);
        setLoading(true)
      } else {
        setLoading(false);
      }



    } catch (error) {
      console.log(error)
    }
  }

  //search
  const handleSearch = async () => {
    const kw = keyword;
    await getLogsList(kw);
  }
  //logout
  const handleLogout = () => {
    Cookies.remove("name");
    router.push("/");
  }
  return (
    <>
      <LeftNavbar handleLogout={handleLogout} />
      <Header />
      <div>
        <div className={styles.main}>
          {
            <div className={styles.cardBoad}>
              <div className={styles.card}>
                <div className={styles.cartHeader}>
                  <div className={styles.title}>
                    <h1>Actions Logs</h1>
                  </div>
                  <div className={styles.search}>
                    <input value={keyword} onChange={(e) => setKey(e.target.value)} type="text" className={styles.inputSearch} placeholder="name..." />
                    <button id="search" onClick={handleSearch}>Search</button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <td>Divice ID #</td>
                      <td>Name</td>
                      <td>Action</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody className={styles.log} id="logs">
                    {
                      logsList.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.action}</td>
                          <td>{item.date}</td>
                        </tr>
                      )
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className={styles.row}>
                <button onClick={prevPage} className={ofset == 1 ? styles.activePrevPage : styles.prev} aria-label='prev'
                >
                  <i className='fas fa-chevron-left' />
                </button>
                <span>{ofset}</span>
                <button onClick={nextPage} className={ofset === nbPage ? styles.activeNextPage : styles.next} aria-label='next'
                >
                  <i className='fas fa-chevron-right' />
                </button>
              </div>
            </div>

          }

        </div>
      </div>
    </>

  )
}
