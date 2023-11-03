import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

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

    return (
        <div className={styles.container}>
            {
                loading ? (
                    <div className={styles.loader}>
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className={styles.movie}>
                        <img className={styles.movie__img} src={movie.medium_cover_image} />
                        <h2 className={styles.movie__title}>{movie.title}</h2>
                        <p className={styles.movie__year}>{movie.year}년 출시</p>
                        <p className={styles.movie__rating}>평점: {movie.rating}</p>
                        <p className={styles.movie__runtime}>시간: {movie.runtime}분</p>
                        <p className={styles.genre}>장르</p>
                        <ul className={styles.movie__genres}>
                            {movie.genres.map(genre => <li key={genre}>{genre}</li>)}
                        </ul>
                        <p className={styles.trailer}>트레일러</p>
                        <iframe allowfullscreen="1" frameborder="0" src={`https://www.youtube.com/embed/${movie.yt_trailer_code}?autoplay=1`}></iframe>

                        <p className={styles.download}>다운로드</p>
                        <ul className={styles.movie__torrents}>
                            {movie.torrents.map(torrent =>
                                <li>
                                    <a href={torrent.url}>{torrent.quality}</a>
                                    <p>{torrent.size}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                )
            }
        </div>
    );

}
export default Detail;