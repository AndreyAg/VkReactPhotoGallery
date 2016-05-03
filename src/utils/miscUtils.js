export default class MiscUtils {

    static getViewportWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }

    static getViewportHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }

    static getPictureViewportSize(iW, iH) {

        if(!iW && !iH) {
            iW = 604
            iH = 453
        }

        let oH = this.getViewportHeight() - 65
        let oW = this.getViewportWidth() - 50
        let width, height

        if(iW>oW || iH>oH){
            if(oH/iH > oW/iW){
                width = oW
                height = iH*(oW/iW)
            } else {
                height = oH
                width = iW*(oH/iH)
            }
        }
        else {
            width = iW
            height = iH
        }

        return {width, height}

    }
}