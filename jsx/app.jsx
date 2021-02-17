document.title = "USD forex rates";

class App extends React.Component {
  state = {
    date: undefined,
    rates: {},
    cardView: true,
    listView: false
  }

  componentDidMount() {
    console.debug("componentDidMount");

    const EXCHANGE_RATES = 'https://raw.githubusercontent.com/ehom/external-data/master/exchangeratesapi/forex-rates.json';

    fetch(EXCHANGE_RATES)
      .then(response => response.json())
      .then(
        json => {
          console.debug(json);
          return json;
        })
      .then(
        json => {
          delete json.rates['USD'];

          const [year, month, day] = json.date.split('-');
          const date = new Date(Date.UTC(year, month - 1, day, 8, 0, 0));
          const localDate = new Intl.DateTimeFormat(navigator.language, {
            weekday: "short", year: "numeric", month: "short", day: "numeric"}).format(date);

          this.setState({
            date: localDate,
            rates: json.rates
          });
        })
      .catch(error => console.log(error));
  }

  clickCardView(event) {
    console.debug("click Card View:", event);

    this.setState({
      cardView: true,
      listView: false
    });
  }

  clickListView(event) {
    console.debug("click List View", event);

    this.setState({
      cardView: false,
      listView: true
    });
  }

  render() {
    console.debug("render app");

    let rates = "";
    const isReady = this.state.date !== undefined;

    if (isReady) {
      if (this.state.listView) {
        rates = (
          <React.Fragment>
            <Motd date={this.state.date} />
            <ListView rates={this.state.rates} />
          </React.Fragment>
        );
      } else {
        rates = (
          <React.Fragment>
            <Motd date={this.state.date} />
            <CardView rates={this.state.rates} />
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="jumbotron pt-4 pb-4">
          <h3 className="h3">How much is 1 US Dollar worth today?</h3>
        </div>
        <div className="container border mb-4">
          <div className="form-check form-check-inline">
            <Checkbox label="Card View" checked={this.state.cardView} onClick={this.clickCardView.bind(this)} />
          </div>
          <div className="form-check form-check-inline">
            <Checkbox label="List View" checked={this.state.listView} onClick={this.clickListView.bind(this)} />
          </div>
        </div>
        <div>
        {rates}
        </div>
      </React.Fragment>
    );
  }  
}

const Checkbox = ({label, checked, onClick}) => {
  return (
    <label className="form-check-label">
      <input className="form-check-input" type="radio" checked={checked} onClick={onClick} />
      {label}
    </label>
  );
};

const ListView = ({rates}) => {
  const currencyCodes = (object) => {
    let currencies = Object.keys(object);
    currencies.sort();
    return currencies;
  };

  const tableRows = currencyCodes(rates).map((code) => {
    return (
      <tr>
        <td>
          <CurrencyFormat locale='en' displayType='name' currencyCode={code} value={rates[code]}/>
        </td>
        <td>
          <CurrencyFormat locale='en' displayType='code' currencyCode={code} value={rates[code]}/>
        </td>
        <td>
          <CurrencyFormat locale='en' displayType='symbol' currencyCode={code} value={rates[code]}/>
        </td>
      </tr>
    );
  });

  const style = {"text-align": "right"};

  return (
    <React.Fragment>
      <table className='table table-hover table-striped'>
        <thead>
          <tr>
            <th style={style}>currency name</th>
            <th style={style}>code</th>
            <th style={style}>symbol</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('parent'));
