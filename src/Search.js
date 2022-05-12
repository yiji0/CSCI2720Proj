import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class CityRowName extends React.Component {
  render() {
    const city = this.props.city;
    const name = city.name;
    return (
      <tr>
        <td><Link to={'/' + name}>{name}</Link></td>
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
      if (city.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 && city.name.toUpperCase().indexOf(filterText.toUpperCase()) === -1) {
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
      <>
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
      </>
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
            className="form-control"
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
      location: []

    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  async fetchLoc() {
    let res = await fetch('http://localhost:8000/loc1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({ location: l });
  }

  componentDidMount() {
    this.fetchLoc()
  }



  render() {
    return (
      <>
        <Container>
          <div>
            <Container>
              <p className="text-center fs-2 fw-bold">Search By Name</p>
            </Container>
            <SearchBarName
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <CityTableName
              cities={this.state.location}
              filterText={this.state.filterText}

            />
          </div>
          &nbsp;&nbsp;<Button variant="outline-success"><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search">Back to Search Menu</Link></Button>
          <br /><br />
        </Container>
      </>

    );
  }
}

class CityRowLon extends React.Component {
  render() {
    const city = this.props.city;
    const lon = city.lon;
    return (
      <tr>
        <td><Link to={'/' + city.name}>{city.name}</Link></td>
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
      if (city.lon.toLowerCase().indexOf(filterText) === -1 && city.lon.toUpperCase().indexOf(filterText) === -1) {
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
            className="form-control"
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
      location: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  async fetchLoc() {
    let res = await fetch('http://localhost:8000/loc1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({ location: l });
  }

  componentDidMount() {
    this.fetchLoc()
  }


  render() {
    return (
      <>       
        <Container>
          <div>
            <Container>
              <p className="text-center fs-2 fw-bold">Search By Longitude</p>
            </Container>
            <SearchBarLon
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <CityTableLon
              cities={this.state.location}
              filterText={this.state.filterText}

            />
          </div>
          &nbsp;&nbsp;<Button variant="outline-success"><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search">Back to Search Menu</Link></Button>
          <br /><br />
        </Container>
      </>
    );
  }
}

class CityRowLat extends React.Component {
  render() {
    const city = this.props.city;
    const lat = city.lat;
    return (
      <tr>
        <td><Link to={'/' + city.name}>{city.name}</Link></td>
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
      if (city.lat.toLowerCase().indexOf(filterText) === -1 && city.lat.toUpperCase().indexOf(filterText) === -1) {
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
            className="form-control"
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
      location: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  async fetchLoc() {
    let res = await fetch('http://localhost:8000/loc1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({ location: l });
  }

  componentDidMount() {
    this.fetchLoc()
  }


  render() {
    return (
      <>
        <Container>
          <div>
            <Container>
              <p className="text-center fs-2 fw-bold">
                Search By Latitude
              </p>
            </Container>
            <SearchBarLat
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <CityTableLat
              cities={this.state.location}
              filterText={this.state.filterText}
            />
          </div>
          &nbsp;&nbsp;<Button variant="outline-success"><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search">Back to Search Menu</Link></Button>
          <br /><br />
        </Container>
      </>
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
      <>
        <div>
          <Container>
            <Row><br /></Row>
            <Row><br /></Row>
            <Row><br /></Row>
            <Row>
              <p className="text-center fs-2 fw-bold text-center">Please Choose the Searching Field: </p>
            </Row>
            <Row><br /></Row>
            <Row>
              <Col></Col>
              <Col>
                <div className="bg-light border">
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="outline-success" size="lg">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search/ByName">&nbsp;&nbsp;&nbsp;Search By Name&nbsp;&nbsp;&nbsp;</Link>
                  </Button>
                  <br /><br />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col>
                <div className="border">
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="outline-success" size="lg">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search/ByLon">Search By Longitude</Link>
                  </Button>
                  <br /><br />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col>

                <div className="bg-light border">
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="outline-success" size="lg">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search/ByLat">&nbsp;&nbsp;Search By Latitude&nbsp;</Link>
                  </Button>
                  <br /><br />
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export { Search, SearchName, SearchLon, SearchLat };
