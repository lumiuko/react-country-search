import React from 'react';

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      selectedItem: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  // Triggers then user clicks the dropdown to open it
  handleClick(e) {
    this.setState(prevState => {
      return {
        isExpanded: !prevState.isExpanded
      };
    });

    // Hide the dropdown if user clicks anywhere else
    window.addEventListener('click', globalEvent => {
      if (this.state.isExpanded && e.target !== globalEvent.target) {
        this.setState({ isExpanded: false });
      }
    });
  }

  // Triggers when user selects an item fron the dropdown
  selectItem(e) {
    this.setState({
      selectedItem: e.target.textContent || '',
      isExpanded: false
    });
  }

  componentDidUpdate() {
    this.props.onSelect(this.state.selectedItem);
  }

  render() {
    const { regions } = this.props;
    const bodyStyle = {
      display: this.state.isExpanded ? 'block' : 'none'
    };

    // Mapping the dropdown array with list-items
    const arr = regions.map(item => (
      <li onClick={e => this.selectItem(e)} key={item.id}>
        {item.name}
      </li>
    ));

    return (
      <div className="select-box">
        <div onClick={this.handleClick} className="input region-filter">
          {this.state.selectedItem || 'Filter by Region'}
        </div>
        <div style={bodyStyle} className="select-box-body input">
          <ul>{arr}</ul>
        </div>
      </div>
    );
  }
}

export default Dropdown;
