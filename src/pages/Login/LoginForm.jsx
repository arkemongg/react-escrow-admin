import styles from './styles/LoginForm.module.css'
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.jsx"
// import LoadingArea  from '../GlobalTemplates/LoadingArea';
// import { axiosInstance, validatePassword } from '../AxiosHeaders';
const LoginArea = () => {
    
    const [hidden , setHidden]= useState(true)
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()

    const [errorMessage,setErrorMessage] = useState("")

    const { isLogged, login, logout } = useAuth();


    const handleLogin = (event)=>{
        event.preventDefault()
        login("token")
        
        // const pass = validatePassword(password)
        // if(!pass){
        //     setErrorMessage("Invalid password.")
        //     return;
        // }
        // if(username.trim()==="" || username.length<4){
        //     setErrorMessage("Invalid username.")
        //     return;
        // }

        // setHidden(false)
        // setTimeout(() => {
        //     const getJWT = async ()=>{
        //         try{
        //             const response =await axiosInstance.post('/auth/jwt/create',{
        //                 username: username,
        //                 password: password
        //             })
        //             return response;
        //         }catch(error){
        //             throw error
        //         }
        //     }
        //     const data = getJWT()
        //     data.then(data=>{
        //         if(data.status===200){
        //            login(data.data.access)
        //            Navigate('/dashboard')
        //         }
        //     }).catch(err=>{
        //         setHidden(true)
        //         if (err.response) {
        //             if(err.response.data.detail){
        //                 setErrorMessage(err.response.data.detail)
        //             }else{
        //                 setErrorMessage("Unexpected error.")
        //             }
                    
        //         } else {
        //             setErrorMessage("No response received from the server.");
        //         }
        //     })

        // }, 2000);
    }
   
    return (
        <>
            <section className={`${styles.LoginFormSection}`}>
                <div className={`${styles.LoginFormArea}`}>
                {/* <LoadingArea hidden={hidden} /> */}
                <div className={`${styles.FormArea} ${hidden?'':'hidden'}`}>
                        <div className="titleArea text-xl text-center font-bold p-8">
                            Escrow Admin Login
                        </div>

                        <hr />
                        <div className="flex flex-col items-center mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Sign in
                                    </h1>
                                    <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                            <input onChange={event=>setUsername(event.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Username" required />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                            <input onChange={event=>setPassword(event.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                        </div>
                                        <p className={`text-sm text-error ${errorMessage?"":"hidden"}`}>{errorMessage}</p>
                                        {/* <div className="flex items-center justify-between">
                                            {/* <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"/>
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                                </div>
                                            </div> 
                                            <Link to="/resetpassword" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                                        </div> */}
                                        <button type='submit' className="w-full text-white btn-primary  font-medium  px-5 py-2.5 text-center">Sign in</button>
                                        {/* <p className="text-sm text-black">
                                            Don’t have an account yet? <Link to="/register" className="font-bold text-primary hover:underline">Sign up</Link>
                                        </p> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default LoginArea;