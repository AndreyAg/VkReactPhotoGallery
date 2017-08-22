export default class AjaxUtils {

    static fetchPost(dispatch, body, successType, failType) {

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }

        function parseJSON(response) {
            return response.json()
        }

        return fetch('//' + location.hostname + '/photos.php' , {
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