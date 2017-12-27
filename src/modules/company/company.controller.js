import Result from '../../helpers/result';
import CompanyData from './company.model';

export async function create(req,res){

  var response = new Result();

  try{

    var companyValidRes = await CompanyData.find({Name:req.body.Name});

    if (companyValidRes.length>1)
    {
      response.model = req.body;
      response.message = "Company already exist";
      response.successful = false;
      return res.status(400).json(response);
    }

    var result = await CompanyData.create(req.body);

    response.model = result;
    response.message = "Successfully created a company data";
    response.successful = true;

    return res.status(201).json(response);

  }
  catch (e){

    response.message = e.errmsg;
    response.successful = false;
    response.model = req.body;

    return res.status(500).json(response);
  }

}
