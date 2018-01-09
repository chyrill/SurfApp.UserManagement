import UserLogin from './userLogin.model';
import UserInfo from '../userInfo/userInfo.model';
import Result from '../../helpers/result';
import { Mapper } from '../../helpers/mapper';
import Uuid from 'uuid-lib';
import { compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import CompanyData from '../company/company.model';


export async function signUp(req, res) {
    var response = new Result();
    try {

        const usersInfo = await UserInfo.find({ $or: [{ FirstName: req.body.FirstName, LastName: req.body.LastName, Context: req.body.Context }, { Email: req.body.Email, Context: req.body.Context }] });

        if (usersInfo.length > 0) {
            response.successful = false;
            response.model = req.body;
            response.message = "User is already exist";
            return res.status(400).json(response);
        }


        var userInfoData = Mapper(UserInfo.schema.paths, req.body);

        userInfoData.DateCreated = new Date();

        const userInfoCreateRes = await UserInfo.create(userInfoData);

        var userLoginData = {
            Email: req.body.Email,
            Password: req.body.Password,
            UserInfo_Id: userInfoCreateRes.id,
            Context: req.body.Context,
            AuthCode: Uuid.create(),
            AccessLevel: req.body.AccessLevel,
            ExpirationDate: new Date().getTime() + 30 * 60000
        };

        const userLogin = await UserLogin.create(userLoginData);
        const user = {
            Name: userInfoCreateRes.LastName + " " + userInfoCreateRes.FirstName,
            UserId: userInfoCreateRes._id,
            ProfilePicture: userInfoCreateRes.ProfilePicture,
            AuthCode: userLogin.AuthCode,
            AccessLevel: userLogin.AccessLevel,
            Others: userInfoCreateRes.Others
        };

        const companyInfo = await CompanyData.findOne({ _id: req.body.Context });
        const token = jwt.sign({ user }, companyInfo.Secretkey);

        response.model = { Token: token };
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

export async function authorize(req, res) {
    var response = new Result();

    try {

        var userLoginRes = await UserLogin.findOne({ AuthCode: req.body.Authorization });

        if (userLoginRes === null) {
            response.model = req.body;
            response.message = "AuthCode is not valid";
            response.successful = false;

            return res.status(401).json(response);
        }
        console.log(new Date());

        if (userLoginRes.ExpirationDate < new Date()) {
            response.model = req.body;
            response.message = "AuthCode is expired";
            response.successful = false;

            return res.status(401).json(response);
        }
        var userRes = await UserInfo.findOne({ Email: userLoginRes.Email, Context: userLoginRes.Context });
        console.log(userLoginRes)
        userLoginRes.ExpirationDate = new Date().getTime() + 30 * 60000;

        await UserLogin.findOneAndUpdate({ _id: userLoginRes._id }, userLoginRes, { upsert: true, strict: false });

        var user = {
            Name: userRes.LastName + ", " + userRes.FirstName,
            Context: userLoginRes.Context
        };

        response.model = user;
        response.message = "AuthCode verified";
        response.successful = true;

        return res.status(200).json(response);
    } catch (e) {
        response.model = req.body;
        response.message = e;
        response.successful = false;

        return res.status(500).json(response);
    }
}

export async function logIn(req, res) {
    var response = new Result();

    try {
        const userdata = await UserLogin.findOne({ Email: req.body.Email, Context: req.body.Context });

        if (userdata === null) {
            response.model = req.body;
            reponse.message = "Email or Password is incorrect";
            reponse.successful = false;
            return res.status(401).json(response);
        }

        var ifTrue = compareSync(req.body.Password, userdata.Password);

        if (!ifTrue) {
            response.model = req.body;
            reponse.message = "Email or Password is incorrect";
            reponse.successful = false;
            return res.status(401).json(response);
        }

        userdata.AuthCode = Uuid.create();
        userdata.ExpirationDate = new Date().getTime() + 30 * 60000;

        console.log(userdata);

        await UserLogin.findOneAndUpdate({ _id: userdata._id }, userdata, { upsert: true, strict: false });

        var userInfoRes = await UserInfo.findOne({ Email: userdata.Email, Context: req.body.Context });

        const user = {
            Name: userInfoRes.LastName + ", " + userInfoRes.FirstName,
            UserId: userInfoRes._id,
            ProfileImage: userInfoRes.ProfileImage,
            Others: userInfoRes.Others,
            AccessLevel: userdata.AccessLevel,
            AuthCode: userdata.AuthCode
        };

        const companyres = await CompanyData.findOne({ _id: req.body.Context });

        var token = jwt.sign({ user }, companyres.Secretkey);

        response.model = { Token: token };
        response.message = "Successfully Log in";
        response.successful = true;

        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        response.model = req.body;
        response.message = e.errmsg || 'Email or Password is incorrect';
        response.successful = false;

        return res.status(500).json(response);
    }
}