import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Table from './Table'

class DataComponent extends Component {
  render() {
    return (
      <div className="data">
        <Header />
        <Table />
      </div>
    )
  }
}

DataComponent.propTypes = {

}

const mapStateToProps = (state) => {
  return { }
}
const mapDispatchToProps = {

}

const Data = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataComponent)

export default Data
