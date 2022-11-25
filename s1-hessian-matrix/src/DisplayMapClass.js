import * as React from 'react';
import { useState ,useEffect} from "react";
import data from './API.json';
// document.getElementById("searchBtn").addEventListener("click", function() {
//   this.render();
//   // geocode(platform,value)
// });
export class DisplayMapClass extends React.Component {
  
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
    // lat:this.props.lat,
    // lon:this.props.lon

  };
  

  // lat= this.props.lat;
  // lng= this.props.long;
  componentDidMount() {
    this.render();
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: data.YOUR_API_KEY
    });

    // useEffect(()=>{
    //   map.setCenter({lat:this.props.lat, lng:this.props.lon });
    //   map.setZoom(14);
    // },[this.props.lat,this.props)
    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    
    var map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over searched value(?)
        center: { lat: this.props.lat, lng: this.props.lon },
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    // const lat=this.props.lat;
    // const lon=this.props.lon;
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    this.setState({ map});
  }
  
  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    if(this.state.map)
    this.state.map.dispose();
  }

  render() {
    // this.state.map.setCenter(this.props.lat,this.props.lon);
    // this.setState({ map});
    // this.componentDidMount();
    return (
      // Set a height on the map so it will display
      
      // this.componentDidMount;
      this.mapRef && <div ref={this.mapRef} style={{ height: "1000px" }} />
    );
  }
}