const mwf = {
    // Middleware 1
    checkUserRole (req, res, next)  {
    if (isAuthenticated(req.session)) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        return res.redirect('/user-pref');
      }
    }
  },
  
  // Middleware 2
    checkLoginAccess(req, res, next) {
      let postProcess = false;
    if (isAuthenticated(req.session)) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        return res.redirect('/user-pref');
      } //else return res.redirect('/login');
    }
    else{
      console.log("inside Login MW else part", req.body);
        if(Object.keys(req.body).length > 0) {
            req.method = "POST";
            next();
        }
        else {
          console.log("inside Login MW else else part");
          req.method = 'GET';
          next();
        }
    }
  },
  
  // Middleware 3
    checkRegisterAccess(req, res, next)  {
    if (isAuthenticated(req.session)) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        return res.redirect('/user-pref');
      }
    }
      else {  
        if(Object.keys(req.body).length > 0){
          console.log("Inside MWF register");
          req.method = "POST";
      }
      else req.method = 'GET';
      next();
    }
  },

  // Middleware #
  checkUserRole(req, res, next) {
    if(isAuthenticated(req.session)) {
      if (req.session.user.accountType === "guest") {
        return res.render('components/guestHomepage');
      } else if (req.session.user.accountType === "host") {
        return res.render('/components/hostHomepage')
      }
    }
    else {
      if(Object.keys(req.body).length > 0){
        req.method = "POST";
      }
      else req.method = 'GET';
      next();
    }
  },
  
  // // Middleware 4
    checkProtectedRoute (req, res, next)  {
    if (isAuthenticated(req.session)) {
     
      next();
    }
    else{
    res.redirect('/login');
  }
  },
  
  // Middleware 5
    checkAdminRoute (req, res, next) {
    if (isAuthenticated(req.session)) {
      if (req.session.user.role === 'admin') {
        req.method = "GET"
        next(); 
      }
       else {
        res.status(403).render('error', {
          message: 'You do not have permission to view this page'
        });
     }
    }
    else res.redirect('/login');
  },
  
  // Middleware 6
    checkLogoutAccess (req, res, next)  {
    if (isAuthenticated(req.session)) {
      return next();
    }
    res.redirect('/login');
  },
  
  // Middleware 7
    loggingMiddleware (req, res, next)  {
      const timestamp = new Date().toUTCString();
      const method = req.method;
      const route = req.originalUrl;
      const isAuth = isAuthenticated(req.session);
      console.log(`[${timestamp}]: ${method} ${route} (${isAuth ? 'Authenticated' : 'Non-Authenticated User'})`);
      next();
   },
  }

function isAuthenticated (data) {
    if(data.user)
        return true;
    else 
    return false;
  }

export default mwf;
