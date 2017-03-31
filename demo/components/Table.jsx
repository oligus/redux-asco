import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class TableComponent extends Component {

  render() {
    const rows = []
    this.props.asco.collection.forEach((item, key) => {
      rows.push(
        <tr key={key}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.country}</td>
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
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
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
