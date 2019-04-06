import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import { getRequestQuery } from "../queries/queries";
import replyArrow from "../Resources/Icons/iconfinder_reply_226602.svg";


class MainThread extends React.Component {

  displayMainThread(){

        return (

            <div className="text-boxes">
            <div className="enquiry-head">
            <h4 className="small-heading enquiry-title">{this.props.subject}</h4>
            <p className="timing"> {this.props.dateRequested}</p>
            <p className="author">Created by: {this.props.creatorFirstName}  {this.props.creatorLastName} </p>
            </div>   
            <div className="enquiry-body">
            {this.props.mainThread}
            </div>
            </div>

        )


    }


  componentDidMount() {
    this.setState({
        id: this.props.id
    });
    }

  render() {
    let linkStr = "requestDetail/" + this.props.id;

    return ( 
        
        <div>
            {this.displayMainThread()}
        </div>

       
    );
  }
}

export default MainThread;
