import { useState } from "react";
import axios from "axios";
import "./Drop.css"
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";

function Drop(props){

    const [jd,setjd] = useState("");
    const [image,setImage] = useState(null);
    
    function onDescriptionChange(event){
        setjd(event.target.value);
    }

    function onImageChange(event){
        setImage(event.target.files[0]);
    }

    function onDropOverHandler(event){
        event.preventDefault();
    }

    function onDropHandler(event){
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if(file && file.type !== "application/pdf"){
            toast.error("Only PDF files are allowed");
            return;
        }
        setImage(file);
    }

    const navigate = useNavigate();

    async function handleSubmit(){
        if(!image){
            toast.error("Please upload a resume");
            return;
        }
        if(image.type !== "application/pdf"){
            toast.error("Only PDF files are allowed");
            return;
        }
        if(image.size > 5 * 1024 * 1024){
            toast.error("File too large. Max 5MB allowed");
            return;
        }

        const formData = new FormData();
        if(jd.trim() !== ""){
            formData.append("jobDescription", jd);
        }
        formData.append("resume", image);

        props.setLoading(true);

        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/resume/analyze`, formData);
            if(res.data.success === true){
                navigate("/resume-analysis", {
                    state: {
                        analysis: res.data.data,
                        type: jd.trim() !== "" ? "jd" : "general"
                    }
                });
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        }
        catch(error){

            
    console.log("Full error:", error);
    console.log("Response:", error.response);
    console.log("Message:", error.message);
    const msg = error.response?.data?.message;
    toast.error(msg || "Something went wrong. Please try again");

        }
        finally{
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
                <input className="resume-input" id="id5" type="file" accept=".pdf" onChange={onImageChange}/>
                {image ? <p className="image-name">📄 {image.name}</p> : <p className="image-name">Supported format: PDF • Max size: 5MB</p>}
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
    );
}

export default Drop;