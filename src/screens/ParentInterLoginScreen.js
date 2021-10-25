import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from '../css/ParentInterLoginScreen.module.css'

const ParentInterLoginScreen = ({ history }) => {
  const parentLogin = useSelector((state) => state.parentLogin)

  useEffect(() => {
    if (parentLogin.parentInfo) {
      history.push('/parinte')
    }
  }, [history, parentLogin.parentInfo])

  return (
    <div className={styles.mainCard}>
      <div className={styles.logo}>
        <div className={styles.logoRow}>
          <img src='/img/tree.green.webp' alt='' className={styles.logoImg} />
        </div>
        <div className={styles.logoRow}>
          <span className={styles.logoText}>elmtree</span>
        </div>
      </div>
      <p className={styles.cardText}>
        Pentru a putea continua ca și părinte, trebuie fie să vă conectați la un
        cont deja existent sau să vă inregistrați cu unul nou.
      </p>
      <div className={styles.buttonContainer}>
        <Link to='/conectare/parinte/login' style={{ textDecoration: 'none' }}>
          <div className={styles.button}>Conectare</div>
        </Link>
        <Link
          to='/conectare/parinte/register'
          style={{ textDecoration: 'none' }}
        >
          <div className={styles.button} style={{ float: 'right' }}>
            Inregistrare
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ParentInterLoginScreen
