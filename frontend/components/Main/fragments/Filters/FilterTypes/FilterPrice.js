import React, { Component } from "react";
import "./FilterPrice.less";

class FilterPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstVal: "",
      secondVal: "",
      data: this.props.data,
    };
  }

  handleChangefirstVal = (ev) => {
    this.setState({
      firstVal: ev.target.value,
    });
  };

  handleChangesecondVal = (ev) => {
    this.setState({
      secondVal: ev.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { firstVal, secondVal } = this.state;

    if (firstVal && secondVal) {
      this.filterValue(firstVal, secondVal);
    }
  };

  filterValue = (firstVal, secondVal) => {
    const { data } = this.state;

    let filterData = [];
    if (data && firstVal && secondVal) {
      filterData = this.props.data?.filter((e) => {
        if (e.price > firstVal && e.price < secondVal) {
          return e;
        }
      });
      if (filterData.length) {
        this.props.getFilterData(filterData);
      } else {
        return false;
      }
    }
  };

  returnData = () => {
    const { firstVal, secondVal } = this.state;
    if (firstVal || secondVal) {
      this.props.getFilterData(this.props.data);
    }
  };

  render() {
    return (
      <div className="filter-price">
        <div className="filter-box-list-header">PRICE</div>
        <div className="filter-box-list-main">
          <form
            className="filter-box-list-main-content"
            onSubmit={this.handleSubmit}>
            <div className="filter-box-list-main-content-filter">
              <span>OD</span>
              <input id="firstVal" onChange={this.handleChangefirstVal} />
              <span>DO</span>
              <input id="secondVal" onChange={this.handleChangesecondVal} />
            </div>
            <div className="filter-box-list-main-content-buttons">
              <button type="submit">filter</button>
              <button type="reset" onClick={this.returnData}>
                x
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FilterPrice;
