import React from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-bootstrap';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" id="site_name">SKKU Grammar Check</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active" href="#" id = "tools">Choose Tools
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/LanguageTool">LanguageTool</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/GECToR">GECToR</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Fairseq-gec">Fairseq-gec</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/BERT-VERNET">BERT-VERNET</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Overall">Overall</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default Navbar;