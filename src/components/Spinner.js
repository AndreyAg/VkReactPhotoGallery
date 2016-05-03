import React, { PropTypes, Component } from 'react'

export default class Spinner extends Component {

    render() {
        const { enable } = this.props
        return enable ? <div className='spinner'><div /><div /><div /><div /><div /></div> : null
    }
}

Spinner.propTypes = {
    enable: PropTypes.bool.isRequired
}