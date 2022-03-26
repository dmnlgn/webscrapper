import React, { Component } from 'react';

class FilterTemplate extends Component {
    state = {  } 
    render() { 
        return (
            <div className="filter">
                <div className="filter-header">{this.props.filterName}</div>
            </div>
        );
    }
}
 
export default FilterTemplate;