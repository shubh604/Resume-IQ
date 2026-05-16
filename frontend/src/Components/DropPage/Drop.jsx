import { useState } from "react";
import axios from "axios";
import "./Drop.css"
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";

function Drop(props){

    const [jd,setjd] = useState("");
    const [image,setImage] = useState(null);
    
    function onDescriptionChange(event){
        setjd(prev=>(event.target.value));
    }

    function onImageChange(event){
        setImage(event.target.files[0])
    }

    function onDropOverHandler(event){
        event.preventDefault();
    }

    function onDropHandler(event){
        event.preventDefault();
        setImage(event.dataTransfer.files[0]);
    }

    const navigate = useNavigate();

    async function handleSubmit() {

    const formData = new FormData();

    if (jd.trim() !== "") {
        formData.append("jobDescription", jd);
    }

    if (image !== null) {
        formData.append("resume", image);
    }

    props.setLoading(true);

    try {
        const res = await axios.post("http://localhost:5000/api/resume/analyze", formData);
        if (res.data.success === true) {
            console.log("success:true", res.data);
            navigate("/resume-analysis", {
                state: {
                    analysis: res.data.data,
                    type: jd.trim() !== "" ? "jd" : "general"
                }
            });
        } else {
            console.log("success:false", res.data.message);
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        props.setLoading(false);
    }
}

    
    return(

        <div className="drop-page">
            <h1 className="main-heading">ResumeIQ</h1>
            <h2 className="sub-heading">AI-powered ATS Resume Analyzer</h2>
            <p className="hero-text">Upload your resume and get AI-driven ATS scoring, skill analysis, and tailored improvement suggestions.</p>
            

            <div className="imageDiv" onDragOver={onDropOverHandler} onDrop={onDropHandler}>
                <FiUploadCloud className="upload-icon"/>
                <p className="drag-text">Drag & Drop your resume here!</p>
                <p className="or-text">OR</p>
                <label htmlFor="id5" className="custom-upload">Choose Resume</label>
                <input className="resume-input" id="id5" type="file" accept=".pdf,.doc,.docx" onChange={onImageChange}></input>
                <div className="image-name">
            {
                image && <p className="image-name"> 📄{image.name}</p>
            }
            </div>
                
            </div>

            

            <div className="jd-section">
                <label className="jd-label" htmlFor="id1">Job Description</label>
                <textarea className="jd-textarea" id="id1" name="jd" value={jd} onChange={onDescriptionChange} placeholder="Paste the job description here..."/>
                <p className="jd-note">Optional — add a job description for more personalized feedback.</p>
            </div>

            <div className="button-wrapper">
                <button className="analyze-btn" onClick={handleSubmit}>Analyze Resume</button>
            </div>
        </div>


    )
}

export default Drop;