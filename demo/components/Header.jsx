import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { load } from '../../lib/redux-asco'

class HeaderComponent extends Component {

  handleLoad = () => {
    this.props.load('testCollection')
    console.log("load")
  }

  render() {
    return (
      <div className="header">
        <div className="row">
          <div className="col-md-12">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary" onClick={this.handleLoad}>Load Collection</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HeaderComponent.propTypes = {
  load: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  //console.log(state)
  return { }
}
const mapDispatchToProps = {
  load
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default Header
