const HelpButton = () => {
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Help
      </button>
      <MessageBox id="exampleModal" />
    </React.Fragment>
  );
};

// Todo add content
const MessageBox = ({ id }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              About This Page
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              <li>
                The current UI language is{" "}
                <span className="badge badge-primary">{navigator.language}</span>
              </li>
              <li>
                This page will automatically refresh if you change the UI
                language in your browser.
              </li>
              <li>Click on each of the exchange rates and see what happens.</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};