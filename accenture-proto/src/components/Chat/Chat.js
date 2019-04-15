import React from "react";
import firebase from "firebase/app";
import "./Chat.css";

// import { database } from "../firebase/firebaseExport";

class Chat extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: "",
      messages: []
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref("messages/")
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages != null) {
          this.setState({
            messages: currentMessages
          });
        }
      });
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }
  submitMessage(e) {
    e.preventDefault();
    this.setState({ message: "" }); //clear the input
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message,
      author: this.props.author //here use props too
    };
    // let list = Object.assign([], this.state.messages);
    // list.push(nextMessage);
    //
    // this.setState({ messages: list });

    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
  }

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li className="message-wrapper" key={message.id}>
          {message.author}: {message.text}
        </li>
      );
    });
    return (
      <div>
        {this.props.author === "joseph" ? (
          <h3>Ben (Admin)</h3>
        ) : (
          <h3>Joseph (Admin)</h3>
        )}

        {/* take props */}

        <ol>{currentMessage}</ol>
        <form onSubmit={this.submitMessage}>
          <input
            onChange={this.updateMessage}
            type="text"
            placeholder="Message"
            value={this.state.message}
          />
          <br />
          <button type="submit">Submit Message</button>
        </form>
      </div>
    );
  }
}

export default Chat;
