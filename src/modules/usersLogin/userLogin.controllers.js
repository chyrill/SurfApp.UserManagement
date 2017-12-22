import UserLogin from './userLogin.model';
import UserInfo from '../userInfo/userInfo.model';
import Result from '../../helpers/result';
import {Mapper} from '../../helpers/mapper';

export async function signUp(req, res) {
    var response = new Result();
    req.body = req.body.body;
    try {

        const usersInfo = await UserInfo.find({ $or: [{ FirstName: req.body.FirstName, LastName: req.body.LastName }, { Email: req.body.Email }] });

        if (usersInfo.length > 0) {
            response.successful = false;
            response.model = req.body;
            response.message = "User is already exist";
            console.log(response);
            return res.status(400).json(response);
        }


        var userInfoData = Mapper(UserInfo.schema.paths,req.body);
        
        userInfoData.DateCreated = new Date();

        const userInfoCreateRes = await UserInfo.create(userInfoData);

        var userLoginData = {
            Email: req.body.Email,
            Password: req.body.Password,
            UserInfo_Id: userInfoCreateRes.id,
            Context: req.Context
        };

        const userLogin = await UserLogin.create(userLoginData);
        response.model = userLogin;
        response.successful = true;
        response.message = "User is Created Successfully";
        return res.status(201).json(response);

    } catch (e) {
        console.log(e);

        if (e.errmsg != null) {
            response.message = e.errmsg;
        } else {
            response.message = e.message;
        }

        response.model = (req.body);
        response.successful = false;
        console.log(response);
        return res.status(500).json(response);
    }
}
