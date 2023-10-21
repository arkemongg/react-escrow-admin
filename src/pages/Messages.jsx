import { useNavigate } from 'react-router-dom';
import styles from './styles/Messages.module.css'
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';
import MessagesTable from './Messages/MessagesTable';
import { getToken } from './AxiosHeaders';

const Messages = () => {
    const { isLogged } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
        }
    }, [isLogged, navigate])
    return (
        <>
            <div className={styles.CategoryArea}>
                < MessagesTable />
            </div>
        </>
    );
};

export default Messages;




