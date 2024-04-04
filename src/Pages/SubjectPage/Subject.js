import React, { useEffect, useState } from 'react';
import "./Subject.css";
import { BASE_ADDRESS } from '../../Key';
import ReuseBox from './SubUi';

const Subject = ({ subject }) => {
    const [Name, id] = subject;
    const [headings, setHeadings] = useState([]);
    const [topics, setTopics] = useState([]);
    const [content, setContent] = useState({
        title: "",
        heading: "",
        description: "",
        Images: [],
        Points: []
    });

    const fetchHeadings = async () => {
        const url = BASE_ADDRESS + "/api/subject/heading/List";
        const res = await fetch(url);
        const data = await res.json();
        setHeadings(data);
    };

    const fetchTopics = async () => {
        const url = BASE_ADDRESS + "/api/subject/heading/List/topics";
        const res = await fetch(url);
        const data = await res.json();
        setTopics(data);
    };

    useEffect(() => {
        fetchHeadings();
        fetchTopics();
    }, []);

    const handleOnClick = (headingId) => {
        const selectedTopic = topics.find(topic => topic.header.TID === headingId);
        if (selectedTopic) {
            const { title, heading, summery, images, impPoint } = selectedTopic;
            
            setContent({
                title,
                heading,
                description: summery,
                Images: images || [],
                Points: impPoint || []
            });
            console.log(content.Images)
        }
    };

    return (
        <div className='main-subject-box'>
            <div className='box'>
                <div className='box1'>
                    <h3>{Name}</h3>
                    <ul>
                        {headings.filter(heading => heading.SID === id).map(heading => (
                            <li key={heading._id} onClick={() => handleOnClick(heading._id)}>{heading.title}</li>
                        ))}
                    </ul>
                </div>
                <div className='box2'>
                    <h2 style={{textAlign:"center", backgroundColor:"black",boxShadow: "0px 12px 24px rgba(2,30,84,.1)", color: "white", padding: "5px", borderRadius: "5px" }}>{content.title}</h2>
                    <p style={{backgroundColor:"aliceblue" ,padding:"5px" , margin:"5px"}}>{content.heading}</p>
                    <p style={{padding:"10px"}}>{content.description}</p>
                    <ul>
                        {content.Points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <div>
                        { content.Images.map((Img, index) => {
                            
                            return (
                               <img width="200px" height="200px" src={Img} alt='Images' key={index} />
                            )
                        })}
                    </div>
                </div>
                <div className='opr-box'>
                    <OperationBox prob={subject} />
                </div>
            </div>
        </div>
    );
};

const OperationBox = ({ prob }) => {
    const [authFlag, setAuthFlag] = useState(localStorage.getItem('Token'));
    
    const [actionUi, setActionUi] = useState(null);
    if(authFlag){
        return (
            <div className='Icon-box'>
                <div className='box'>
                    <i className="fa-solid fa-plus"></i>
                    <a onClick={() => setActionUi(<Create subject={prob} />)} href='#popUp'>Add subject</a>
                </div>
                <div className='box'>
                    <i className="fa-solid fa-trash"></i>
                    <a onClick={() => setActionUi(<Delete />)} href='#popUp'>Delete subject</a>
                </div>
                <div className='box'>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <a onClick={() => setActionUi(<Update />)} href='#popUp'>Update subject</a>
                </div>
                {actionUi && actionUi}
            </div>
        );
    }
    
};

const Create = ({ subject }) => {
    const [Name, id] = subject;

    return (
        <div id='popUp' className='popUp-box'>
            <div className='cl-box'>
                <div className='box-title'>
                    <h1>ADD NEW TOPIC</h1>
                </div>
                <div className='cl-icon'>
                    <a href='#'><i className="fa-solid fa-xmark"></i></a>
                </div>
            </div>
            <div className='container-box'>
                <ReuseBox SID={id} sName={Name} />
            </div>
        </div>
    );
};

const Delete = () => {
    return (
        <div id='popUp' className='popUp-box'>
            <div className='cl-box'>
                <h1> DELETE EXITING TOPIC</h1>
                <a href='#'><i className="fa-solid fa-xmark"></i></a>
            </div>
        </div>
    );
};

const Update = () => {
    return (
        <div id='popUp' className='popUp-box'>
            <div className='cl-box'>
                <h1>UPDATE EXITING TOPIC</h1>
                <a href='#'><i className="fa-solid fa-xmark"></i></a>
            </div>
        </div>
    );
};

export default Subject;
