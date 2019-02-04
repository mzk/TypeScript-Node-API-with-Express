import * as express from 'express';

export const register = (app: express.Application) => {
    const oidc = app.locals.oidc;

    // define a route handler for the default home page
    app.get('/', (req: any, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render('index', {isAuthenticated: req.isAuthenticated(), user});
    });

    // define a secure route handler for the login page that redirects to /guitars
    app.get('/login', oidc.ensureAuthenticated(), (req, res) => {
        res.redirect('/guitars');
    });

    // define a route to handle logout
    app.get('/logout', (req: any, res) => {
        req.logout();
        res.redirect('/');
    });

    // define a secure route handler for the guitars page
    app.get('/guitars', oidc.ensureAuthenticated(), (req: any, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render('guitars', {isAuthenticated: req.isAuthenticated(), user});
    });
};
