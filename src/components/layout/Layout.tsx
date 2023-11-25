import { Outlet } from "react-router-dom";

import Footer from "./footer/Footer"
import Navbar from "./navbar/Navbar"
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
            </div>
    );
};

export default Layout;
