import React, { Component } from 'react'
// import './SideBar.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup, } from 'react-bootstrap'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        const { sideBar, sideButton } = styles;

        return (

            <ListGroup variant="flush">
                <ListGroup.Item style={sideBar}><Button onClick = {() => this.props.options('popular')} style = { sideButton } > <i className="fa fa-fire" aria-hidden="true"></i> Most Popular</Button> </ListGroup.Item>
                <ListGroup.Item style={sideBar}><Button onClick = {() => this.props.options('nowplaying')} style={sideButton}><i className="fa fa-ticket" aria-hidden="true"></i> Now Playing </Button></ListGroup.Item>
                <ListGroup.Item style={sideBar}><Button onClick = {() => this.props.options('top-rated')} style={sideButton}><i className="fa fa-star" aria-hidden="true"></i> Top-Rated</Button></ListGroup.Item>
            </ListGroup>
        )
    }
}

const styles =
{
    sideBar: { backgroundColor: '#1A1C20', color: 'white' },
    sideButton: { backgroundColor: '#1A1C20', color: 'white', borderStyle: 'none', padding: 0, margin: 0 }

}
