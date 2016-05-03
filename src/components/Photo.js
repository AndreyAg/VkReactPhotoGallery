import React, { PropTypes, Component } from 'react'
import ArrayUtils from '../utils/arrayUtils'

export default class Photo extends Component {

    actions = null

    constructor(props) {
        super(props)
        this.actions = this.props.actions
    }

    photoClick = () => {
        this.actions.openPhoto(this.props.item)
    }

    render() {
        const { item } = this.props

        let src = ArrayUtils.findObjectByOrder(item.sizes, 'type', ['p','m','s']).src

        return <div className='photo'>
            <img src={src} onClick={::this.photoClick} />
        </div>
    }
}

Photo.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}