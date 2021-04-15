var HelpButton = function HelpButton() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "button",
      {
        type: "button",
        className: "btn btn-primary",
        "data-toggle": "modal",
        "data-target": "#exampleModal"
      },
      "Help"
    ),
    React.createElement(MessageBox, { id: "exampleModal" })
  );
};

// Todo add content
var MessageBox = function MessageBox(_ref) {
  var id = _ref.id;

  return React.createElement(
    "div",
    {
      className: "modal fade",
      id: id,
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    },
    React.createElement(
      "div",
      { className: "modal-dialog", role: "document" },
      React.createElement(
        "div",
        { className: "modal-content" },
        React.createElement(
          "div",
          { className: "modal-header" },
          React.createElement(
            "h5",
            { className: "modal-title", id: "exampleModalLabel" },
            "About This Page"
          ),
          React.createElement(
            "button",
            {
              type: "button",
              className: "close",
              "data-dismiss": "modal",
              "aria-label": "Close"
            },
            React.createElement(
              "span",
              { "aria-hidden": "true" },
              "\xD7"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "modal-body" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "The current UI language is",
              " ",
              React.createElement(
                "span",
                { className: "badge badge-primary" },
                navigator.language
              )
            ),
            React.createElement(
              "li",
              null,
              "This page will automatically refresh if you change the UI language in your browser."
            ),
            React.createElement(
              "li",
              null,
              "Click on each of the exchange rates and see what happens."
            )
          )
        ),
        React.createElement(
          "div",
          { className: "modal-footer" },
          React.createElement(
            "button",
            {
              type: "button",
              className: "btn btn-secondary",
              "data-dismiss": "modal"
            },
            "Close"
          )
        )
      )
    )
  );
};