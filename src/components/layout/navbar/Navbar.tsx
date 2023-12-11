import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import useAuth from '../../../hooks/useAuth';

export default function Navbar() {
    const { auth } = useAuth();
    return (
        <nav className={styles.nav}>
            <Link to='/'><h1>Logo</h1></Link>
            <ul style={{display: 'flex', gap:'10px'}}>
                {
                    auth?.userEmail 
                    ?   <>
                            
                            <li style={{fontWeight: 700, textDecoration: 'underline', color: 'white'}}>{auth.userName}</li> 
                        </>
                    : <Link to='/login'>Login</Link>
                }

            </ul>
        </nav>
    )
}