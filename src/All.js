import * as React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
class All extends React.Component{
  sortname(){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  sortlat(){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  sortlon(){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
    render() {
        return ( 
            <>
            <button onClick={this.sortname}>Sort by name</button>
            <button onClick={this.sortlat}>Sort by latitude</button>
            <button onClick={this.sortlon}>Sort by longitude</button>
            <table id="locationlist">
            <tr>
              <th>CityName</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
            <tr>
              <td><Link to="/HongKong">Hong Kong</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Beijing">Beijing</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Shanghai">Shanghai</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Harbin">Harbin</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Lhasa">Lhasa</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Urumchi">Urumchi</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Seoul">Seoul</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Tokyo">Tokyo</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Hohhot">Hohhot</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Singapore">Singapore City</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Chengdu">Chengdu</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Kunming">Kunming</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Sanya">Sanya</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td><Link to="/Taipei">Taipei</Link></td>
              <td>1</td>
              <td>1</td>
            </tr>
          </table>
          </>
        );
      }
}

class GetFav extends React.Component{
  render(){
    let i = this.props.i;
    let data = this.props.data;
    return(
      <tr>
      <td><Link to={'/'+data.name}>{data.name}</Link></td>
      <td>{data.lon}</td>
      <td>{data.lat}</td>
      </tr>
    )
  }
}

class Fav extends React.Component{
    state={
      location:null
    }

    async componentDidMount(){
      const url = "http://localhost:3000/favlist/";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({location:data});
    }
    render(){
        return(
          <table>
          <tr>
            <th>CityName</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
          {this.state.location.map((loc,index) => <GetFav data={loc} i={index} key={index}/>)}
          </table>
            
        )
        
    }
}
  
  export {All,Fav};

