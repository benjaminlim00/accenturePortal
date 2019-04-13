import React from "react";
import UploadFile from "./UploadFile";
import "../../styles/TrashModal.css";

class UploadModal extends React.Component {
  render() {
    var { handleBack, show, children } = this.props;

    let showHideClassName = show
      ? "modal trash-display-block"
      : "modal trash-display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <UploadFile clickBack={handleBack} />
        </section>
      </div>
    );
  }
}
export default UploadModal;
