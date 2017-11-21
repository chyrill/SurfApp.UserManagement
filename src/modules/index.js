import userLoginRoutes from './usersLogin/userLogin.routes';

export default app => {
    app.use('/api/v1/userLogin', userLoginRoutes);
};