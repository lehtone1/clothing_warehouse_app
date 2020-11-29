import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// New imports
import Table from './components/table/Table';
import Header from './components/common/Header';
import handleResponse from './helpers';
import API_URL from './config';
import Loading from './components/common/Loading';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: ['jackets', 'shirts', 'accessories'],
      manufacturers: ['abiplos', 'derp', 'nouke', 'reps', 'xoon'],
      jackets: [],
      shirts: [],
      accessories: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { categories, manufacturers } = this.state;

    this.setState({
      loading: true,
    });

    categories.forEach((category) => {
      this.fetchProductData(category);
    });

    manufacturers.forEach((manufacturer) => {
      this.fetchAvailabilityData(manufacturer);
    });
  }

  getAvailabilityValue = (string) => {
    const regex = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;
    const result = regex.exec(string);
    return result[1];
  }

  fetchProductData(category) {
    fetch(`${API_URL}/products/${category}`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          [category]: data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  addAvailabilityInformation(availabilityData) {
    let { jackets, shirts, accessories } = this.state;
    const availabilityDict = {};

    availabilityData.forEach((availability) => {
      const id = availability.id.toLowerCase();
      const status = this.getAvailabilityValue(availability.DATAPAYLOAD);
      availabilityDict[id] = status;
    });
    jackets = jackets.map((item) => {
      if (item.id in availabilityDict) {
        const itemUpdated = item;
        itemUpdated.availability = availabilityDict[itemUpdated.id];
        return itemUpdated;
      }
      return item;
    });

    shirts = shirts.map((item) => {
      if (item.id in availabilityDict) {
        const itemUpdated = item;
        itemUpdated.availability = availabilityDict[itemUpdated.id];
        return itemUpdated;
      }
      return item;
    });

    accessories = accessories.map((item) => {
      if (item.id in availabilityDict) {
        const itemUpdated = item;
        itemUpdated.availability = availabilityDict[itemUpdated.id];
        return itemUpdated;
      }
      return item;
    });

    this.setState({
      jackets,
      shirts,
      accessories,
    });
  }

  fetchAvailabilityData(manufacturer) {
    this.setState({
      loading: true,
    });
    const url = `${API_URL}/availability/${manufacturer}`;

    fetch(url)
      .then(handleResponse)
      .then((data) => {
        if (typeof data.response === 'string') {
          this.fetchAvailabilityData(manufacturer);
        } else {
          this.addAvailabilityInformation(data.response);
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }

  render() {
    const {
      jackets,
      shirts,
      accessories,
      loading,
      error,
    } = this.state;

    if (loading) {
      return (
        <div className="App">
          <div className="loading-container"><Loading /></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="App">
          {error}
        </div>
      );
    }

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route
                path="/jackets"
                render={() => (
                  <Table items={jackets} key="jackets" />
                )}
              />
              <Route
                path="/shirts"
                render={() => (
                  <Table items={shirts} key="shirts" />
                )}
              />
              <Route
                path="/accessories"
                render={() => (
                  <Table items={accessories} key="accessories" />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
