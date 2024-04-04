import React, { useEffect, useState } from 'react';
import { Link, json } from "react-router-dom";
import { BASE_ADDRESS } from '../../Key';
import verifyUserToken from '../../Auth/Service';
import './Study.css'
import axios from 'axios'
const Study = ({ setPath, subName }) => {


    const [subjects, setSubject] = useState([]);

    function FetchSubject() {
        const url =BASE_ADDRESS + "/api/study/get/subject";
        fetch(url)
            .then(Response => {
                return Response.json();
            }).then(data => {
                setSubject(data);
            }).catch(e => {
                console.log(e + " api fetching error ");
            });
    }

    const [authFlag, setAuthFlag] = useState(localStorage.getItem("Token"));
    
    useEffect(() => {
        FetchSubject();
        
    }, []);




    return (
        <>
            <div className="main-study-box">
                <h1 className='page-name'>Petroleum engineering subjects </h1>
                <OperationBOx isAuth={authFlag} />
                <div className="center-box">

                    {
                        subjects.map(subject => {
                            const arrOfSubject = [subject.Name, subject._id];
                            let path = `/study/${subject.url}`;
                            return (
                                <div className='card-box' key={subject._id}>
                                    <div className='sub-box'>
                                        <img width="100%" height="200px" className="topic-img" src={subject.Image} alt="study-img" />
                                    </div>
                                    <div className='sub-box'>
                                        <h2>{subject.Name}</h2>

                                    </div>

                                    <div className='sub-box'>
                                        <h2><Link className="link" onClick={() => { setPath(path); subName(arrOfSubject) }} to={path} >Learn</Link></h2>
                                    </div>
                                </div>
                            );

                        })
                    }

                </div>
            </div>
        </>
    )



};

const OperationBOx = ({ isAuth }) => {

    const [actionUi ,setActionUi] = useState();

    if (isAuth) {

       

        return (
            <div className='Icon-box'>
                <div className='upper-box'>
                    <div className='box'>
                        <i className="fa-solid fa-plus"></i>
                        <a onClick={() => setActionUi(<Create />)} href='#popUp'>Add subject</a>
                    </div>
                    <div className='box'>
                        <i className="fa-solid fa-trash"></i>
                        <a onClick={() => setActionUi(<Delete />)} href='#popUp'>Delete subject</a>
                    </div>
                    <div className='box'>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <a onClick={() => setActionUi(<Update />)} href='#popUp'>Update subject</a>
                    </div>
                </div>
                {actionUi}
            </div>

        );


    }
}

const Create = () => {
    const [formData, setFormData] = useState({
        subjectName: '',
        image: ''
    });

    const handleInputChange = (e) => {
       
        
       if (e.target.type == 'file'){
        var reader = new FileReader();
        let imgUri = "" ;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            setFormData({
                ...formData,
                image : reader.result
            });
        };
       }else{
        setFormData({
            ...formData,
            subjectName : e.target.value ,
           
        });
        console.log(formData)
       }
        
    };

    const handleSubmit = (event) => {

        try{
            event.preventDefault();

            const url = BASE_ADDRESS + "/api/study/add/subject";
            const res =  axios.post(
                url,
               formData ,
                {
                    headers :{
                        "Content-Type":"application/json"
                    }
                })
                if(!res){
                    console.log("api hit error")
                }
                console.log(res)
            // Clear the form fields after submission
            setFormData({
                subjectName: '',
                image: ''
    
            });

        }catch(e){
            console.log("Error : " + e) 
        }
      
    };

    return (
        <div id='popUp' className='overlay-box'>
           
                <div className='box'>
                <div className='box-1'>
                    <a href='#'><i className="fa-solid fa-xmark"></i></a>
                        <form onSubmit={handleSubmit}>
                            <h1>Create new subject</h1>
                            <div className='input-box'>
                                <label>Subject Name:</label><br />
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleInputChange}
                                    placeholder='Enter subject name...'
                                />
                            </div>

                            <div className='input-box'>
                                <label>Image:</label><br />
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='input-box'>
                                <button className='btn' type="submit">Create</button>
                            </div>

                        </form>
                    </div>
                </div> 

        </div>
    )
}


const Delete = () => {
    const [formData, setFormData] = useState({
        subjectName: ''
    });

    const handleInputChange = (e) => {

        setFormData({
            ...formData,
           subjectName : e.target.value
        });
        console.log(formData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Here you can perform actions to upload the subject data
        // For example, you can send the data to an API using fetch or axios
        // Don't forget to include the image file in the FormData

        try{
            event.preventDefault();

            const url = BASE_ADDRESS + "/api/study/delete/subject";
            const res =  axios.post(
                url,
               formData ,
                {
                    headers :{
                        "Content-Type":"application/json"
                    }
                })
                if(!res){
                    console.log("api hit error")
                }
                console.log(res)
            // Clear the form fields after submission
            setFormData({
                subjectName: ''
            });

        }catch(e){
            console.log("Error : " + e) 
        }
    };

    return (
        <div id='popUp' className='overlay-box'>
           <div className='box'>
                <div className='box-1'>
                    <a href='#'><i className="fa-solid fa-xmark"></i></a>
                        <form onSubmit={handleSubmit}>
                            <h1>Delete exiting subject</h1>
                            <div className='input-box'>
                                <label>Subject Name:</label><br />
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleInputChange}
                                    placeholder='Enter correct subject name...'
                                />
                            </div>

                            <div className='input-box'>
                                <button className='btn' type="submit">Delete</button>
                            </div>

                        </form>
                    </div>
                </div> 

        </div>
    )
}

const Update = () => {
    const [formData, setFormData] = useState({
        subjectName: '',
        content: '',
        image: null,
        link: '',
    });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        const inputValue = type === 'file' ? files[0] : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Here you can perform actions to upload the subject data
        // For example, you can send the data to an API using fetch or axios
        // Don't forget to include the image file in the FormData

        console.log(formData);

        // Clear the form fields after submission
        setFormData({
            subjectName: '',
            content: '',
            image: null,
            link: '',
        });
    };

    return (
        <div id='popUp' className='overlay-box'>
           <div className='box'>
                <div className='box-1'>
                    <a href='#'><i className="fa-solid fa-xmark"></i></a>
                        <form onSubmit={handleSubmit}>
                            <h1>Create new subject</h1>
                            <div className='input-box'>
                                <label>Subject Name:</label><br />
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='input-box'>
                                <label>Image:</label><br />
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='input-box'>
                                <button type="submit">Create</button>
                            </div>

                        </form>
                    </div>
                </div> 
        </div>
    )
}
export default Study;
