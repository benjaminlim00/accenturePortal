import React, { Component } from "react";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class Test extends Component {
  componentWillMount() {
    this.setState({
      isMenuOpened: false,
      selectedOption: null,
      selectedOptionArr: null
    });
  }

  handleClick = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  handleDropdown = selectedOption => {
    let selectedOptionArr = [];
    this.setState({ selectedOption });
    // console.log(selectedOption);

    for (var i = 0; i < selectedOption.length; i++) {
      let item = selectedOption[i].value;
      selectedOptionArr.push(item);
    }

    // console.log(selectedOptionArr);
    this.setState({ selectedOptionArr });
  };

  render() {
    const { selectedOption } = this.state;
    //
    // console.log(selectedOption);

    return (
      <OffCanvas
        width={300}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={this.state.isMenuOpened}
        position={"left"}
      >
        <OffCanvasBody className="">
          <p>This is the main body container.</p>
          <p>
            <a href="#" onClick={this.handleClick.bind(this)}>
              Click here
            </a>{" "}
            to toggle the menu.
          </p>
        </OffCanvasBody>

        <OffCanvasMenu className="">
          <a href="#" onClick={this.handleClick.bind(this)}>
            X
          </a>
          <br />
          <p>Placeholder content.</p>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>
              <Select
                value={selectedOption}
                onChange={this.handleDropdown}
                options={options}
                isMulti={true}
              />
            </li>
          </ul>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }
}

export default Test;
