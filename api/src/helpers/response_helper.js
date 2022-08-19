class Response {

    static success(res, data={}, action = '', message='Success') {

        let code = 200;

        if(action == 'create')
        {
            code = 201;
        }

        if(data == null)
        {
            data = {};
        }

        return res.status(code).json({
            status: 'Success',
            message: message,
            data: data
        });
    };
    
    static error(res, message='Error', code=400, action = '', data={}) {
        let err_code = code;
        let status= 'Error';

        if (code == 404){
            status = 'Not Found';
        }

        return res.status(err_code).json({
            status: status,
            message: message,
            data:data,
        });
    };
}  

module.exports = Response;