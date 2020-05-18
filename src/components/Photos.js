import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MiscUtils from '../utils/miscUtils'

import Photo from './Photo'
import Spinner from './Spinner'
import * as photosActions from "../actions/PhotosActions"
import OpenPhoto from "./OpenPhoto"

const Photos = ({photos, photosActions}) => {

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= MiscUtils.getDocumentHeight()) {
            photosActions.getPhotos()
        }
    }

    useEffect(() => {
        photosActions.getPhotos(Math.round(MiscUtils.getViewportWidth() / 128 * MiscUtils.getViewportHeight() / 75))
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }, [])

    return <>
        {photos?.openPhoto ? <OpenPhoto/> : null}
        <div className='photos'>
            {photos?.items.map((v, k) => <Photo item={v} key={k} actions={photosActions}/>)}
            <Spinner enable={photos?.fetching}/>
        </div>
    </>
}

export default connect(state => ({
    photos: state.photos
}), dispatch => ({
    photosActions: bindActionCreators(photosActions, dispatch)
}))(Photos)