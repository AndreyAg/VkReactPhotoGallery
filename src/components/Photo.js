import React from 'react'
import ArrayUtils from '../utils/arrayUtils'

const Photo = ({actions, item}) => {
    return <div className='photo'>
        <img src={ArrayUtils.findObjectByOrder(item.sizes, 'type', ['p', 'm', 's'])?.src}
             onClick={() => actions.openPhoto(item)}/>
    </div>
}

export default Photo