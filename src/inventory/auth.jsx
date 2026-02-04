import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './auth.module.css'
import * as inv from './inventory.module.css'

function Form({Head, Foot}) {
    const {login} = useAuth();
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_domain
    async function Authorize(e) {
        
        e.preventDefault()
        await fetch(`${domain}/api/token/authorize`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": `${e.target.username.value}`,
                "password": `${e.target.password.value}`
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(response => {
            login(response.access)
            navigate('/inventory', )
        }).catch((error) => {
            console.error(`auth fetch error: ${error}`)
        })
        
    }
    return (
        <>
            
                <Head />
                <div className={`${styles.contain}`} >
                    <form className={styles.form} onSubmit={Authorize} id='authorization'>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id='username' autoComplete='off'/> <br />
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" />
                        </div>
                        <button type="submit" className={styles.submit} form='authorization'>Authorize</button>

                    </form>
                </div>
                <Foot />
            
        </>
    )
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Store the token in the component state, which persists for the session duration
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export {useAuth, Form}
