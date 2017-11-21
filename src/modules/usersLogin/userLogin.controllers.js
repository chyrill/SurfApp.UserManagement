import UserLogin from './userLogin.model';
import UserInfo from '../userInfo/userInfo.model';
import Result from '../../helpers/result';

export async function signUp(req, res) {
    var response = new Result();
    try {

        const usersInfo = await UserInfo.find({ $or: [{ FirstName: req.body.FirstName, LastName: req.body.LastName }, { Email: req.body.Email }] });

        if (usersInfo.length > 0) {
            response.successful = false;
            response.model = req.body;
            response.message = "User is already exist";
            return res.status(400).json(response);
        }


        var userInfoData = {
            LastName: req.body.LastName,
            FirstName: req.body.FirstName,
            MiddleName: req.body.MiddleName,
            Address1: req.body.Address1,
            Address2: req.body.Address2,
            City: req.body.City,
            State: req.body.State,
            Country: req.body.Country,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            DateCreated: new Date()
        };

        const userInfoCreateRes = await UserInfo.create(userInfoData);

        var userLoginData = {
            Email: req.body.Email,
            Password: req.body.Password,
            UserInfo_Id: userInfoCreateRes.id,
            Context: "dsadsadsadasdsa"
        };

        const userLogin = await UserLogin.create(userLoginData);
        response.model = userLogin;
        response.successful = true;
        response.message = "User is Created Successfully";
        return res.status(201).json(response);
    } catch (e) {
        console.log(e);
        response.model = (req.body);
        response.successful = false;
        response.message = e.errmsg;
        return res.status(500).json(response);
    }
}