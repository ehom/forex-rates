URL = 'https://raw.githubusercontent.com/ehom/external-data/master/exchangeratesapi/forex-rates.json';

var App = function App(props) {
  // default properties?
  var _props$info = props.info,
      date = _props$info.date,
      rates = _props$info.rates;

  var currencyCodes = function currencyCodes(object) {
    var currencies = Object.keys(rates);
    currencies.sort();
    return currencies;
  };

  var formatted = currencyCodes(rates).map(function (code) {
    return React.createElement(
      'div',
      { 'class': 'col-sm-4' },
      React.createElement(
        'table',
        { 'class': 'table table-hover' },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { 'class': 'pr-4' },
              React.createElement(CurrencyFormat, { locale: 'en', displayType: 'name', currencyCode: code, value: rates[code] })
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { 'class': 'pr-5' },
              React.createElement(CurrencyFormat, { locale: 'en', displayType: 'code', currencyCode: code, value: rates[code] })
            )
          )
        )
      )
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Motd, { date: date }),
    React.createElement(
      'div',
      { 'class': 'row' },
      formatted
    )
  );
};

var Motd = function Motd(props) {
  var date = props.date;

  return React.createElement(
    'p',
    null,
    'As of ',
    React.createElement(
      'strong',
      null,
      date
    ),
    ', here are the exchange rates:'
  );
};

var CurrencyFormat = function CurrencyFormat(prop) {
  var _prop$locale = prop.locale,
      locale = _prop$locale === undefined ? 'en' : _prop$locale,
      _prop$displayType = prop.displayType,
      displayType = _prop$displayType === undefined ? 'name' : _prop$displayType,
      _prop$currencyCode = prop.currencyCode,
      currencyCode = _prop$currencyCode === undefined ? 'USD' : _prop$currencyCode,
      _prop$value = prop.value,
      value = _prop$value === undefined ? '0.00' : _prop$value;


  var formatOptions = {
    style: 'currency',
    currencyDisplay: displayType,
    currency: currencyCode
  };

  var parts = new Intl.NumberFormat(locale, formatOptions).formatToParts(value);
  var formatted = parts.map(function (element) {
    if (element['type'] !== 'currency') {
      return React.createElement(
        'span',
        { 'class': 'digit-display' },
        element['value']
      );
    }
    return React.createElement(
      React.Fragment,
      null,
      element['value']
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    formatted
  );
};

var display = function display(results) {
  // console.log('result:', results);
  ReactDOM.render(React.createElement(App, { info: results }), document.getElementById('parent'));
};

// TODO: undo hardcoding of USD so that we can 
// view exchange rates for other currencies

// TODO: Compare today's date and the date of what's in
// the localStorage.
// Grab new copy if dates are different.

// TODO: Provide a control to explicitly grab the latest exchange rates.

fetch(URL).then(function (response) {
  return response.json();
}).then(function (json) {
  console.debug(json);
  return json;
}).then(function (json) {
  delete json.rates['USD'];
  display(json);
}).catch(function (error) {
  return console.log(error);
});