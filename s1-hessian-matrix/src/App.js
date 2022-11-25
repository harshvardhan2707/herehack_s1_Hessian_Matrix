import { useState ,useEffect} from "react";
import React from "react"; 
import Axios from 'axios';
import $ from 'jquery';
import './App.css';

// function App() {
//   // set 
//   const [blogs, setBlogs] = useState(null);
//   const YOUR_API_KEY='CVAeJ2DxqjKRLzjWj65o6fuY-aMLEkG5Q4MeLXZBr58';
//   // const smd='random_joke';
//   const getJoke=()=>{
//     Axios.get('https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey='+YOUR_API_KEY+'&c=52.431,13.3845&z=16').then(
//       (response)=>{
//         console.log(response);
//       }
//     );
//   }
//   return (
//     <div>
//       <button onClick={getJoke}>Hello world</button>
//       <img src="" alt="" />
//     </div>
//   );
// }

// export default App;

//App.js
// import React, { useState } from 'react';
import {DisplayMapClass} from './DisplayMapClass';
import data from './API.json';


function App() {
  let textInput = React.createRef();
  const [loc,setLoc]=useState('Pune');
  const [lat,setLat]=useState(50);
  const [lon,setLon]=useState(0);
  function handleClick() {
  // console.log(textInput.current.value);
  setLoc(textInput.current.value);

}
  
  useEffect(()=>{
    let f=loc;
    if(f!='')
    // for
    Axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+f+'&apiKey='+data.YOUR_API_KEY).then((response)=>{
      // setLoc(response); 
      // L=response.json
      // const obj=JSON.parse(response)
      const L=JSON.stringify(response)
      const X=JSON.parse(L)
      // console.log(X[])
      // alert(X.items)
      console.log(X.data.items[0].address); 
      setLat(X.data.items[0].position.lat);
      setLon(X.data.items[0].position.lng);
      // DisplayMapClass.
    })},[loc]); 
return (
  <div>
      <input ref={textInput} placeholder="Type a message..." />
      <button onClick={handleClick}>Search Location</button>
  <DisplayMapClass lat={lat} lon={lon}/>
  </div>
  
  
);
}
export default App;