import React from "react";
import arrowdownIcon from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import Select from "react-select";
import options1 from "./DropdownOptions";

function FilterForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="filter-text">
        <span>
          Filter by:
          <img src={arrowdownIcon} className="arrow-down" />
        </span>
      </div>
      <div className="sort-by-text">
        <span>
          Sort by: Date Requested
          <img src={arrowdownIcon} className="arrow-down" />
        </span>
      </div>
      <div className="filter-box">
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">Requester</h3>
          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown1}
            options={options1}
            isMulti={true}
          />
        </div>
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">Date Requested</h3>

          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown2}
            options={options1}
            isMulti={true}
          />
        </div>
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">Priority</h3>

          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown3}
            options={options1}
            isMulti={true}
          />
        </div>
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">Status</h3>
          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown4}
            options={options1}
            isMulti={true}
          />
        </div>
      </div>
      <div className="filter-box-2">
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">Asset(s)</h3>
          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown5}
            options={options1}
            isMulti={true}
          />
        </div>
        <div className="col span-1-of-4">
          <h3 className="small-heading request-details">xxxxxx</h3>
          <Select
            className="input-for-filter-details"
            onChange={props.handleDropdown6}
            options={options1}
            isMulti={true}
          />
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
