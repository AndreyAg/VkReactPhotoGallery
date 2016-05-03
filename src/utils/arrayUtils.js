export default class ArrayUtils {

    static findObjectByOrder(obj, field, values) {

        let r

        for(let v of values) {
            r = obj.find(x => x[field] == v)
            if(r) {
                break;
            }
        }

        return r

    }
}