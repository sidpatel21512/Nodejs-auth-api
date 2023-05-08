export const renderRegister = (req, res) => {
    res.render('register.ejs', {
        name: 'User'
    });
};

export const renderLogin = (req, res) => {
    res.render('login.ejs');
}

export const renderProfile = (req, res) => {
    res.render('profile.ejs', {
        username: req.user.username
    })
}

export const redirectToProfile = (req, res) => {
    res.redirect('/profile');
}
