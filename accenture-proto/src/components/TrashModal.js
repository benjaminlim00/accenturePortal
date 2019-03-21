import React from "react";
import "../styles/TrashModal.css";
import { withRouter } from "react-router-dom";

import DeleteButton from "./deleteButton";

class TrashModal extends React.Component {
  render() {
    let pageId = window.location.pathname.substring(15);
    var { handleBack, handleDelete, show, children } = this.props;

    let showHideClassName = show
      ? "modal trash-display-block"
      : "modal trash-display-none";

    const backStyle = {
      background: "#3d94f6",
      borderRadius: "6px",
      color: "#ffffff",
      fontFamily: "Lato",
      fontSize: "20px",
      fontWeight: "400",
      padding: "10px",
      display: "inline-block",
      cursor: "pointer",
      borderStyle: "solid",
      border: "none",
      marginLeft: "20px",
      marginRight: "10px",
      marginBottom: "20px"
    };

    const deleteStyle = {
      background: "#D00000",
      borderRadius: "6px",
      color: "#ffffff",
      fontFamily: "Lato",
      fontSize: "20px",
      fontWeight: "400",
      padding: "10px",
      display: "inline-block",
      cursor: "pointer",
      borderStyle: "solid",
      border: "none"
    };

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button style={backStyle} onClick={handleBack}>
            Back
          </button>
          <button style={deleteStyle} onClick={handleDelete}>
            Delete
          </button>

          <DeleteButton id={pageId} />
        </section>
      </div>
    );
  }
}
export default TrashModal;
