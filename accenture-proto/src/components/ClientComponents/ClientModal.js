import React from "react";
import "../../styles/ClientModal.css";

class ClientModal extends React.Component {
  render() {
    var { handleBack, show, children } = this.props;

    let showHideClassName = show
      ? "client-modal client-display-block"
      : "client-modal client-display-none";

    const noStyle = {
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

    const yesStyle = {
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
        <section className="client-modal-main">
          {children}
          <button style={noStyle} onClick={handleBack}>
            No
          </button>
          <button style={yesStyle} onClick={handleBack}>
            {/* add logic here */}
            Yes
          </button>
        </section>
      </div>
    );
  }
}
export default ClientModal;
