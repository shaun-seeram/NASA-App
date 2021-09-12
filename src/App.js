import './App.css';
import Header from './Components/Header';
import ImageData from './Components/ImageData';
import Footer from './Components/Footer';
import {useState} from 'react';

function App() {

  const [query, setQuery] = useState("pluto");

  return (
    <div className="App">
      <Header setQuery={setQuery}/>
      <ImageData query={query} />
      <Footer />
    </div>
  );
}

export default App;
