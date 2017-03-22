import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class TableComponent extends Component {
  render() {
    const rows = []
    this.props.asco.collection.forEach((item, key) => {
      rows.push(
        <tr key={key}>
          <td>{item.name}</td>
        </tr>
      )
    })

    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

TableComponent.propTypes = {

}

const mapStateToProps = (state) => {
  const asco = state.asco.collections.testCollection
  return { asco }
}
const mapDispatchToProps = {

}

const Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default Table
