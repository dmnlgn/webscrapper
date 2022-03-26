import React, { Component } from "react";

class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return this.props.data?.map((e, key) => {
      return (
        <tr key={key}>
          <td>{e.name}</td>
          <td>{e.price}</td>
          <td>{e.href}</td>
        </tr>
      );
    });
  }
}

export default ProductList;
