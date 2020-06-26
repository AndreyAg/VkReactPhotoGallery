import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDocumentHeight, getViewportHeight, getViewportWidth} from '../utils/miscUtils'
import actions from '../actions/PhotoActions'
import PhotoSpot from './PhotoSpot'
import PhotoPreview from './PhotoPreview'
import Spinner from './Spinner'

import {photosSelector} from '../store/selectors'

const PhotosList = () => {

    const photos = useSelector(photosSelector)
    const dispatch = useDispatch()

    useEffect(() => {

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= getDocumentHeight()) {
                dispatch(actions.getPhotos())
            }
        }

        dispatch(actions.getPhotos({count: Math.round(getViewportWidth() / 128 * getViewportHeight() / 75)}))

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [dispatch])

    return <>
        {photos?.openPhoto ?
            <PhotoPreview photo={photos?.openPhoto} onNavigate={actions.navigatePhoto}
                          onClose={actions.closePhoto}/> : null}
        <div className='photos'>
            {photos?.items.map(photo => <PhotoSpot key={photo.id} photo={photo} onClick={actions.openPhoto}/>)}
            <Spinner enable={photos?.fetching}/>
        </div>
    </>
}

export default memo(PhotosList)
