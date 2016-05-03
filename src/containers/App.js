import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Photos from '../components/Photos'
import OpenPhoto from '../components/OpenPhoto'
import * as photosActions from '../actions/PhotosActions'

export default class App extends Component {
    render() {
        const store = this.props

        return <div>
            {store.photos.openPhoto ? <OpenPhoto store={store} /> : null}
            <Photos store={store} />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        photosActions: bindActionCreators(photosActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)