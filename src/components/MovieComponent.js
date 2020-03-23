import React from 'react'
import { Card, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'

export default function MovieComponent(props) {
    let myCallback = (id) => {
        props.openModal(id)}
    const { badgeGreen, badgeFront, badgeRed, imgStyle, rowStyle, movieTitle, trailerBtnPosition, trailerBtnStyle } = styles
    let htmlMovie = props.movieList.map((movie) => {
    
        return (

            <div class="flip-container" onTouchStart="this.classList.toggle('hover');">
                <div class="flipper">
                    <div class="front">
                        <Card id="cards" className="col-md-12 col-12" style={{ width: '100%', position: 'relative', zIndex: 0 }}>
                            <Badge className='shadow-lg' style = {movie.vote_average >= 8 ? badgeGreen : movie.vote_average < 6 ? badgeRed : badgeFront} pill>
                                {movie.vote_average}
                            </Badge>{' '}
                            <Card.Img className="shadow-lg" variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 15 }}>{movie.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="back">
                        <Card id="cards" className="col-md-12 col-12" style={{ width: '100%' }}>
                            <Badge className='shadow-lg' style={movie.vote_average >= 8 ? badgeGreen : movie.vote_average < 6 ? badgeRed : badgeFront} pill>
                                {movie.vote_average}
                            </Badge>{' '}
                            <Card.Img style={imgStyle} className="shadow-lg" variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
                            <Card.Body>
                                <Card.Title style={trailerBtnPosition} ><Button onClick = {() => myCallback(movie.id)} style={trailerBtnStyle}><i class="fa fa-play-circle-o" aria-hidden="true"></i> Play trailer</Button></Card.Title>
                                <Card.Text style={movieTitle}>
                                    <div style={{fontWeight:'bold'}}>{movie.title}</div> 
                                    Released: {moment(movie.releaseDate).format('LL')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div>
                        </div>
                    </div>
                </div>
            </div>

        )
    })

    return (
        <div>
            <div style={rowStyle} className="row" >
                {htmlMovie}
            </div >
        </div>
    )
}

const styles = {
    badgeGreen: { backgroundColor: '#7CC8CB', maxWidth: 40, top: -15, position: 'absolute', zIndex: 1 },
    badgeFront: { maxWidth: 40, top: -15, position: 'absolute', zIndex: 1 },
    badgeRed: { backgroundColor: '#FC4D55', maxWidth: 40, top: -15, position: 'absolute', zIndex: 1 },
    imgStyle: { filter: 'brightness(35%)' },
    rowStyle: { justifyContent: "space-around", paddingTop: 60, margin: '0 auto' },
    movieTitle: { fontSize: 12, height: '15rem', marginTop: 10, position: 'absolute', top: 30 },
    trailerBtnPosition : { position: 'absolute', top: 150, fontSize: 25, zIndex: 2 },
    trailerBtnStyle :{ backgroundColor: '#FC4D55', borderStyle: 'none', zIndex: 2 }
}



