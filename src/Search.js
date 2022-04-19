import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

class CityRowName extends React.Component {
    render() {
      const city = this.props.city;
      const name = city.name; 
      return (
        <tr>
          <td><Link to={'/'+name}>{name}</Link></td>
          <td>{city.lon}</td>
          <td>{city.lat}</td>
        </tr>
      );
    }
  }
  
  class CityTableName extends React.Component {
    render() {
      const filterText = this.props.filterText;
  
      const rows = [];
  
      this.props.cities.forEach((city) => {
        if (city.name.indexOf(filterText) === -1) {
          return;
        }
        rows.push(
          <CityRowName
            city={city}
            key={city.name}
          />
        );
      });
  
      return (
        <div className="container">
        <Table bordered striped hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        </div>
      );
    }
  }

  
  class SearchBarName extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
    
  
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            
          </p>
        </form>
      );
    }
  }

  class SearchName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',

      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    

  
    render() {
      return ( <div>
        <div><p>Search By Name</p>
          <SearchBarName
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableName
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
        </div>
        
        </div>
      );
    }
  }

  class CityRowLon extends React.Component {
    render() {
      const city = this.props.city;
      const lon = city.lon; 
      return (
        <tr>
          <td><Link to={'/'+city.name}>{city.name}</Link></td>
          <td>{lon}</td>
          <td>{city.lat}</td>
        </tr>
      );
    }
  }
  
  class CityTableLon extends React.Component {
    render() {
      const filterText = this.props.filterText;
  
      const rows = [];

      this.props.cities.forEach((city) => {
        if (city.lon.indexOf(filterText) === -1) {
          return;
        }
        rows.push(
          <CityRowLon
            city={city}
            key={city.name}
          />
        );
      });
  
      return (
        <div className="container">
        <Table bordered striped hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        </div>
      );
    }
  }

  
  class SearchBarLon extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }

    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search By Longitude"
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            
          </p>
        </form>
      );
    }
  }

  
  class SearchLon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',

      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    

  
    render() {
      return ( <div>
        <div><p>Search By Longitude</p>
          <SearchBarLon
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableLon
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
        </div>
        
        </div>
      );
    }
  }

  class CityRowLat extends React.Component {
    render() {
      const city = this.props.city;
      const lat = city.lat; 
      return (
        <tr>
          <td><Link to={'/'+city.name}>{city.name}</Link></td>
          <td>{city.lon}</td>
          <td>{lat}</td>
        </tr>
      );
    }
  }
  
  class CityTableLat extends React.Component {
    render() {
      const filterText = this.props.filterText;
  
      const rows = [];
  
      this.props.cities.forEach((city) => {
        if (city.lat.indexOf(filterText) === -1) {
          return;
        }
        rows.push(
          <CityRowLat
            city={city}
            key={city.name}
          />
        );
      });
  
      return (
        <div className="container">
        <Table bordered striped hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        </div>
      );
    }
  }

  
  class SearchBarLat extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
    
    

    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search By Latitude"
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            
          </p>
        </form>
      );
    }
  }

  
  class SearchLat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',

      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    

  
    render() {
      return ( <div>
        <div><p>Search By Latitude</p>
          <SearchBarLat
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableLat
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
        </div>
        
        </div>
      );
    }
  }
class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',

      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    

  
    render() {
      return ( <div>
        <div><p></p>
          <SearchName cities={this.props.cities}></SearchName>
        </div>
        <div><p></p>
          <SearchLon cities={this.props.cities}></SearchLon>
        </div>
        <div><p></p>
          <SearchLat cities={this.props.cities}></SearchLat>
        </div>
        
        </div>
      );
    }
  }
  export default Search;
  //ReactDOM.render(
  //  <Search cities={CITIES} />,
  //  document.getElementById('app')
  //);
