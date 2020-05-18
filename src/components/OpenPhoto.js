import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ArrayUtils from '../utils/arrayUtils'
import MiscUtils from '../utils/miscUtils'

import {NAVIGATE_PHOTO_LEFT, NAVIGATE_PHOTO_RIGHT} from '../constants/Photos'
import * as photosActions from "../actions/PhotosActions"

const OpenPhoto = ({photos, photosActions}) => {

    const navigatePhoto = direction => {
        photosActions.navigatePhoto(photos.openPhoto.id, direction)
    }

    const closePhoto = () => {
        photosActions.closePhoto()
    }

    useEffect(() => {

        const handleKeyPress = e => {
            const keyCode = e.keyCode
            if (keyCode === 37 || keyCode === 39) {
                navigatePhoto(keyCode === 37 ? NAVIGATE_PHOTO_LEFT : NAVIGATE_PHOTO_RIGHT)
            } else if (keyCode === 27) {
                photosActions.closePhoto()
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [photos.openPhoto.id])

    const photo = ArrayUtils.findObjectByOrder(photos.openPhoto.sizes, 'type', ['w', 'z', 'y', 'x', 'r', 'q', 'p'])

    const style = {
        backgroundImage: 'url(' + photo.src + ')',
        ...MiscUtils.getPictureViewportSize(photo.width, photo.height)
    }

    return <div className='open' style={style}>
        {photos.openPhoto.text ? <div className='text'>{photos.openPhoto.text}</div> : null}
        <div className='close' onClick={closePhoto}>×</div>
        <div className='left' onClick={navigatePhoto.bind(this, NAVIGATE_PHOTO_LEFT)}>←</div>
        <div className='right' onClick={navigatePhoto.bind(this, NAVIGATE_PHOTO_RIGHT)}>→</div>
    </div>
}

export default connect(state => ({
    photos: state.photos
}), dispatch => ({
    photosActions: bindActionCreators(photosActions, dispatch)
}))(OpenPhoto)