export default class MiscUtils {

    static getViewportWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }

    static getViewportHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }

    static getPictureViewportSize(imageWidth, imageHeight) {

        if (!imageWidth && !imageHeight) {
            imageWidth = 604
            imageHeight = 453
        }

        let viewportHeight = this.getViewportHeight() - 65
        let viewportWidth = this.getViewportWidth() - 50
        let width, height

        if (imageWidth > viewportWidth || imageHeight > viewportHeight) {
            if (viewportHeight / imageHeight > viewportWidth / imageWidth) {
                width = viewportWidth
                height = imageHeight * (viewportWidth / imageWidth)
            } else {
                height = viewportHeight
                width = imageWidth * (viewportHeight / imageHeight)
            }
        } else {
            width = imageWidth
            height = imageHeight
        }

        return {width, height}
    }

    static getDocumentHeight() {
        const {body, documentElement} = document
        return Math.max(
            Math.max(body.scrollHeight, documentElement.scrollHeight),
            Math.max(body.offsetHeight, documentElement.offsetHeight),
            Math.max(body.clientHeight, documentElement.clientHeight)
        )
    }
}