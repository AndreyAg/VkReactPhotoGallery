const findObjectByOrder = (obj, field, values) => {
    let r
    for (let v of values) {
        r = obj.find(x => x[field] === v)
        if (r) return r
    }
}

export {findObjectByOrder}
