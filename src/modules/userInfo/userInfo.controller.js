import UserInfo from './userInfo.model';
import Result from '../../helpers/result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import UserLogin from '../usersLogin/userLogin.model';

export async function searchAll(req, res) {
    var result = new SearchResult();

    try {
        var authCode = req.headers.authorization.split(' ')[1];
        var getUserLoginRes = await UserLogin.findOne({ AuthCode: authCode });

        if (getUserLoginRes === null) {
            result.successful = false;
            result.items = 0;
            result.totalcount = 0;
            result.pages = 0;
            result.message = 'Auth Code is invalid';

            return res.status(401).json(result);
        }

        var context = getUserLoginRes.Context;

        var expiryDate = getUserLoginRes.ExpirationDate;

        if (expiryDate < new Date()) {
            result.successful = false;
            result.items = 0;
            result.totalcount = 0;
            result.pages = 0;
            result.message = 'Auth Code is expired';

            return res.status(401).json(result);
        }
        expiryDate = expiryDate.setDate(expiryDate.getMinutes() + 30);
        getUserLoginRes.ExpirationDate = expiryDate;

        await UserLogin.findOneAndUpdate({ _id: getUserLoginRes._id }, getUserLoginRes, { Upsert: true, strict: false });

        var userInfoRes = await UserInfo.find({ Context: context });
        result.successful = true;
        result.items = userInfoRes;
        result.totalcount = userInfoRes.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';

        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        result.successful = false;
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function setContactId(req, res) {
    var result = new Result();
    
    try {
        var userInfoRes = await UserInfo.findOne({ _id: req.body.UserId });
        console.log(req.body)
        userInfoRes.ContactId = req.body.ContactId;
        
        await UserInfo.findOneAndUpdate({ _id: userInfoRes._id }, userInfoRes, { Upsert: true, strict: false });
        
        result.successful = true;
        result.model = userInfoRes;
        result.message = 'Successfully updated record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e)
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}