import React, { PropTypes, Component } from 'react'
import Photo from './Photo'
import Spinner from './Spinner'
import MiscUtils from '../utils/miscUtils'

export default class Photos extends Component {

    data = null
    actions = null

    constructor(props) {
        super(props)
        this.actions = this.props.store.photosActions
        window.addEventListener('scroll', this.handleScroll)
        let initCount = Math.round(MiscUtils.getViewportWidth() / 128 * MiscUtils.getViewportHeight() / 75)
        this.loadPhotos(initCount)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        if((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            this.actions.getPhotos()
        }
    }

    loadPhotos(initCount) {
        this.actions.getPhotos(initCount)
    }

    render() {
        this.data = this.props.store.photos
        return <div className='photos'>
            {this.data.items.map((v, k) =>
                <Photo item={v} key={k} actions={this.actions} />
            )}
            <Spinner enable={this.data.fetching} />
        </div>
    }
}

Photos.propTypes = {
    store: PropTypes.object.isRequired
}