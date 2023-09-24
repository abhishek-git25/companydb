module.exports.setFlash = function (req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}


  //  module.exports.checkSessionTimeout = function (req, res, next) {

  //   console.log(req.session , "13");
  //     const sessionExpiration = req.session.sessionExpiration;
  //     console.log(req.cookie , "13");
     
  //     if (!sessionExpiration || sessionExpiration < Date.now()) {
  //       req.session.destroy((err) => {
  //         console.error('Error destroying the session', err);
  //       });
  //       res.redirect('/signIn');
  //     } else {
  //       next();
  //     }
  //   }
  