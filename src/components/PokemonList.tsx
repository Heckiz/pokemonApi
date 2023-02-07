import { useState, useEffect } from "react";
import PokemonCard from './PokemonCard/PokemonCard'
export default function PokemonList() {
  const [pokeList, setPokeList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/`
      );
      const { results } = await data.json();
      setPokeList(results);
      setLoading(false);
    }
    fetchData();
  }, [])


  return (

    <div className="bg-red-300">
      <div className="h-24 w-full text-center fixed top-0 bg-black text-white">
      POKAPI
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center mt-24 mx-4 mx-lg-48 p-4 bg-blue-500" >
          {pokeList.map((pokemon, index) => (
            <PokemonCard key={index} id={index+1} pokemon={pokemon} />
          ))}
        </div>
      )}
      <div>
      <button>prev</button>
        <button>next</button>
      </div>
    </div>
  )


}