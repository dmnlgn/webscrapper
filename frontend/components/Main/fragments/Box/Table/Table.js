import React, { Component } from "react";
import ProductHeader from "../../ProductHeader";
import ProductList from "../../Product/Product";

class Table extends Component {
  render() {
    return (
      <table className="box-table">
        <thead>
          <ProductHeader
            dataHeader={this.props.sampleHeader}
            data={this.props.fetchData}
            getSortedData={this.props.getSortedData}
            pageNumber={this.props.currentPage}
            api={this.props.api}
          />
        </thead>
        <tbody className={"box-table-tbody"}>
          <ProductList data={this.props.renderFetchedData} />
        </tbody>
      </table>
    );
  }
}

export default Table;
