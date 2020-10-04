const EXCHANGE_RATES = 'https://raw.githubusercontent.com/ehom/external-data/master/exchangeratesapi/forex-rates.json';

const App = function(props) {
  // default properties?
  const {date, rates} = props.info;
  const currencyCodes = (object) => {
    let currencies = Object.keys(rates);
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
  
  return (
    <React.Fragment>
      <Motd date={date}/>
      <div className='row'>{formatted}</div>
    </React.Fragment>
  );
};

const Motd = function(props) {
  const {date} = props;
  return (
    <p>As of <strong>{date}</strong>, here are the exchange rates:</p>
  );
};

const CurrencyFormat = function(prop) {
  const {
    locale = 'en', 
    displayType = 'name', 
    currencyCode = 'USD', 
    value = '0.00'
  } = prop;
  
  const formatOptions = {
    style: 'currency',
    currencyDisplay: displayType,
    currency: currencyCode
  };

  const parts = new Intl.NumberFormat(locale, formatOptions).formatToParts(value);
  const formatted = parts.map((element) => {
    if (element['type'] !== 'currency') {
      return (
        <span className='digit-display'>{element['value']}</span>
      );
    }
    return (
      <React.Fragment>{element['value']}</React.Fragment>
    );
  });
  
  return (
    <React.Fragment>{formatted}</React.Fragment>
  );
};

const display = function(results) {
  // console.log('result:', results);
  ReactDOM.render(<App info={results}/>, 
    document.getElementById('parent')
  );
};

// TODO: undo hardcoding of USD so that we can 
// view exchange rates for other currencies

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
      display(json);
    })
  .catch(error => console.log(error));
  
