import React, {memo, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {findObjectByOrder} from '../utils/arrayUtils'

const PhotoSpot = ({photo, onClick}) => {

    const dispatch = useDispatch()

    const clickHandler = useCallback(() => dispatch(onClick({photo})), [photo.id])
    const src = findObjectByOrder(photo.sizes, 'type', ['p', 'm', 's'])?.src

    return <div className='photo'>
        <img src={src} onClick={clickHandler} alt='{photo.text}'/>
    </div>
}

PhotoSpot.propTypes = {
    photo: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default memo(PhotoSpot)
