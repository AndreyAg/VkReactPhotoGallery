import {call, put, select, takeEvery} from 'redux-saga/effects'
import * as CONST from '../constants/Photos'
import {photosSelector} from '../store/selectors'
import {fetchPost} from '../utils/serverUtils'
import actions from '../actions/PhotoActions'

export function* watchPhotosActions() {
    yield takeEvery(actions.getPhotos().type, fetchPhotos)
    yield takeEvery(actions.navigatePhoto().type, navigatePhotos)
}

function* fetchPhotos(dispatch) {

    const count = dispatch?.payload?.count

    try {
        const photos = yield select(photosSelector)

        if (photos.fetching || photos.isLoadedAll) {
            return
        }

        yield put({type: CONST.GET_PHOTOS_REQUEST})

        const params = {
            count: count ?? photos.count,
            offset: photos.offset
        }

        const data = yield call(() => fetchPost(params))
        yield put(actions.getPhotosSuccess(data))

    } catch (e) {
        yield put(actions.getPhotosFail(new Error(e)))
    }
}

function* navigatePhotos({payload: {id, direction}}) {

    const photos = yield select(photosSelector)

    let isLeftDirection = direction === CONST.NAVIGATE_PHOTO_LEFT
    let i = photos.items.findIndex(x => x.id === id)

    if ((i > 0 && isLeftDirection) || !isLeftDirection) {
        if (!isLeftDirection && i + 1 >= photos.items.length) {
            if (photos.fetching || photos.isLoadedAll) {
                return
            }
            yield call(fetchPhotos)
            return yield put(actions.navigatePhoto({id, direction}))
        }
        yield put(actions.openPhoto({photo: photos.items[(isLeftDirection ? --i : ++i)]}))
    }
}
