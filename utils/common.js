exports.createResponse = (data, statusCode = 200, error) => {
    const response = {
        data: data,
        statusCode: statusCode       
    }
    if(error) {
        response.error = error
    }

    return response;
}