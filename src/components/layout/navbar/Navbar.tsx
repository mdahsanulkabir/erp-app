import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import useAuth from '../../../hooks/useAuth';
import useLogout from '../../../hooks/useLogout';

export default function Navbar() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();
    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    return (
        <nav className={styles.nav}>
            <Link to='/'><h1>Logo</h1></Link>
            <ul style={{display: 'flex', gap:'10px'}}>
                {
                    auth?.userEmail 
                    ?   <>
                            
                            <li style={{fontWeight: 700, textDecoration: 'underline', color: 'white'}}>{auth.userName}</li>
                            <button onClick={signOut}>Sign Out</button>
                        </>
                    : <Link to='/login'>Login</Link>
                }

            </ul>
        </nav>
    )
}