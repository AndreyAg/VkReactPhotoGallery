import {NAVIGATE_PHOTO_LEFT, NAVIGATE_PHOTO_RIGHT} from '../constants/Photos'
import React, { Component } from 'react'
import ArrayUtils from '../utils/arrayUtils'
import MiscUtils from '../utils/miscUtils'

export default class OpenPhoto extends Component {

    data = null
    actions = null

    constructor(props) {
        super(props)
        this.actions = this.props.store.photosActions
        window.addEventListener('keypress', this.handleKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress = (e) => {
        let keyCode = e.keyCode
        console.log(keyCode)
        if(keyCode == 37 || keyCode == 39) {
            e.preventDefault();
            this.navigatePhoto(keyCode == 37 ? NAVIGATE_PHOTO_LEFT : NAVIGATE_PHOTO_RIGHT)
        }
        else if(keyCode == 27) {
            this.closePhoto()
        }
    }

    navigatePhoto = (direction) => {
        this.actions.navigatePhoto(this.data.openPhoto.id, direction)
    }

    closePhoto = () => {
        this.actions.closePhoto()
    }

    render() {

        this.data = this.props.store.photos

        let photo = ArrayUtils.findObjectByOrder(this.data.openPhoto.sizes, 'type', ['w','z','y','x','r','q','p'])

        let style = {
            backgroundImage: 'url(' + photo.src + ')',
            ...MiscUtils.getPictureViewportSize(photo.width, photo.height)
        };

        return <div className='open' style={style}>
            {this.data.openPhoto.text ? <div className='text'>{this.data.openPhoto.text}</div> : null}
            <div className='close' onClick={::this.closePhoto}>×</div>
            <div className='left' onClick={::this.navigatePhoto.bind(NAVIGATE_PHOTO_LEFT)}>←</div>
            <div className='right' onClick={::this.navigatePhoto.bind(NAVIGATE_PHOTO_RIGHT)}>→</div>
        </div>
    }
}