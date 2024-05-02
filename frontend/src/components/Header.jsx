import {Link} from "react-router-dom"
import { TbMovie } from "react-icons/tb"
import { FaUserCircle } from "react-icons/fa";

export default function Header(){
    
    return(
        <>
        <header>
            <h1><Link to='/'>What to see?</Link></h1>
            <nav>
                <Link to='/' className="Hjem_side"> <TbMovie className="filmIkon" /> Hva skal jeg se?</Link>
                <Link to='genre'>Bla gjennom sjangere</Link>
                <Link to='#'> <FaUserCircle className="brukerIkon" /> Bruker? </Link>
            </nav>
        </header>
        
        </>
    )
}