import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import { getRequestQuery } from "../queries/queries";
import {graphql} from 'react-apollo';

import { Link } from "react-router-dom";
import fileLogo from "../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class ThreadBlock extends React.Component {

  displayAllThreads(){
    //const {book} = this.props.data;
    console.log("ThreadBlock");
    console.log(this.props.threads);

    //if (threads) {
        return (
            <div className="thread-stream">
            {
                this.props.threads.map(item => {
                  return (<div key={item.id}>
            
                                <div className="text-boxes">

                                    <div className="enquiry-head-reply">

                                        <div className="reply-attach">
                                        <img src={arrow} className="reply-arrow-2" />
                                        </div>

                                        <div className="from-to">
                                        <div className="border-from-to">
                                            <p className="recipient">From: John Tan</p>
                                            <p>To: Jane Lim</p>
                                        </div>
                                        </div>

                                    </div>

                                    <p className="enquiry-body"> {item.threadContent} </p>

                                    </div>


                        </div>)
                })
              }
            </div>


            
            
            
        )
        /*
      } else {
        return (
          <div>No book selected...</div>
        )
      }*/

    }


  componentDidMount() {
    this.setState({
        id: this.props.id
    });
    }

  render() {
    let linkStr = "requestDetail/" + this.props.id;

    return ( 
        
        <div id="thread-stream">

            {this.displayAllThreads()}
        
        </div>

       
    );
  }
}

export default ThreadBlock;

/*
export default graphql(getRequestQuery,{
  options:(props) => {
    return{
      variables: {
        id: props.requestId
      }
    }
  }
})(ThreadBlock);
*/