import { useParams } from "react-router-dom";

export default function Genre(){
    const { genre } = useParams();
    return(
        <h2>{genre}</h2>
    )
}