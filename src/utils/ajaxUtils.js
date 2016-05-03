import 'whatwg-fetch'

export default class AjaxUtils {

    static fetchPost(dispatch, body, successType, failType) {

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                dispatch({
                    type: failType,
                    payload: new Error(response.statusText),
                    error: true
                })
            }
        }

        function parseJSON(response) {
            return response.json()
        }

        return fetch('//' + location.hostname + ':5555', {
            method: 'POST',
            body: body ? JSON.stringify(body) : null
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            dispatch({
                type: successType,
                payload: data
            })
        }).catch(function (err) {
            dispatch({
                type: failType,
                payload: new Error(err),
                error: true
            })
        })
    }

}