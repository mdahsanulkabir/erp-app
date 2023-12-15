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
                <Link to='/create-role'>Create Role</Link>
                <Link to='/create-department'>Create Department</Link>
                <Link to='/create-user'>Create User</Link>
                <Link to='/product-capacity-unit'>Create Capacity Unit</Link>
                <Link to='/product-variant'>Create Product Variant</Link>
                <Link to='/product-series'>Create Product Series</Link>
                <Link to='/product-source-category'>Create Product Source Category</Link>
                <Link to='/product-base'>Create Product Base</Link>
                <Link to='/product-sku'>Create SKU</Link>
            </div>
        </section>
    );
};

export default Home;