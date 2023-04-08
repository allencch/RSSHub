module.exports = function (router) {
    router.get('/magazine', require('./magazine'));
    router.get('/blog', require('./blog'));
};
