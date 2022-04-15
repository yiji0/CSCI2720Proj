class CityRow extends React.Component {
    render() {
      const city = this.props.city;
      const name = city.name; 
      return (
        <tr>
          <td>{name}</td>
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
  
  
  const CITIES = [
    {temp: '25°C', name: 'Hong Kong'},
    {temp: '25°C', name: 'Beijing'},
    {temp: '25°C', name: 'Shanghai'},
    {temp: '25°C', name: 'Harbin'},
    {temp: '25°C', name: 'Lahsa'},
    {temp: '25°C', name: 'Urumchi'},
    {temp: '25°C', name: 'Hohhot'},
    {temp: '25°C', name: 'Chengdu'},
    {temp: '25°C', name: 'Changsha'},
    {temp: '25°C', name: 'Kunming'},
    {temp: '25°C', name: 'Sanya'},
    {temp: '25°C', name: 'Taipei'},
    {temp: '25°C', name: 'Tokyo'},
    {temp: '25°C', name: 'Seoul'},
    {temp: '25°C', name: 'Singapore City'}
  ];
  
  ReactDOM.render(
    <Search cities={CITIES} />,
    document.getElementById('app')
  );