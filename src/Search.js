import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

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
        <Container>
         
        <form>
          <input
            type="text"
            placeholder="Search By Name..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            className = "form-control"
          />
          <p>
            
          </p>
        </form>
        </Container>
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
      return ( 
        
        <div className="bg-light border">
          <Container>
          <p className = "text-center fs-1 fw-bold">Search By Name</p>
          </Container>
          <SearchBarName
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableName
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
          <br/><br/>
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
        <Container>
        <form>
          <input
            type="text"
            placeholder="Search By Longitude..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            className = "form-control"
          />
          <p>
            
          </p>
        </form>
        </Container>
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
      return ( 
        <div className="bg-light border">
          <Container>
          <p className = "text-center fs-1 fw-bold">Search By Longitude</p>
          </Container>
          <SearchBarLon
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableLon
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
          <br/><br/>
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
        <Container>
        <form>
          <input
            type="text"
            placeholder="Search By Latitude..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            className = "form-control"
          />
          <p>
            
          </p>
        </form>
        </Container>
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
      return ( 
        <div className="bg-light border">
          <Container>
          <p className = "text-center fs-1 fw-bold">Search By Latitude</p>
          </Container>
          <SearchBarLat
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTableLat
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
          <br/>
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
