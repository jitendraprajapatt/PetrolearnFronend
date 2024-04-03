import React ,{useState} from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Header.js";
import Homepage from "./Pages/Homepage/Home.js";
import StudyPage from "./Pages/StudyPage/Study.js";
import AboutPage from "./Pages/AboutPage/About.js";
import ContactPage from "./Pages/ContactPage/Contact.js";
import SubjectPage from "./Pages/SubjectPage/Subject.js" ;
import RegisterAndLogin from './Auth/RegisterAndLogin';
import PageNotFound from './Pages/404/Page404'
// child url 

function App() {

  const [url , setUrl] = useState() ;
  const [sName ,setSName] = useState([]) ;
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/Study' element={<StudyPage key={sName._id} subName ={setSName} setPath={setUrl } />} />
        <Route exact path='/About' element={<AboutPage />} />
        <Route exact path='/Contact' element={<ContactPage />} />
        <Route exact path={url} element={<SubjectPage subject={sName}  />} />
        <Route exact path='/RegisterAndLogin' element={<RegisterAndLogin/>} />
        <Route path='*'  element={<PageNotFound/>} />
      </Routes>
 
   
    </div>
  );
}

export default App;
