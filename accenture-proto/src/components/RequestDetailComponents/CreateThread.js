import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";

import { storage } from "../firebase/firebaseExport";
import { graphql, compose } from "react-apollo";
import { addThreadMutation } from "../../queries/queries";
import UploadModal from "../firebase/UploadModal";
import CircularIndeterminate from "../CircularIndeterminate";

import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";
import fileLogo from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

class CreateThread extends React.Component {
  constructor() {
    super();
    this.state = {
      threadContent: "",
      threadCreatedDate: "",
      requestId: "",
      image: null,
      url: "",
      loading: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addThread = this.addThread.bind(this);
  }

  handleFileChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  addThread() {
    //here we do mutation for new thread
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    this.props.addThreadMutation({
      variables: {
        threadContent: this.state.threadContent,
        threadCreatedDate: date,
        requestId: this.props.requestId, //added
        threadImage: this.state.url
      }
    });

    // console.log("Thread sent! Redirecting page");
    window.location.reload();
  }

  submitForm(e) {
    e.preventDefault();

    this.setState({ loading: true });
    const { image } = this.state;
    if (image === null) {
      this.addThread();
    } else {
      const uploadTask = storage
        .ref(`${this.props.userID}/${this.props.subject}/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          //progress fnc
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          //error fnc
          console.log(error);
        },
        () => {
          //complete fnc
          storage
            .ref(`${this.props.userID}/${this.props.subject}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.setState({ url });

              //dump all

              this.addThread();
            });
        }
      );
    }
  }

  isFormValid = () => {
    const { threadContent } = this.state;

    return threadContent;
  };

  render() {
    // let showDone = this.state.progress == 100;

    return (
      <div className="reply-thread">
        {this.state.loading ? (
          <div className="CircularIndeterminate">
            <CircularIndeterminate />
          </div>
        ) : null}
        <div className="enquiry-head-reply">
          <div className="reply-attach">
            <img src={replyArrow} className="reply-arrow" />
          </div>

          <div className="from-to">
            <div className="border-from-to">
              <p className="recipient">From: John Tan</p>
              <p>To: Jane Lim</p>
            </div>
          </div>
        </div>
        <form onSubmit={this.submitForm}>
          <label>
            <textarea
              placeholder="Enter text here..."
              onChange={e => this.setState({ threadContent: e.target.value })}
              rows="8"
              cols="88"
              className="textareareplyThread"
            />
          </label>

          <div className="enquiry-head">
            <div className="">
              <img src={fileLogo} alt="attachment" className="file-logo" />
              <input type="file" onChange={this.handleFileChange} />
            </div>

            <div className="cancel-button">
              <p className="cancel">Cancel</p>
            </div>
            <button
              className="send-button-createThread"
              type="submit"
              disabled={!this.isFormValid()}
            >
              <p className="send-req-details">Send</p>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(addThreadMutation, { name: "addThreadMutation" })
)(CreateThread);
