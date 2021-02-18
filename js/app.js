var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.title = "USD forex rates";

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
      rates: {},
      cardView: true,
      listView: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.debug("componentDidMount");

      var EXCHANGE_RATES = 'https://raw.githubusercontent.com/ehom/external-data/master/exchangeratesapi/forex-rates.json';

      fetch(EXCHANGE_RATES).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.debug(json);
        return json;
      }).then(function (json) {
        delete json.rates['USD'];

        var _json$date$split = json.date.split('-'),
            _json$date$split2 = _slicedToArray(_json$date$split, 3),
            year = _json$date$split2[0],
            month = _json$date$split2[1],
            day = _json$date$split2[2];

        var date = new Date(Date.UTC(year, month - 1, day, 8, 0, 0));
        var localDate = new Intl.DateTimeFormat(navigator.language, {
          weekday: "short", year: "numeric", month: "short", day: "numeric" }).format(date);

        _this2.setState({
          date: localDate,
          rates: json.rates
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "clickCardView",
    value: function clickCardView(event) {
      console.debug("click Card View:", event);

      this.setState({
        cardView: true,
        listView: false
      });
    }
  }, {
    key: "clickListView",
    value: function clickListView(event) {
      console.debug("click List View", event);

      this.setState({
        cardView: false,
        listView: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.debug("render app");

      var rates = "";
      var isReady = this.state.date !== undefined;

      if (isReady) {
        if (this.state.listView) {
          rates = React.createElement(
            React.Fragment,
            null,
            React.createElement(Motd, { date: this.state.date }),
            React.createElement(ListView, { rates: this.state.rates })
          );
        } else {
          rates = React.createElement(
            React.Fragment,
            null,
            React.createElement(Motd, { date: this.state.date }),
            React.createElement(CardView, { rates: this.state.rates })
          );
        }
      }

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "jumbotron pt-4 pb-4" },
          React.createElement(
            "h3",
            { className: "h3" },
            "How much is 1 US Dollar worth today?"
          )
        ),
        React.createElement(
          "div",
          { className: "container border mb-4" },
          React.createElement(
            "div",
            { className: "form-check form-check-inline" },
            React.createElement(Checkbox, { label: "Card View", checked: this.state.cardView, onClick: this.clickCardView.bind(this) })
          ),
          React.createElement(
            "div",
            { className: "form-check form-check-inline" },
            React.createElement(Checkbox, { label: "List View", checked: this.state.listView, onClick: this.clickListView.bind(this) })
          )
        ),
        React.createElement(
          "div",
          null,
          rates
        )
      );
    }
  }]);

  return App;
}(React.Component);

var Checkbox = function Checkbox(_ref2) {
  var label = _ref2.label,
      checked = _ref2.checked,
      onClick = _ref2.onClick;

  return React.createElement(
    "label",
    { className: "form-check-label" },
    React.createElement("input", { className: "form-check-input", type: "radio", checked: checked, onClick: onClick }),
    label
  );
};

var ListView = function ListView(_ref3) {
  var rates = _ref3.rates;

  var currencyCodes = function currencyCodes(object) {
    var currencies = Object.keys(object);
    currencies.sort();
    return currencies;
  };

  var tableRows = currencyCodes(rates).map(function (code) {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement(CurrencyFormat, { locale: "en", displayType: "name", currencyCode: code, value: rates[code] })
      ),
      React.createElement(
        "td",
        null,
        React.createElement(CurrencyFormat, { locale: "en", displayType: "code", currencyCode: code, value: rates[code] })
      ),
      React.createElement(
        "td",
        null,
        React.createElement(CurrencyFormat, { locale: "en", displayType: "symbol", currencyCode: code, value: rates[code] })
      )
    );
  });

  var style = { "text-align": "right" };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "table",
      { className: "table table-responsive-sm table-hover table-striped" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { style: style },
            "currency name"
          ),
          React.createElement(
            "th",
            { style: style },
            "code"
          ),
          React.createElement(
            "th",
            { style: style },
            "symbol"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        tableRows
      )
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('parent'));