import { useState } from "react"
import Loader from "./Loader"

const Card = () => {
    interface IMovie {
        director: string
        opening_crawl: string
        title: string
    }

    let defaultValue = {} as IMovie

    const [movie, setMovie] = useState<IMovie>(defaultValue)
    const [movieID, setMovieID] = useState<string>('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getData(movieID)
        setMovieID('')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieID(e.target.value)
    }

    const getData = async (id: string | null) => {
        if (id) {
            setLoading(true)
            const data = await fetch(`https://swapi.dev/api/films/${id}/`)
            const { director, opening_crawl, title }: IMovie = await data.json()
            setMovie({director, opening_crawl, title})
            setLoading(false)
        }
    }

    return (
        <div style={{textAlign: 'center', maxWidth: '50vw'}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id="movieID"
                        type="text"
                        value={movieID}
                        onChange={handleInputChange}
                        placeholder="Enter Movie ID"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {loading ?
                <Loader />
            :
                <>
                    <h1> {movie?.title} </h1>
                    <h2> {movie?.director} </h2>
                    <p> {movie?.opening_crawl} </p>
                </>
            }
        </div>
    )
}

export default Card