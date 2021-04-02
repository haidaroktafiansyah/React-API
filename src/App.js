
import React from "react";
import BlogPost from './container/blogpost/BlogPost';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import './App.css';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import InsertData from './container/About/InsertData';
import Keranjang from './container/Cart/Keranjang';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Bakoel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/produk">Produk</Nav.Link>
              <Nav.Link href="/keranjang">List Keranjang</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/produk">
            <Produk />
          </Route>
          <Route path="/keranjang">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </div>
  );

  function Home() {
    return (
      <div>
        <h2>Iki Halaman Welcome</h2>
      </div>
    );
  }

  function About() {
    return (
      <Router>
        <InsertData />
      </Router>
    );
  }

  function Produk() {
    return (
      <div>
        <Router>
          <BlogPost />
        </Router>
      </div >
    );
  }

  function Cart() {
    return (
      <div>
        <Router>
          <Keranjang />
        </Router>
      </div >
    );
  }
}

export default App;
