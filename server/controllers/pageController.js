exports.home = async(req,res) => {
    await res.render('pages/home', {title : "Home", activeNav : "home"})
}