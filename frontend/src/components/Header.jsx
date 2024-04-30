import {Link} from "react-router-dom"

export default function Header(){
    
    return(
        <>
        <header>
            <h1><Link to='/'>What to see?</Link></h1>
            <nav>
                <Link to='/' className="Hjem_side">Hva skal jeg se?</Link>
                <Link to='genre'>Bla gjennom sjangere</Link>
                <Link to='#'>Bruker?</Link>
            </nav>
        </header>
        
        </>
    )
}