import { useState } from "react"

import './RegisterAndLogin.css'
import axios from 'axios'
import {BASE_ADDRESS} from "../Key";



const UserRegistrationAndLogin = () => {



    //  < ---------------------------- FOR LOGIN SYSTEM ----------------------------------------------------->
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""

    })
    const handleLoginChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    }

    const handleOnLogin = async (e) => {
        e.preventDefault();
    
        const url = BASE_ADDRESS + "/auth/user/login";
    
        try {
            const response = await axios.post(url, userLogin, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                localStorage.setItem("Token" , response.data.Token) ;
                window.location.href = "/study" ;
                setUserLogin({
                    email: "",
                    password: ""
                });
            } else {
                console.log("Request failed. Status:", response.status);
                // Handle other status codes, show messages, etc.
            }
        } catch (error) {
            console.error('Error:', error.response.data.message); // Log error message
            // Handle error, show message to the user, etc.
        }
    };
    
    // <----------------------------------------------------------------------------------------------------------->
    return (<>

        <div className="main-rl-box">
            <div className="box">

                <Login createUserLogin={userLogin} handleLoginChange={handleLoginChange} handelOnSubmit={handleOnLogin} />
                
            </div>
        </div>

    </>)



};
// <-------------------------------------  LOGIN PAGE --------------------------------------------------------->

const Login = ({ createUserLogin, handleLoginChange, handelOnSubmit }) => {
    return (<>
        <div className="inner-box ">


        <form method='POST' onSubmit={handelOnSubmit}>
    <div className="input-box">
        <h1>Login</h1>
    </div>
    <div className="input-box">
        <label htmlFor="email">Email</label><br />
        <div className="edit-box">
            <i className="fa-solid fa-envelope"></i>
            <input
                required
                id="email" // Add unique id
                placeholder="example@mail.com"
                onChange={handleLoginChange}
                name="email"
                type="email"
                value={createUserLogin.email}
            />
        </div>
    </div>

    <div className="input-box">
        <label htmlFor="password">Password</label><br />
        <div className="edit-box">
            <i className="fa-solid fa-lock"></i>
            <input
                required
                id="password" // Add unique id
                placeholder="password"
                onChange={handleLoginChange}
                name="password"
                value={createUserLogin.password}
                type="password"
            />
        </div>
    </div>
    
    <div className="input-box">
        <button className="btn" type="submit">Submit</button>
    </div>
</form>



        </div>
    </>
    )
}

// <------------------------------------ REGISTRATION PAGE --------------------------------------------------->

const Registration = () => {

    const pp = "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";

    const [createUser, setCreateUser] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
        profile: pp

    })
    const [Profile, setProfile] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfile(URL.createObjectURL(event.target.files[0]));
        }
    }
    if (Profile) {
        createUser.profile = Profile;
    }
    const handleChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name]: e.target.value });

    }

    const handelOnSubmit = async (e) => {

        e.preventDefault();

        const url = LOCAL_ADDRESS + "/auth/user/registration";

        const response = await axios.post(url, createUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            window.alert("user saved !")

            window.location.href = "/study" ;
        } else {
            window.alert("user not saved !")
        }

        setCreateUser({
            username: "",
            email: "",
            password: "",
            re_password: "",
            profile: pp

        })
    }





    return (
        <div id="rg-box" className="inner-box " >


            <form method='POST' onSubmit={handelOnSubmit}>
                <div className="input-box">
                    <h1>Registrations</h1>
                </div  >
                <div style={{ width: "50px" }} className="input-box"><img width="50px" src={createUser.profile} alt="Profile" /></div>
                <div id="flex-box">
                    <div className="input-box" >
                        <label>Full Name</label>
                        <div className="edit-box">
                            <i className="fa-solid fa-user"></i>
                            <input required onChange={handleChange} name="username" type="text" value={createUser.username} />
                        </div>

                    </div >
                    <div className="input-box">
                        <label >Email</label>
                        <div className="edit-box">
                            <i className="fa-solid fa-envelope"></i>
                            <input required onChange={handleChange} name="email" type="email" value={createUser.email} />
                        </div>

                    </div >
                </div>



                <div id="flex-box">
                    <div className="input-box">
                        <label>Password</label><br />
                        <div className="edit-box">
                            <i className="fa-solid fa-lock"></i>
                            <input required onChange={handleChange} name="password" value={createUser.password} type="password" />
                        </div>

                    </div>
                    <div className="input-box">
                        <label>Re-enter Password</label><br />
                        <div className="edit-box">
                            <i className="fa-solid fa-lock"></i>
                            <input required onChange={handleChange} value={createUser.re_password} name="re_password" type="text" />
                        </div>

                    </div>
                </div>
                <div id="flex-box">
                    <div className="input-box" >

                        <label> Profile Image </label><br />
                        <div className="edit-box">
                            <input style={{ padding: "0px" }} onChange={onImageChange} type="file" name="files" accept="image/*" />
                        </div>

                    </div>
                </div>
                <div className="input-box">
                    <button className="btn" type="submit">submit</button>
                </div>
            </form>


        </div>
    )
}
export default UserRegistrationAndLogin;
