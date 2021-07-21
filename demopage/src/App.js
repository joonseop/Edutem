import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Overall from './components/Overall';
import Navbar from './components/Navbar';
import LTsite from './components/LTsite';
import GECToRsite from './components/GECToRsite';
import Fairseqsite from './components/Fairseqsite';
import BERTsite from './components/BERTsite'
import './bootstrap.css';

function App() {
  return (
    <div>
      <Navbar />
      <Route path="/" component={Overall} exact />
      <Route path="/LanguageTool" component={LTsite} />
      <Route path="/GECToR" component={GECToRsite} />
      <Route path="/Fairseq-gec" component={Fairseqsite} />
      <Route path="/BERT-VERNET" component={BERTsite} />
      <Route path="/Overall" component={Overall} />
    </div>
  );
}

export default App;
