import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaIdBadge, FaDumbbell, FaClipboardList, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/">
              <FaHome className={styles.icon} />
              <span className={styles.navText}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/aluno">
              <FaUser className={styles.icon} />
              <span className={styles.navText}>Aluno</span>
            </Link>
          </li>
          <li>
            <Link to="/professor">
              <FaIdBadge className={styles.icon} />
              <span className={styles.navText}>Professor</span>
            </Link>
          </li>
          <li>
            <Link to="/exercicio">
              <FaDumbbell className={styles.icon} />
              <span className={styles.navText}>Exercicio</span>
            </Link>
          </li>
          <li>
            <Link to="/fichatreino">
              <FaClipboardList className={styles.icon} />
              <span className={styles.navText}>Ficha de Treino</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <button className={styles.logoutButton} onClick={logout}>
                <FaUserCircle className={styles.icon} />
                <span className={styles.navText}>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
