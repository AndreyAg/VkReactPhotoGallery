import React, {memo, useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {findObjectByOrder} from '../utils/arrayUtils'
import {getPictureViewportSize} from '../utils/miscUtils'
import {NAVIGATE_PHOTO_LEFT, NAVIGATE_PHOTO_RIGHT} from '../constants/Photos'

const getPhotoSize = async (image) => {

    if (image.width && image.height) {
        return {width: image.width, height: image.height}
    }

    const newImage = new Image()
    newImage.src = image.src
    await new Promise(resolve => newImage.onload = resolve)

    return {width: newImage.width, height: newImage.height}
}

const PhotoPreview = ({photo, onNavigate, onClose}) => {

    const dispatch = useDispatch()

    const image = findObjectByOrder(photo.sizes, 'type', ['w', 'z', 'y', 'x', 'r', 'q', 'p'])
    const [size, setSize] = useState({width: image.width, height: image.height})
    const {id} = photo

    const navigateLeft = useCallback(() => dispatch(onNavigate({id, direction: NAVIGATE_PHOTO_LEFT})), [id])
    const navigateRight = useCallback(() => dispatch(onNavigate({id, direction: NAVIGATE_PHOTO_RIGHT})), [id])
    const navigateClose = useCallback(() => dispatch(onClose()), [id])

    useEffect(() => {

        const handleKeyPress = e => {
            switch (e.key) {
                case 'ArrowLeft':
                    navigateLeft()
                    break
                case 'ArrowRight':
                    navigateRight()
                    break
                case 'Escape':
                    navigateClose()
            }
        }

        if (size.width !== image.width || size.height !== image.height) {
            setSize({width: image.width, height: image.height})
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)

    }, [id])

    if (!size.width) {
        getPhotoSize(image).then(setSize)
    }

    const style = {
        backgroundImage: 'url(' + image.src + ')',
        ...getPictureViewportSize(size.width, size.height)
    }

    return <div className='open' style={style}>
        {photo.text ? <div className='text'>{photo.text}</div> : null}
        <div className='close' onClick={navigateClose}>×</div>
        <div className='left' onClick={navigateLeft}>←</div>
        <div className='right' onClick={navigateRight}>→</div>
    </div>
}

PhotoPreview.propTypes = {
    photo: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default memo(PhotoPreview)
