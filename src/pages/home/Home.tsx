import { Link } from 'react-router-dom';
import styles from './Home.module.css';
// import axios from '../../../config/axios.js';


const Home = () => {


    return (
        <section className={styles.home}>
            <div className={styles.formWrapper}>
                <h1>This is home component</h1>
            </div>
            <div className={styles.links}>
                <button className={styles.btn}><Link to='/create-role'>Create Role</Link></button>
                <button className={styles.btn}><Link to='/create-department'>Create Department</Link></button>
                <button className={styles.btn}><Link to='/create-user'>Create User</Link></button>
            </div>
        </section>
    );
};

export default Home;