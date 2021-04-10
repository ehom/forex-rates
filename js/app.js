var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currencyCodes = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", "SEK", "KRW", "SGD", "NOK", "MXN", "INR", "RUB", "ZAR", "TRY", "BRL", "TWD", "DKK", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "MYR", "RON"];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      date: undefined,
      rates: [],
      language: navigator.language
    }, _this.fetchedRates = [], _this.handleLanguageChange = function (event) {
      console.debug("handleLanguageChange:", event);

      var rates = Helper.createCurrencyList(currencyCodes, _this.fetchedRates);

      console.debug("REcreated table of formatted rates:", rates);

      _this.setState({
        date: _this.state.date,
        rates: rates,
        language: navigator.language
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.debug("componentDidMount");

      window.addEventListener("languagechange", this.handleLanguageChange.bind(this));

      var EXCHANGE_RATES = "https://raw.githubusercontent.com/ehom/external-data/master/finnhub/usd.json";

      fetch(EXCHANGE_RATES).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.debug("rates fetched:", json.quote);

        _this2.fetchedRates = json.quote;

        var rates = Helper.createCurrencyList(currencyCodes, json.quote);

        console.debug("created table of formatted rates:", rates);

        _this2.setState({
          date: new Date(json.timeStamp),
          rates: rates
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.debug("render: table of formatted rates:", this.state.rates);

      var tableRows = this.state.rates.map(function (entry) {
        return React.createElement(TableRow, { entry: entry, key: entry.code });
      });

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(AppBar, null),
        React.createElement(
          "div",
          { className: "mt-5 pt-5" },
          React.createElement(
            "table",
            { className: "table table-hover table-dark" },
            React.createElement(
              "tbody",
              null,
              React.createElement(BlankRow, null),
              tableRows,
              React.createElement(BlankRow, null)
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var AppBar = function AppBar() {
  var styling = { fontSize: "14pt" };
  var THINKING_FACE = "\uD83E\uDD14";
  var SLIGHTLY_SMILING = "\uD83D\uDE42";
  var message1 = "The rate table is clickable " + THINKING_FACE;
  var message2 = "Also, the page will update if you change the UI language of your browser " + SLIGHTLY_SMILING;

  return React.createElement(
    "nav",
    { className: "navbar navbar-light bg-light fixed-top" },
    React.createElement(
      "a",
      { "class": " navbar-brand", href: "#" },
      "USD Exchange Rates"
    ),
    React.createElement(
      "button",
      { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
      React.createElement("span", { className: "navbar-toggler-icon" })
    ),
    React.createElement(
      "div",
      { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
      React.createElement(
        "span",
        { className: "navbar-text", style: styling },
        message1,
        React.createElement("br", null),
        message2
      )
    )
  );
};

var BlankRow = function BlankRow() {
  return React.createElement(
    "tr",
    null,
    React.createElement("td", null),
    React.createElement("td", null)
  );
};

var TableRow = function TableRow(_ref2) {
  var entry = _ref2.entry;

  console.debug("entry:", entry);

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      formatIndex = _React$useState2[0],
      setFormatIndex = _React$useState2[1];

  var parts = entry.formats[formatIndex];

  console.debug("parts:", parts);

  var formatted = parts.map(function (part) {
    var key = part.id + " " + part.value;
    if (part.type !== "currency") {
      return React.createElement(
        "span",
        { className: "app-rate", key: key },
        part.value
      );
    }
    return React.createElement(
      React.Fragment,
      { key: key },
      part.value
    );
  });

  var handleClick = function handleClick(event) {
    console.debug("Row clicked", event);
    setFormatIndex(formatIndex + 1 >= entry.formats.length ? 0 : formatIndex + 1);
  };

  return React.createElement(
    "tr",
    { onClick: handleClick, key: entry.code },
    React.createElement(
      "td",
      { className: "text-right app-flag" },
      entry.flag
    ),
    React.createElement(
      "td",
      { className: "text-center" },
      formatted
    )
  );
};

var Helper = Helper || {};

Helper.FormattedDate = function (_ref3) {
  var locale = _ref3.locale,
      date = _ref3.date;

  if (date === undefined) {
    return React.createElement(React.Fragment, null);
  }

  var formatted = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);

  return React.createElement(
    React.Fragment,
    null,
    formatted
  );
};

Helper.FormattedDate.defaultProps = {
  locale: navigator.language
};

var FLAGS = {
  USD: "\uD83C\uDDFA\uD83C\uDDF8",
  AUD: "\uD83C\uDDE6\uD83C\uDDFA",
  EUR: "\uD83C\uDDEA\uD83C\uDDFA",
  BGN: "\uD83C\uDDE7\uD83C\uDDEC",
  BRL: "\uD83C\uDDE7\uD83C\uDDF7",
  CAD: "\uD83C\uDDE8\uD83C\uDDE6",
  CHF: "\uD83C\uDDE8\uD83C\uDDED",
  CNY: "\uD83C\uDDE8\uD83C\uDDF3",
  CZK: "\uD83C\uDDE8\uD83C\uDDFF",
  DKK: "\uD83C\uDDE9\uD83C\uDDF0",
  GBP: "\uD83C\uDDEC\uD83C\uDDE7",
  HKD: "\uD83C\uDDED\uD83C\uDDF0",
  HRK: "\uD83C\uDDED\uD83C\uDDF7",
  HUF: "\uD83C\uDDED\uD83C\uDDFA",
  IDR: "\uD83C\uDDEE\uD83C\uDDE9",
  ILS: "\uD83C\uDDEE\uD83C\uDDF1",
  INR: "\uD83C\uDDEE\uD83C\uDDF3",
  ISK: "\uD83C\uDDEE\uD83C\uDDF8",
  JPY: "\uD83C\uDDEF\uD83C\uDDF5",
  KRW: "\uD83C\uDDF0\uD83C\uDDF7",
  MXN: "\uD83C\uDDF2\uD83C\uDDFD",
  MYR: "\uD83C\uDDF2\uD83C\uDDFE",
  NOK: "\uD83C\uDDF3\uD83C\uDDF4",
  NZD: "\uD83C\uDDF3\uD83C\uDDFF",
  PHP: "\uD83C\uDDF5\uD83C\uDDED",
  PLN: "\uD83C\uDDF5\uD83C\uDDF1",
  RON: "\uD83C\uDDF7\uD83C\uDDF4",
  RUB: "\uD83C\uDDF7\uD83C\uDDFA",
  SEK: "\uD83C\uDDF8\uD83C\uDDEA",
  SGD: "\uD83C\uDDF8\uD83C\uDDEC",
  THB: "\uD83C\uDDF9\uD83C\uDDED",
  TRY: "\uD83C\uDDF9\uD83C\uDDF7",
  ZAR: "\uD83C\uDDFF\uD83C\uDDE6",
  COP: "\uD83C\uDDE8\uD83C\uDDF4",
  CLP: "\uD83C\uDDE8\uD83C\uDDF1",
  TWD: "\uD83C\uDDF9\uD83C\uDDFC",
  AED: "\uD83C\uDDE6\uD83C\uDDEA",
  SAR: "\uD83C\uDDF8\uD83C\uDDE6"
};

Helper.getFlag = function (code) {
  return code in FLAGS ? FLAGS[code] : FLAGS["EUR"];
};

Helper.createFormatter = function (code, currencyDisplay) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: code,
    currencyDisplay: currencyDisplay,
    minimumFractionDigits: 2
  });
};

Helper.createCurrencyList = function (codes, rates) {
  var currencies = codes.map(function (code) {
    var rate = rates[code];
    var codeFormatter = Helper.createFormatter(code, "code");
    var symbolFormatter = Helper.createFormatter(code, "symbol");

    var formats = [Helper.createFormatter(code, "name").formatToParts(rate), codeFormatter.formatToParts(rate)];

    if (codeFormatter.format(rate) !== symbolFormatter.format(rate)) {
      formats.push(symbolFormatter.formatToParts(rate));
    }

    return {
      code: code,
      flag: Helper.getFlag(code),
      formats: formats
    };
  }, []);

  return currencies;
};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));