import React from "react";
import "../styles/TrashModal.css";

class TrashModal extends React.Component {
  render() {
    var { handleBack, handleDelete, show, children } = this.props;

    let showHideClassName = show
      ? "modal trash-display-block"
      : "modal trash-display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleDelete}>Confirm delete</button>
        </section>
      </div>
    );
  }
}
export default TrashModal;
