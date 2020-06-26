import * as CONST from '../constants/Photos'

const initialState = {
    year: 2016,
    items: [],
    fetching: false,
    init: false,
    count: 50,
    offset: 0,
    isLoadedAll: false,
    openPhoto: null,
}

export default function photos(state = initialState, action) {
    switch (action.type) {

        case CONST.GET_PHOTOS_REQUEST:
            return {...state, fetching: true}

        case CONST.GET_PHOTOS_SUCCESS:
            return {
                ...state,
                items: [...state.items, ...action.payload.items],
                offset: state.offset + (state.init ? state.count : action.payload.items.length),
                fetching: false,
                isLoadedAll: !action.payload.items.length,
                init: true
            }

        case CONST.GET_PHOTOS_FAIL:
            return {...state, fetching: false}

        case CONST.OPEN_PHOTO:
            return {...state, openPhoto: action.payload.photo}

        case CONST.CLOSE_PHOTO:
            return {...state, openPhoto: null}

        default:
            return state
    }
}
