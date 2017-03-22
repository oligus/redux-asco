import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'

class DataComponent extends Component {
  render() {
    return (
      <div className="data">
        <Header />
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
