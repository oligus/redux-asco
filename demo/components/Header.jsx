import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { load, next, previous } from '../../lib/redux-asco'

class HeaderComponent extends Component {

  handleLoad = () => {
    this.props.load('testCollection')
  }

  handlePrevious = () => {
    this.props.previous('testCollection')
  }

  handleNext = () => {
    this.props.next('testCollection')
  }

  render() {
    return (
      <div className="header">
        <div className="row">
          <div className="col-md-12">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary" onClick={this.handleLoad}>Load Collection</button>
              <button type="button" className="btn btn-secondary" onClick={this.handlePrevious}>Previous</button>
              <button type="button" className="btn btn-secondary" onClick={this.handleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HeaderComponent.propTypes = {
  load: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  //console.log(state)
  return { }
}
const mapDispatchToProps = {
  load,
  next,
  previous
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default Header
