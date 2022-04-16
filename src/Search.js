import React from 'react';
import {Link} from 'react-router-dom';
  

class CityRow extends React.Component {
    render() {
      const city = this.props.city;
      const name = city.name; 
      return (
        <tr>
          <td><Link to={'/'+name}>{name}</Link></td>
          <td>{city.temp}</td>
        </tr>
      );
    }
}

class CityTable extends React.Component {
    render() {
      const filterText = this.props.filterText;
  
      const rows = [];
  
      this.props.cities.forEach((city) => {
        if (city.name.indexOf(filterText) === -1) {
          return;
        }
        rows.push(
          <CityRow
            city={city}
            key={city.name}
          />
        );
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  
  class SearchBar extends React.Component {
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
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <CityTable
            cities={this.props.cities}
            filterText={this.state.filterText}

          />
        </div>
      );
    }
  }

export default Search;
  
  
  