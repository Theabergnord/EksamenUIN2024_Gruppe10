import {Link} from "react-router-dom"
import { TbMovie } from "react-icons/tb"
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "./UserContext";

export default function Header(){
    const { currentUser } = useUser()
    
    return(
        <>
        <header>
            <h1><Link to='/'>What to see?</Link></h1>
            <nav>
                <Link to='/' className="Hjem_side"> <TbMovie className="filmIkon" /> Hva skal jeg se?</Link>
                <Link to='genre'>Bla gjennom sjangere</Link>
                {currentUser ? (
                <Link to='users'> <FaUserCircle className="brukerIkon" />{currentUser.name}</Link>
                ) : (
                <Link to='users'> <FaUserCircle className="brukerIkon" /> Bruker?</Link>
                )}
            </nav>
        </header>
        
        </>
    )
}