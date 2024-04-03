import React, { useEffect, useState } from 'react';
import './Subject.css';
import { LOCAL_ADDRESS } from '../../Key';
import axios from 'axios'
const ReuseBox = ({SID , sName}) => {
    const [loading, setLoading] = useState(false);
    const [topicDataArr, setTopicDataArr] = useState([]);
    const [topicData, setTopicData] = useState({
        header :{
            SID,
            sName
        },
        title: "",
        heading: "",
        summery: "",
        images: [],
        impPoint: []
    });

    const handleOnChangeData = (e) => {
        const { name, value } = e.target;
        setTopicData({ ...topicData, [name]: value });
    };
// Add multiple points
    const [point, setPoint] = useState({
        impPoint: ""
    });
    const handleAddPoints = (e) => {
        
        const { name, value } = e.target;
        setPoint({ ...point, [name]: value });
    };

    const [pointArr, setPointArr] = useState([]);

    const onClickPointAdd = () => {
        if (point.impPoint.trim() !== "") {
            setPointArr([...pointArr, point.impPoint.trim()]);
            setPoint({ impPoint: "" });
        }
    };


// Add multiple images
const [imageFiles, setImageFiles] = useState([]);
const [image, setImage] = useState({
    imageArr: ""
});
const handleAddImages = (e) => {
    
    const { name, value } = e.target;
    setImage({ ...image, [name]: value });
};



const onClickImageAdd = () => {
    if (image.imageArr.trim() !== "") {
        setImageFiles([...imageFiles, image.imageArr.trim()]);
        setImage({ imageArr: "" });
    }
};



// Add single object into state Array 

    const handleOnClickCheck = async (e) => {
       // console.log(SID , sName)
        e.preventDefault();
        setLoading(true); // Start loading

        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(pointArr , imageFiles)
        // Add topicData to topicDataArr
        setTopicDataArr([...topicDataArr, { ...topicData, impPoint: pointArr ,images: imageFiles  }]);
    // empty state variable 
        setPointArr([])
        setImageFiles([])
       setTopicData({
        header :{
            SID,
            sName
        },
        title: "",
        heading: "",
        summery: "",
        images: [],
        impPoint: []
    }) 
        setLoading(false); // Stop loading

        
    };

// post data in new post 
const handleSubmit = (event) => {

    try{
        event.preventDefault();

        const url = LOCAL_ADDRESS + "/api/subject/topics/newPost";
        const res =  axios.post(
            url,
           topicDataArr ,
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
        
        setTopicDataArr([])

    }catch(e){
        console.log("Error : " + e) 
    }
  
};

    return (
        <>
        <form  method='post'>
        <div className='sub-box'>
                <div>
                    <label>Title</label><br />
                    <input type='text' name='title' onChange={handleOnChangeData}value={topicData.title} placeholder='Enter title here ... ' />
                </div>
                <div>
                    <label>Heading</label><br />
                    <input type='text' name='heading' onChange={handleOnChangeData} value={topicData.heading} placeholder='Enter heading here ... ' />
                </div>
                <div>
                    <label>Summary</label><br />
                    <textarea type='text' name='summery' onChange={handleOnChangeData} value={topicData.summery} placeholder='Enter summary here ... ' />
                </div>
                <div>
                    <label>Important Points</label><br />
                    <input type='text' onChange={handleAddPoints} name='impPoint' value={point.impPoint} placeholder='Enter point here ... ' />
                    <a onClick={onClickPointAdd}><i className="fa-solid fa-plus"></i></a>
                </div>
                <div>
                    <label>Image Link</label><br />
                    <input type='text' onChange={handleAddImages} name='imageArr' value={image.imageArr} placeholder='Enter image link here ... ' />
                    <a onClick={onClickImageAdd}><i className="fa-solid fa-plus"></i></a>
                </div>
                <button onClick={handleOnClickCheck}>{loading ? 'Loading...' : 'Check'}</button>
                {loading && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="loader"></div>
                            <p>Loading...</p>
                        </div>
                    </div>
                )}
            </div>

            <button onClick={handleSubmit}>submit</button>
        </form>
            
        </>
    );
};

export default ReuseBox;
