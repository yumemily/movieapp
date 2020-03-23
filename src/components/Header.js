import React from 'react'
import { Nav, Form, Button, Navbar, FormControl } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    filterSearch = e => {
        this.setState({ search: e.target.value })
        this.props.onSearch(this.state.search)
    };

    render() {
        return (
            <div>
                <Navbar expand="lg">
                    <Navbar.Brand className="text-white" href="#home"><i className="fa fa-signal" aria-hidden="true"></i> MOVIE APP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Form inline>
                            <Button onClick={() => this.props.onSearch(this.state.search)} style={searchButton} variant="light"> <span>
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span></Button>
                            <FormControl value={this.state.search}
                                onChange={e => this.filterSearch(e)} style={searchInput} type="text" placeholder="Search movies..." className="mr-sm-2"
                            />

                            {/* <i class="fa fa-user-circle-o" aria-hidden="true"></i> */}
                            <img id="avi" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxZpVygiyGOUMdjX72aoyMBbTqh6h1e4gY7Uq-Kk7xrY6bUFAf' alt='' />
                            <i style={{ color: 'white' }} class="fa fa-caret-down" aria-hidden="true"></i>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const searchButton = { position: 'absolute', right: 1010, backgroundColor: '#FC4D55', borderStyle: 'none', color: 'white' }
const searchInput = { position: 'absolute', right: 800, backgroundColor: '#FC4D55', borderStyle: 'none', color: 'white' }