import {createActions} from 'redux-actions'
import * as CONST from '../constants/Photos'

const actions = [
    CONST.GET_PHOTOS,
    CONST.OPEN_PHOTO,
    CONST.CLOSE_PHOTO,
    CONST.NAVIGATE_PHOTO,
    CONST.GET_PHOTOS_SUCCESS,
    CONST.GET_PHOTOS_FAIL,
]

export default createActions(...actions)
