import React from "react";
import "../../styles/createTicket.css";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";
import { graphql, compose } from "react-apollo";
import { addThreadMutation } from "../../queries/queries";

import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";
import fileLogo from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";


class CreateThread extends React.Component {
  constructor() {
    super();
    this.state = {
      threadContent:"",
      threadCreatedDate: "",
      requestId: ""
    };

  } 

  submitForm(e) {
    e.preventDefault();

    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    
        this.props.addThreadMutation({
      variables: {
        threadContent: this.state.threadContent,
        threadCreatedDate: date,
        requestId: this.props.requestId, //added

      }
    });
    


    console.log("Thread sent! Redirecting page");
  }

  isFormValid = () => {
    const { threadContent } = this.state;

    return threadContent;
  };

  render() {

    return (
        <div className="reply-thread">
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
        <form onSubmit={this.submitForm.bind(this)}>
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
            <img src={fileLogo} alt="attachment" className="file-logo" />

            <p className="attach-file">Attach</p>
            <div className="cancel-button">
                <p className="cancel">Cancel</p>
            </div>
              <button className="send-button"
                onClick={this.buttonPress}>

                <p className="send">Send</p>
                
              </button>
           </div>
           </form>

        </div>
    );
  }
}

export default compose(
  graphql(addThreadMutation,{name:"addThreadMutation"})
)(CreateThread);
