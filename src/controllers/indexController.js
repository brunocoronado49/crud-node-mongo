const indexController = {}

indexController.renderIndex = (req, res) => {
    res.render('index')
}

indexController.renderAbout = (req, res) => {
    res.render('about')
}

export default indexController
