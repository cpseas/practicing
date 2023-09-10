import { useEffect, useState } from 'react'

const Pokemon = () => {
    interface IPokemon {
        name: string
        front_default: string
    }

    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    const getPokemons = async (id: string) => {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const {name, sprites: {front_default}} = await data.json()
        return {name, front_default}
    }

    useEffect(() => {
        const fetchPokemons = async () => {
            const data: IPokemon[] = []
            const startIndex = (currentPage - 1) * itemsPerPage + 1
            const endIndex = startIndex + itemsPerPage - 1

            for (let index = startIndex; index <= endIndex; index++) {
                const pokemonData = await getPokemons(index.toString())
                data.push(pokemonData)
            }
            setPokemons(data)
        }

        fetchPokemons()
    }, [currentPage])

    const totalPages = Math.ceil(100 / itemsPerPage)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <section>
            {pokemons.map((pokemon, index) => (
                <div className='card' key={index}>
                    <img className='image' src={pokemon.front_default} alt={pokemon.name} />
                    <p className='title'> { pokemon.name } </p>
                </div>
            ))}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </section>
    )
}

export default Pokemon