import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";
// import { getRequestQuery } from "../../queries/queries";
// import { graphql } from "react-apollo";

// import { Link } from "react-router-dom";
// import fileLogo from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";
import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";
// import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class ThreadBlock extends React.Component {
  displayAllThreads() {
    return (
      <div>
        {this.props.threads.map(item => {
          return (
            <div key={item.id} className="thread-stream">
              <div className="text-boxes">
                <div className="enquiry-head-reply">
                  <div className="reply-attach">
                    <img
                      src={replyArrow}
                      className="reply-arrow-new-2"
                      alt="reply-arrow"
                    />
                  </div>

                  <div className="from-to">
                    <div className="border-from-to">
                      <p className="recipient">From: John Tan</p>
                      {/* <p>To: Jane Lim</p> */}
                    </div>
                  </div>
                </div>

                <p className="enquiry-body">{item.threadContent}</p>
                <div className="attachedImageAccess">
                  {item.threadImage === "" ? null : (
                    <a className="url-bottom-left" href={item.threadImage}>
                      View attached image
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  render() {
    // let linkStr = "requestDetail/" + this.props.id;

    return <div>{this.displayAllThreads()}</div>;
  }
}

export default ThreadBlock;
