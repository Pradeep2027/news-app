import React, { useState } from 'react'
import {Link} from 'react-router-dom';

function NavBar({handleSearch}) {
  const [search,setSearch] = useState("");

  const searchFun = (e) => {
    e.preventDefault();
    handleSearch(search);
    setSearch("");
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">NewsMonkey</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
          </ul>
          {/* <form className="d-flex" role="search" onSubmit={this.handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search news" aria-label="Search"
              value={this.state.search}
              onChange={(e)=>this.setState({search:e.target.value})}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
          <form className="d-flex ms-auto" onSubmit={searchFun}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    </>
  )
}

export default NavBar;