import { useState } from "react";
import Drop from "../DropPage/Drop";
import Loader from "../Loader/Loader";

function Home() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {loading === true && <Loader />}
            {loading === false && <Drop setLoading={setLoading} />}
        </div>
    )
}

export default Home;