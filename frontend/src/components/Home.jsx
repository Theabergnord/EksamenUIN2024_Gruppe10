import React from "react";
import MovieCard from "./MovieCard";

export default function Home(){
    
    return(
        <>
        <h2>Hei, bruker</h2>
        <div className="movieList">
          <MovieCard />
          <MovieCard />
        </div>
        
        </>
    )
}