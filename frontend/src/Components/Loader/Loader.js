
import "./Loader.css"

function Loader() {
    return (
        <div className="loader-page">
            <div className="spinner"></div>
            <p className="loader-text">Analyzing your resume...</p>
            <p className="loader-subtext">AI is reviewing your profile</p>
        </div>
    )
}

export default Loader;