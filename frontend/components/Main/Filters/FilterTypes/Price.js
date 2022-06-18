import React, { useState } from "react";

const Price = (props) => {
  const [values, setValues] = useState({
    firstValue: "",
    secondValue: "",
  });

  const handleChangefirstVal = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      firstValue: parseFloat(value),
    });
  };

  const handleChangesecondVal = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      secondValue: parseFloat(value),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (values.firstValue && values.secondValue) {
      filterValue(values);
    }
  };

  const filterValue = (values) => {
    const { firstValue, secondValue } = values;
    const { data } = props;

    let filterData = [];
    if (data) {
      filterData = data?.filter((e) => {
        if (
          (e.price >= firstValue && e.price <= secondValue) ||
          (e.discountPrice &&
            e.discountPrice >= firstValue &&
            e.discountPrice <= secondValue)
        ) {
          return e;
        }
      });
      props.getRenderData(filterData);
      // if (filterData.length) {
      //   props.getRenderData(filterData);
      // } else {
      //   return false;
      // }
    }
  };

  const returnData = () => {
    setValues({
      firstValue: "",
      secondValue: "",
    });

    document.getElementById("firstVal").value = "";
    document.getElementById("secondVal").value = "";

    props.getData();
  };

  return (
    <form className="filter-box-list-main-content" onSubmit={onSubmit}>
      <div className="filter-box-list-main-content-filter">
        <span>OD</span>
        <input id="firstVal" onChange={handleChangefirstVal} />
        <span>DO</span>
        <input id="secondVal" onChange={handleChangesecondVal} />
      </div>
      <div className="filter-box-list-main-content-buttons">
        <button type="submit">filter</button>
        <button type="reset" onClick={returnData}>
          x
        </button>
      </div>
    </form>
  );
};

export default Price;
