const CardView = ({rates}) => {
  const currencyCodes = (object) => {
    let currencies = Object.keys(object);
    currencies.sort();
    return currencies;
  };

  let rows = [];

  let codes = currencyCodes(rates);
  for (;codes.length;) {
    rows.push(codes.splice(0, 3));
  }

  const formattedRows = rows.map(row => {
    const formattedColumns = row.map(code => {
      return (
        <div className="col-sm-4">
          <table className='table table-hover'>
            <tbody>
              <tr><td className="text-center">
                <CurrencyFormat locale='en' displayType='name' currencyCode={code} value={rates[code]}/>
              </td></tr>
              <tr><td className="text-center">
                <CurrencyFormat locale='en' displayType='code' currencyCode={code} value={rates[code]}/>
              </td></tr>
            </tbody>
          </table>
        </div>
      );
    });

    return <div className="row">{formattedColumns}</div>;
  });

  return <React.Fragment>{formattedRows}</React.Fragment>;
};

const Motd = function({date}) {
  return (
    <p>Here are the exchange rates for <strong>{date}</strong>:</p>
  );
};

Motd.defaultProps = {
  date: '00/00/0000'
};

const CurrencyFormat = function({locale, displayType, currencyCode, value}) {
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
  
  return <React.Fragment>{formatted}</React.Fragment>;
};

CurrencyFormat.defaultProps = {
  locale: 'en', 
  displayType: 'name', 
  currencyCode: 'USD', 
  value: '0.00'
};

