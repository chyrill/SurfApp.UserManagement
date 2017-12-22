import userLoginRoutes from './usersLogin/userLogin.routes';

export default app => {
    app.use(function(req,res,next) {
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use('/api/v1/userLogin', userLoginRoutes);
};
