import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const { id } = useParams();
    const getMovies = async () => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const json = await response.json();
        setMovie(json.data.movie);
        setLoading(false);
    };

    console.log(movie);

    useEffect(() => {
        getMovies();
    }, []);

    return (loading ? <h1>Loading...</h1> :
        <div>
            <img src={movie.large_cover_image} />
            <h2>{movie.title}</h2>
            <p>년도: {movie.year}</p>
            <p>평점: {movie.rating}</p>
            <p>시간: {movie.runtime}분</p>
            <p>장르</p>
            <ul>
                {movie.genres.map(genre => <li key={genre}>{genre}</li>)}
            </ul>
            <p>트레일러</p>
            <iframe allowfullscreen="1" frameborder="0" src={`https://www.youtube.com/embed/${movie.yt_trailer_code}?autoplay=1`}></iframe>

            <p>다운로드</p>
            <ul>
                {movie.torrents.map(torrent => 
                <li>
                    <a href={torrent.url}>{torrent.quality} torrent</a>
                    <p>{torrent.size}</p>
                </li>
                )}
            </ul>
        </div>);

}
export default Detail;