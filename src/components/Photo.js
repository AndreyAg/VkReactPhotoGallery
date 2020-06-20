import React, {useCallback} from 'react'
import ArrayUtils from '../utils/arrayUtils'

const Photo = ({actions, item}) => {

    const clickOnPhoto = useCallback(() => {
        actions.openPhoto(item)
    }, [item])

    return <div className='photo'>
        <img src={ArrayUtils.findObjectByOrder(item.sizes, 'type', ['p', 'm', 's'])?.src}
             onClick={clickOnPhoto} alt=''/>
    </div>
}

export default Photo