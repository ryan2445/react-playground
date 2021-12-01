exports.handler =  async function(event, context, callback) {
    const response = {
        statusCode: 200,
        body: JSON.stringify(event)
    }
    
    return response
}