import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = Cookies.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token != undefined || token != null) {
            navigate('/');
        }

    })

    const register = async () => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                
            },
            body: JSON.stringify({ username, password})
        }
        try {
            const res = await fetch('http://localhost:5000/auth/register', options);
            //console.log(res);
            if (res.ok) {
                const data = await res.json();

                await new Promise((resolve) => {
                    toast.success(`${data.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: resolve ,
                    });
                });


            }
            else {
                const data = await res.json();
                toast.error(`${data.msg}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                //console.log(data);
            }
            setPassword("");
            setUsername("");

        }
        catch {
            toast.error('An error occurred', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    };

    return (
        <div className="container">
            <div className="container2 mt-3 col-sm-6 ">
                <form id="addUserForm" className="form m-auto">
                    <h3 className="textHead">Sign Up</h3>
                    <label htmlFor="name" className="label-data ">User Name</label><br />
                    <input type="text" name="" id="name" value={username} className="form-control input" placeholder="Email " onChange={(e) => { setUsername(e.target.value) }} /><br />
        
                    <label htmlFor="PWD" className="label-data">Password</label><br />
                    <input type="password" name="" id="PWD" value={password} className="form-control input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} /><br />    
                    <div className='remember-container'>
                        <input type="checkbox" name="" id="save" className="label-check" />
                        <label htmlFor="save" className="label-data">Remember me</label><br />
                    </div>
                    <div className="btn">
                        <button type="button" className="button " onClick={(e) => { register(e) }}>submit</button>
                    </div>
                </form>
                <br />
                <p className=" acc">I have an account?
                    <Link to="/login" className="signup">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register;
