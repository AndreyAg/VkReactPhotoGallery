import * as CONST from '../constants/Photos'
import AjaxUtils from '../utils/ajaxUtils'

export function getPhotos(initCount) {
    return (dispatch, getState) => {

        const {photos} = getState()

        if (photos.fetching || photos.isLoadedAll) {
            return
        }

        dispatch({
            type: CONST.GET_PHOTOS_REQUEST
        })

        return AjaxUtils.fetchPost(dispatch, {
            count: initCount ? initCount : photos.count,
            offset: photos.offset
        }, CONST.GET_PHOTOS_SUCCESS, CONST.GET_PHOTOS_FAIL)
    }
}

export function openPhoto(photo) {
    return dispatch => {
        dispatch({
            type: CONST.OPEN_PHOTO_SHOW,
            payload: photo
        })
    }
}

export function closePhoto() {
    return dispatch => {
        dispatch({
            type: CONST.OPEN_PHOTO_CLOSE
        })
    }
}

export function navigatePhoto(id, direction) {

    return (dispatch, getState) => {

        const state = getState()

        let isLeftDirection = direction === CONST.NAVIGATE_PHOTO_LEFT
        let i = state.photos.items.findIndex(x => x.id === id)

        if ((i > 0 && isLeftDirection) || !isLeftDirection) {
            if (!isLeftDirection && i + 1 >= state.photos.items.length) {
                if (state.photos.fetching || state.photos.isLoadedAll) {
                    return
                }
                return dispatch(getPhotos()).then(() => {
                    dispatch(navigatePhoto(id, direction))
                })
            }
            dispatch(openPhoto(state.photos.items[(isLeftDirection ? --i : ++i)]))
        }
    }
}