exports.createResponse = (data, code = 200, error) => {
    const response = {
        data: data,
        code: code,
        now: new Date()       
    }
    if(error) {
        response.error = error
    }

    return response;
}