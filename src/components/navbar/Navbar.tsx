import styles from './Navbar.module.css';

export default function Navbar () {
    return (
        <nav className={styles.nav}>
            <h1>Logo</h1>
            <ul>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    )
}