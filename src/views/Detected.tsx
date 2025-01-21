import { useDB } from "@/hooks/DBHooks";
import { useLocation } from "react-router";

const Detected = () =>  {
    const {state} = useLocation();
    const {addFaces} = useDB();
    console.log('state', state);
    // store descriptors in lokijs db
    try {
        addFaces(state);
    } catch (error) {
        console.error('Error storing faces:', error);
    }

    return <div>Detected</div>;
    };

export default Detected;