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
      <div class="col-sm-4">
        <table class='table table-hover'>
          <tbody>
            <tr><td class="pr-4">
              <CurrencyFormat locale='en' displayType='name' currencyCode={code} value={rates[code]}/>
              </td></tr>
            <tr><td class="pr-5">
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
      <div class='row'>{formatted}</div>
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
        <span class='digit-display'>{element['value']}</span>
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

// TODO: Compare today's date and the date of what's in
// the localStorage.
// Grab new copy if dates are different.

// TODO: Provide a control to explicitly grab the latest exchange rates.

  fetch("https://raw.githubusercontent.com/ehom/forex-rates/master/forex-rates.json")
  .then(response => response.json())
  .then(
    json => {
      console.log(json);
      return json;
    })
  .then(
    json => {
      delete json.rates['USD'];
      display(json);
    })
  .catch(error => console.log(error));
  
