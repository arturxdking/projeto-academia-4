import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaIdBadge, FaDumbbell, FaClipboardList } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
