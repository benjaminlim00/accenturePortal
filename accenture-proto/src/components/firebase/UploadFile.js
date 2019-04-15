import React from "react";
// import axios from "axios"
import { storage } from "./firebaseExport";
import LinearDeterminate from "../LinearDeterminate";

import "./UploadFile.css";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage
      .ref(`${this.props.userID}/${image.name}`)
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
          .ref(`images`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );

    // let handleBack = this.props.click;
    // console.log(handleBack);
  };

  render() {
    // console.log(this.props.clickBack);

    let showDone = this.state.progress == 100;

    return (
      <div>
        <img
          src={this.state.url || "http://via.placeholder.com/400x250"}
          alt="uploaded images"
          height="400"
          width="250"
        />
        <br />
        {showDone ? <p>Successfully uploaded!</p> : null}
        <br />
        {/* <progress id="uploader" value={this.state.progress} max="100" /> */}

        {/* <div class="btn-file-input">
          <input type="file" onChange={this.handleChange} />
        </div> */}

        <div class="file-input-wrapper">
          <button class="btn-file-input">Choose File</button>
          <input type="file" onChange={this.handleChange} />
        </div>

        <br />
        <br />
        <button className="buttonStyleUpload" onClick={this.handleUpload}>
          Upload
        </button>
        <button className="buttonStyleBack" onClick={this.props.clickBack}>
          Back
        </button>

        <LinearDeterminate id="uploader" progress={this.state.progress} />
      </div>
    );
  }
}
export default UploadFile;
