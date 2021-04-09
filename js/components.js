var CardView = function CardView(_ref) {
  var rates = _ref.rates;

  var currencyCodes = function currencyCodes(object) {
    var currencies = Object.keys(object);
    currencies.sort();
    return currencies;
  };

  var rows = [];

  var codes = currencyCodes(rates);
  for (; codes.length;) {
    rows.push(codes.splice(0, 3));
  }

  var formattedRows = rows.map(function (row) {
    var formattedColumns = row.map(function (code) {
      return React.createElement(
        "div",
        { className: "col-sm-4" },
        React.createElement(
          "table",
          { className: "table table-hover" },
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { className: "text-center" },
                React.createElement(CurrencyFormat, { locale: "en", displayType: "name", currencyCode: code, value: rates[code] })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { className: "text-center" },
                React.createElement(CurrencyFormat, { locale: "en", displayType: "code", currencyCode: code, value: rates[code] })
              )
            )
          )
        )
      );
    });

    return React.createElement(
      "div",
      { className: "row" },
      formattedColumns
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    formattedRows
  );
};

var Motd = function Motd(_ref2) {
  var date = _ref2.date;

  return React.createElement(
    "p",
    null,
    "Here are the exchange rates for ",
    React.createElement(
      "strong",
      null,
      date
    ),
    ":"
  );
};

Motd.defaultProps = {
  date: '00/00/0000'
};

var CurrencyFormat = function CurrencyFormat(_ref3) {
  var locale = _ref3.locale,
      displayType = _ref3.displayType,
      currencyCode = _ref3.currencyCode,
      value = _ref3.value;

  var formatOptions = {
    style: 'currency',
    currencyDisplay: displayType,
    currency: currencyCode
  };

  var parts = new Intl.NumberFormat(locale, formatOptions).formatToParts(value);
  var formatted = parts.map(function (element) {
    if (element['type'] !== 'currency') {
      return React.createElement(
        "span",
        { className: "digit-display" },
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

CurrencyFormat.defaultProps = {
  locale: 'en',
  displayType: 'name',
  currencyCode: 'USD',
  value: '0.00'
};