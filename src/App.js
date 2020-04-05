import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap'

import MovieComponent from './components/MovieComponent'
import Header from './components/Header'
import SideBar from './components/SideBar'

import InputRange from 'react-input-range';
import Pagination from "react-js-pagination";
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube';

import "react-input-range/lib/css/index.css"

const apiKey = '35975dc7fe7b3fef35d42864fcca143c'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isloading: true,
      movies: [], //concat to load more movies later
      pageNumber: 1,
      modal: false,
      allMovies: [],
      search: '',
      category: 'popular',
      trailer: '',
      totalResult: 0,
      value: {
        min: 5,
        max: 10 //initial slider value
      }
    }
  }

  fetchMovies = async () => {
    const { pageNumber } = this.state

    //display popular movies by default
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`

    const response = await fetch(url)
    const data = await response.json();
    const movies = data.results;
    const newMovies = this.state.movies.concat(movies);

    this.setState({
      movies: newMovies,
      allMovies: newMovies,
      totalResult: this.state.totalResult
    });
  }

  sortByPopularity = () => {
    let { allMovies } = this.state;
    allMovies = allMovies.sort((a, b) => b.popularity - a.popularity);

    this.setState({
      movies: allMovies
    });
  };

  sortByRating = () => {
    let { allMovies } = this.state;
    allMovies = allMovies.sort((a, b) => b.vote_average - a.vote_average);

    this.setState({
      movies: allMovies
    });
  };

  onSearch = search => {
    console.log(search)
    const { movies } = this.state;
    const filteredMovies = movies.filter(
      ({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({
      movies: filteredMovies
    });
  };

  componentDidMount() {
    const { category } = this.state
    this.fetchMovies(category) 
  }

  filterByRating = (value) => {
    const { movies } = this.state
    this.setState({ value: value })
    let filterRating = movies.filter((movie) => movie.vote_average >= value.min && movie.vote_average <= value.max)
    this.setState({
      movies: filterRating
    })
  }

  handlePageChange = async (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    let data = await fetch(url)
    let dataResult = await data.json();
    this.setState({ movies: dataResult.results })
  }

  openModal = async (movieId) => {

    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US` //get movie id
    let data = await fetch(url);
    let resultData = await data.json();
    this.setState({ modal: true })
    this.setState({ trailer: resultData.results[0].key })
  }

  //side bar options
  options = async (categoryName) => {
    const { pageNumber } = this.state
    this.setState({ category: `${categoryName}` })
    console.log("parameter", categoryName)

    if (categoryName === 'top-rated') {
      let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNumber}`
      let data = await fetch(url);
      let result = await data.json()
      this.setState({ movies: result.results })
    } else if (categoryName === 'popular') {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-USpage=${pageNumber}`
      let data = await fetch(url)
      let result = await data.json()
      this.setState({ movies: result.results })
    } else {
      let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNumber}`
      let data = await fetch(url)
      let result = await data.json()
      this.setState({ movies: result.results })
    }
  }

  render() {
    const { movies } = this.state
    return (
      <div>
        <Container fluid style={{ padding: 0 }}>
          <Header onSearch={this.onSearch} />
          <Row className="m-auto">
            <Col sm={2} className="" style={sideBar}>
              <SideBar options={this.options} />
              <h6 style={{ marginTop: 40 }}> Filters</h6>
              <span style={{ fontSize: 12, fontFamily: 'Roboto' }}> By Rating</span>
              <form className='filterform'>
                <InputRange
                  draggableTrack
                  maxValue={10}
                  minValue={0}
                  value={this.state.value}
                  onChange={value => this.filterByRating(value)}
                />
              </form>
            </Col>

            <Col sm={10}>
              <Row>
                <h3 className="text-white  pt-5" style={{ paddingLeft: 16 }}> Discover movies</h3>
                <div id="sortGroup" style={{ marginLeft: 'auto' }}>Sort by:
                <DropdownButton className="sortButton" id="dropdown-basic-button" title="Sort By">
                    <Dropdown.Item onClick={this.sortByPopularity} href="#/action-1">Popularity</Dropdown.Item>
                    <Dropdown.Item onClick={this.sortByRating} href="#/action-2">Rating</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Row>
              <h6 className='text-muted pl-3 text-white'>─ browse movies by popularity, rating and see what's playing now. </h6>
              <MovieComponent movieList={movies} openModal={this.openModal} />
              <div className='paginationRow'>
                <Pagination
                  activePage={this.state.pageNumber}
                  itemsCountPerPage={20}
                  totalItemsCount={450}
                  pageRangeDisplayed={5}
                  itemClass="page-item"
                  linkClass="page-link"
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </Col>
          </Row>
          <ReactModal
            isOpen={this.state.modal}
            style={{ overlay: {display:"flex",justifyContent:"center"}, content: {width:"70%",height:"70%", position:"relative"} }}
            onRequestClose={() => this.setState({ modal: false })}>
            <YouTube
              video = {this.state.trailer} 
              autoplay
              className="video"
              style={{ overlay: {display:"flex",justifyContent:"center"}, content: {width:"70%",height:"70%", position:"relative"} }}
            />
          </ReactModal>
        </Container>
      </div>
    )
  }
}

export default App;


const sideBar = { backgroundColor: '#1A1C20', color: 'white' }
