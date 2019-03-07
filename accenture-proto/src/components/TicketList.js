import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import editIcon from "../Resources/Icons/iconfinder_compose_3671747.svg";

import FilterForm from "./FilterForm";

import { graphql, compose } from "react-apollo";
import { getRequestsQuery } from "../queries/queries";

class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: false,
      checkbox: {
        checkboxAll: false,
        checkboxIcon1: false,
        checkboxIcon2: false,
        checkboxIcon3: false,
        checkboxIcon4: false,
        checkboxIcon5: false,
        checkboxIcon6: false,
        checkboxIcon7: false
      },
      dropdownRequester: null,
      dropdownDateRequested: null,
      dropdownPriorityForm: null,
      dropdownStatusForm: null,
      dropdownAssertsForm: null,
      dropdownXxForm: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleDropdown1 = this.handleDropdown1.bind(this);
    this.handleDropdown2 = this.handleDropdown2.bind(this);
    this.handleDropdown3 = this.handleDropdown3.bind(this);
    this.handleDropdown4 = this.handleDropdown4.bind(this);
    this.handleDropdown5 = this.handleDropdown5.bind(this);
    this.handleDropdown6 = this.handleDropdown6.bind(this);
  }

  componentDidMount() {}

  handleDropdown1 = selectedOption => {
    // console.log(selectedOption[0].label);
    // this.setState({ dropdownRequester: selectedOption[0].label });
    //
    this.setState({ selectedOption });
  };
  handleDropdown2 = selectedOption => {
    console.log(selectedOption);
    this.setState({ selectedOption });
  };
  handleDropdown3 = selectedOption => {
    this.setState({ selectedOption });
  };
  handleDropdown4 = selectedOption => {
    this.setState({ selectedOption });
  };
  handleDropdown5 = selectedOption => {
    this.setState({ selectedOption });
  };
  handleDropdown6 = selectedOption => {
    this.setState({ selectedOption });
  };

  handleSubmit = () => {
    console.log("form submitted");
  };

  handleChange = () => {
    console.log("typed something");
  };

  handleClick = () => {
    console.log("clicked edit button, go to next webpage");
    this.setState({
      data: true
    });
  };

  handleCheckbox = event => {
    console.log("clicked checkbox");
    const { name, value, type, checked } = event.target;

    if (name === "checkboxAll") {
      if (checked === true) {
        this.setState({
          checkbox: {
            checkboxAll: true,
            checkboxIcon1: true,
            checkboxIcon2: true,
            checkboxIcon3: true,
            checkboxIcon4: true,
            checkboxIcon5: true,
            checkboxIcon6: true,
            checkboxIcon7: true
          }
        });
      } else {
        this.setState({
          checkbox: {
            checkboxAll: false,
            checkboxIcon1: false,
            checkboxIcon2: false,
            checkboxIcon3: false,
            checkboxIcon4: false,
            checkboxIcon5: false,
            checkboxIcon6: false,
            checkboxIcon7: false
          }
        });
      }
    } else {
      type === "checkbox"
        ? this.setState(prevState => {
            return {
              checkbox: {
                ...prevState.checkbox,
                [name]: checked
              }
            };
          })
        : this.setState({
            [name]: value
          });
    }
  };

  render() {
    const textShow = this.state.data ? "Benjamin" : null;

    const textShow2 = this.state.data ? "Insurance" : null;

    const textShow3 = this.state.data ? "Check on prenium" : null;

    const textShow4 = this.state.data ? "18-11-2019" : null;

    const textShow5 = this.state.data ? "Urgent" : null;

    const textShow6 = this.state.data ? "Not reviewed" : null;

    return (
      <div>
        {/*--- NAVIGATION ---*/}
        <header className="header">
          <nav>
            <div className="row" />
          </nav>
        </header>
        <section className="ticketing-section">
          <section className="ticketing-head" />
          <section className="ticket-list-start">
            <div className="row">
              <h2 className="small-heading">
                All Tickets
                <button className="edit-tickets-image">
                  <img
                    src={editIcon}
                    alt="edit icon"
                    onClick={this.handleClick}
                  />
                </button>
              </h2>
              {/*insert dropdown here*/}
            </div>
          </section>
          <section className="current-tickets">
            <FilterForm
              data={this.state}
              handleDropdown1={this.handleDropdown1}
              handleDropdown2={this.handleDropdown2}
              handleDropdown3={this.handleDropdown3}
              handleDropdown4={this.handleDropdown4}
              handleDropdown5={this.handleDropdown5}
              handleDropdown6={this.handleDropdown6}
            />
            <div className="filter-box request-list-header">
              <div className="col span-1-of-7">
                <input
                  className="checkboxAll"
                  type="checkbox"
                  name="checkboxAll"
                  checked={this.state.checkbox.checkboxAll}
                  onChange={this.handleCheckbox}
                />
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Requester</h4>
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Asset(s)</h4>
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Subject</h4>
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Date Requested</h4>
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Priority</h4>
              </div>
              <div className="col span-1-of-7">
                <h4 className="detail">Status</h4>
              </div>
            </div>
            <div className="filter-box-2 grid-row">
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon1"
                    checked={this.state.checkbox.checkboxIcon1}
                    onChange={this.handleCheckbox}
                  />
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow}</p>
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow2}</p>
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow3}</p>
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow4}</p>
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow5}</p>
                </div>
                <div className="col span-1-of-7">
                  <p>{textShow6}</p>
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon2"
                    checked={this.state.checkbox.checkboxIcon2}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon3"
                    checked={this.state.checkbox.checkboxIcon3}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon4"
                    checked={this.state.checkbox.checkboxIcon4}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon5"
                    checked={this.state.checkbox.checkboxIcon5}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon6"
                    checked={this.state.checkbox.checkboxIcon6}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
              <div className="request-row">
                <div className="col span-1-of-7">
                  <input
                    className="indiv-checkbox rows"
                    type="checkbox"
                    name="checkboxIcon7"
                    checked={this.state.checkbox.checkboxIcon7}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
}
export default TicketList;
