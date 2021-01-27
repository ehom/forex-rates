
document.title = "USD forex rates";

class App extends React.Component {
  constructor(props) {
    super(props);

    console.debug("ctor");
    this.state = {
      date: undefined,
      rates: {}
    }
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
          this.setState({
            date: json.date,
            rates: json.rates
          })
        })
      .catch(error => console.log(error));
  }

  render() {
    console.debug("render");

    if (this.state.date !== undefined) {
      return (
        <React.Fragment>
          <div className="jumbotron pt-4 pb-4">
            <h3 className="h3">How much is 1 US Dollar worth today?</h3>
          </div>
          <Motd date={this.state.date} />
          <div class='row'>
            <Rates rates={this.state.rates} />
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="jumbotron pt-4 pb-4">
          <h3 className="h3">How much is 1 US Dollar worth today?</h3>
        </div>
      </React.Fragment>
    );
  }  
}

const Rates = ({rates}) => {
  const currencyCodes = (object) => {
    let currencies = Object.keys(object);
    currencies.sort();
    return currencies;
  };
  
  const formatted = currencyCodes(rates).map((code) => {
    return (
      <div className="col-sm-4">
        <table className='table table-hover'>
          <tbody>
            <tr><td className="pr-4">
              <CurrencyFormat locale='en' displayType='name' currencyCode={code} value={rates[code]}/>
              </td></tr>
            <tr><td className="pr-5">
              <CurrencyFormat locale='en' displayType='code' currencyCode={code} value={rates[code]}/>
              </td></tr>
          </tbody>
        </table>
      </div>
    );
  });
  
  return <React.Fragment>{formatted}</React.Fragment>;
};

ReactDOM.render(<App />, document.getElementById('parent'));
