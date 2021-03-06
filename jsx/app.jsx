class HomePage extends React.Component {
  currencyCodes = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "HKD",
    "NZD",
    "SEK",
    "KRW",
    "SGD",
    "NOK",
    "MXN",
    "INR",
    "RUB",
    "ZAR",
    "TRY",
    "BRL",
    "TWD",
    "DKK",
    "PLN",
    "THB",
    "IDR",
    "HUF",
    "CZK",
    "ILS",
    "CLP",
    "PHP",
    "AED",
    "COP",
    "SAR",
    "MYR",
    "RON"
  ];

  state = {
    date: undefined,
    rates: [],
    language: navigator.language
  };

  fetchedRates = [];

  componentDidMount() {
    console.debug("componentDidMount");

    window.addEventListener(
      "languagechange",
      this.handleLanguageChange.bind(this)
    );

    const EXCHANGE_RATES =
      "https://raw.githubusercontent.com/ehom/external-data/master/finnhub/usd.json";

    fetch(EXCHANGE_RATES)
      .then((response) => response.json())
      .then((json) => {
        console.debug("rates fetched:", json.quote);

        this.fetchedRates = json.quote;

        const rates = Helper.createCurrencyList(this.currencyCodes, json.quote);

        console.debug("created table of formatted rates:", rates);

        this.setState({
          date: new Date(json.timeStamp),
          rates: rates
        });
      })
      .catch((error) => console.log(error));
  }

  handleLanguageChange = (event) => {
    console.debug("handleLanguageChange:", event);

    const rates = Helper.createCurrencyList(currencyCodes, this.fetchedRates);

    console.debug("REcreated table of formatted rates:", rates);

    this.setState({
      rates: rates,
      language: navigator.language
    });
  };

  render() {
    console.debug("render: table of formatted rates:", this.state.rates);

    if (this.state.date === undefined) {
      return <React.Fragment></React.Fragment>;
    }

    const tableRows = this.state.rates.map((entry) => (
      <TableRow entry={entry} key={entry.code} />
    ));

    const styleFooter = {
      color: "white",
      fontSize: "14pt",
      textAlign: "center"
    };

    const pageStyle = {
      fontSize: "20pt",
      background: "DarkBlue"
    };

    return (
      <div style={pageStyle}>
        <div className="container pt-5 pb-5">
          <table className="table table-hover table-dark">
            <tbody>
              <BlankRow />
              {tableRows}
              <BlankRow />
            </tbody>
          </table>
          <div style={styleFooter}>
            Last updated on{" "}
            <Helper.FormattedDateTime
              date={this.state.date}
              dateStyle="full"
              timeStyle="short"
            />
          </div>
        </div>
      </div>
    );
  }
}

const BlankRow = () => {
  return (
    <tr>
      <td />
      <td />
    </tr>
  );
};

const TableRow = ({ entry }) => {
  console.debug("entry:", entry);

  const [formatIndex, setFormatIndex] = React.useState(0);

  const parts = entry.formats[formatIndex];

  console.debug("parts:", parts);

  const formatted = parts.map((part) => {
    const key = part.id + " " + part.value;
    if (part.type !== "currency") {
      return (
        <span className="app-rate" key={key}>
          {part.value}
        </span>
      );
    }
    return <React.Fragment key={key}>{part.value}</React.Fragment>;
  });

  const handleClick = (event) => {
    console.debug("Row clicked", event);
    setFormatIndex(
      formatIndex + 1 >= entry.formats.length ? 0 : formatIndex + 1
    );
  };

  return (
    <tr onClick={handleClick} key={entry.code}>
      <td className="text-right app-flag">{entry.flag}</td>
      <td className="text-center">{formatted}</td>
    </tr>
  );
};

var Helper = Helper || {};

const DateStyle = {
  short: { year: "numeric", month: "numeric", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
  full: { weekday: "long", year: "numeric", month: "long", day: "numeric" }
};

Helper.FormattedDateTime = ({ locale, date, dateStyle, timeStyle }) => {
  if (dateStyle === undefined) {
    return <React.Fragment></React.Fragment>;
  }

  const options = DateStyle[dateStyle];

  if (timeStyle) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  const formatted = new Intl.DateTimeFormat(locale, options).format(date);

  return <React.Fragment>{formatted}</React.Fragment>;
};

Helper.FormattedDateTime.defaultProps = {
  locale: navigator.language
};

const FLAGS = {
  USD: "\ud83c\uddfa\ud83c\uddf8",
  AUD: "\ud83c\udde6\ud83c\uddfa",
  EUR: "\ud83c\uddea\ud83c\uddfa",
  BGN: "\ud83c\uDDE7\ud83c\uDDEC",
  BRL: "\ud83c\uDDE7\ud83c\uDDF7",
  CAD: "\ud83c\udde8\ud83c\udde6",
  CHF: "\ud83c\uDDE8\ud83c\uDDED",
  CNY: "\ud83c\uDDE8\ud83c\uDDF3",
  CZK: "\ud83c\uDDE8\ud83c\uDDFF",
  DKK: "\ud83c\udde9\ud83c\uddf0",
  GBP: "\ud83c\uDDEC\ud83c\uDDE7",
  HKD: "\ud83c\uDDED\ud83c\uDDF0",
  HRK: "\ud83c\uDDED\ud83c\uDDF7",
  HUF: "\ud83c\uDDED\ud83c\uDDFA",
  IDR: "\ud83c\uDDEE\ud83c\uDDE9",
  ILS: "\ud83c\uDDEE\ud83c\uDDF1",
  INR: "\ud83c\uDDEE\ud83c\uDDF3",
  ISK: "\ud83c\uDDEE\ud83c\uDDF8",
  JPY: "\ud83c\uDDEF\ud83c\uDDF5",
  KRW: "\ud83c\uDDF0\ud83c\uDDF7",
  MXN: "\ud83c\uDDF2\ud83c\uDDFD",
  MYR: "\ud83c\uDDF2\ud83c\uDDFE",
  NOK: "\ud83c\uDDF3\ud83c\uDDF4",
  NZD: "\ud83c\uDDF3\ud83c\uDDFF",
  PHP: "\ud83c\uDDF5\ud83c\uDDED",
  PLN: "\ud83c\uDDF5\ud83c\uDDF1",
  RON: "\ud83c\uDDF7\ud83c\uDDF4",
  RUB: "\ud83c\uDDF7\ud83c\uDDFA",
  SEK: "\ud83c\uDDF8\ud83c\uDDEA",
  SGD: "\ud83c\uDDF8\ud83c\uDDEC",
  THB: "\ud83c\uDDF9\ud83c\uDDED",
  TRY: "\ud83c\uDDF9\ud83c\uDDF7",
  ZAR: "\ud83c\uDDFF\ud83c\uDDE6",
  COP: "\ud83c\uDDE8\ud83c\uDDF4",
  CLP: "\ud83c\uDDE8\ud83c\uDDF1",
  TWD: "\ud83c\uDDF9\ud83c\uDDFC",
  AED: "\ud83c\uDDE6\ud83c\uDDEA",
  SAR: "\ud83c\uDDF8\ud83c\uDDE6"
};

Helper.getFlag = (code) => {
  return code in FLAGS ? FLAGS[code] : FLAGS["EUR"];
};

Helper.createFormatter = (code, currencyDisplay) => {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: code,
    currencyDisplay: currencyDisplay,
    minimumFractionDigits: 2
  });
};

Helper.createCurrencyList = (codes, rates) => {
  let currencies = codes.map((code) => {
    const rate = rates[code];
    const codeFormatter = Helper.createFormatter(code, "code");
    const symbolFormatter = Helper.createFormatter(code, "symbol");

    let formats = [
      Helper.createFormatter(code, "name").formatToParts(rate),
      codeFormatter.formatToParts(rate)
    ];

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

const App = () => {
  const navbarStyling = { background: "LightGrey" };
  return (
    <div>
      <nav
        className="nav-bar navbar-expand-lg navbar-light pl-3"
        style={navbarStyling}
      >
        <span className="navbar-brand">USD Exchange Rates</span>
        <span className="float-right">
          <HelpButton />
        </span>
      </nav>
      <main>
        <HomePage />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
