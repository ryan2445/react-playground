const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function notesGet(event, context, callback) {
    const params = {
        TableName: 'system',
        Key: {
            pk: 'ID#ryan',
            sk: 'NOTES'
        }
    }

    const response = await dynamodb.get(params).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(response.Item)
    }
}

async function notesPost(event, context, callback) {
    const body = JSON.parse(event.body)

    const params = {
        TableName: 'system',
        Item: {
            pk: 'ID#ryan',
            sk: 'NOTES',
            notes: body.notes
        }
    }

    await dynamodb.put(params).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify('Item created!')
    }
}

exports.handler = async function (event, context, callback) {
    const method = event.httpMethod

    if (method == 'GET') {
        return await notesGet(event, context, callback)
    }

    if (method == 'POST') {
        return await notesPost(event, context, callback)
    }

    return {
        statusCode: 404,
        body: JSON.stringify('Not Found.')
    }
}
