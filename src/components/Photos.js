import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MiscUtils from '../utils/miscUtils'
import Photo from './Photo'
import Spinner from './Spinner'
import * as photoActions from "../actions/PhotoActions"
import OpenPhoto from "./OpenPhoto"

const Photos = ({photos, actions}) => {

    useEffect(() => {

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= MiscUtils.getDocumentHeight()) {
                actions.getPhotos()
            }
        }

        actions.getPhotos(Math.round(MiscUtils.getViewportWidth() / 128 * MiscUtils.getViewportHeight() / 75))

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    return <>
        {photos?.openPhoto ? <OpenPhoto/> : null}
        <div className='photos'>
            {photos?.items.map((v, k) => <Photo item={v} key={k} actions={actions}/>)}
            <Spinner enable={photos?.fetching}/>
        </div>
    </>
}

export default connect(state => ({
    photos: state.photos
}), dispatch => ({
    actions: bindActionCreators(photoActions, dispatch)
}))(Photos)