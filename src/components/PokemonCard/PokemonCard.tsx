
import PokeballLoader from '../PokeballLoader'
import { useState, useEffect, FC } from 'react'
import { Pokemon, PokemonData } from '../../interfaces/pokemonSpecies'

const PokemonCard: FC<{ pokemon: Pokemon, id: string }> = ({ pokemon, id }) => {

  const [loading, setLoading] = useState(true)

  const [pokeData, setPokeData] = useState<PokemonData>()


  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const results = await data.json();
      setPokeData(results);
      setLoading(false)
    }
    fetchData();
  }, [])


  const fromColor = "from-" + pokeData?.color.name + "-700"
  const toColor = "to-" + pokeData?.color.name + "-100"
  const { name } = pokemon
  return (
    <div className={["w-60 h-80 relative rounded-b-3xl shadow-xl flex items-center flex-col bg-gradient-to-b via-white ", fromColor, toColor].join(" ")}>

      {
        loading && <div className="w-full h-full absolute rounded-b-3xl flex items-center justify-center">  <PokeballLoader /></div>
      }


      {
        !loading && <>
          <div className={["relative text-center h-3/5 w-full shadow-xl bg-gradient-to-b from-cyan-50 rounded-b-full", "to-" + pokeData?.color?.name + "-600"].join(" ")}>

            <h1 className="p-3 uppercase font-black text-xl tracking-wide text-neutral-800 font-serif">{name}</h1>
            <img width="210px" height="210px" className="absolute left-1/2 -translate-x-1/2 -bottom-16"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
          </div>

          <div className="absolute bottom-0 w-full h-1/4">

          </div>
        </>
      }


    </div>
  )
}


export default PokemonCard;