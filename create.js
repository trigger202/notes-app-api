import uuid from 'uuid';
import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
    console.log('event', event.body);
    let data = event.body;
    try {
        data = JSON.parse(event.body);
    } catch (e) {
        console.log("not json ", event.body);
    }

    console.log("after parsing body ", data);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };
    console.log("about to create a resource");
    console.log("resouce data", params);
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    }
    catch (error) {
        console.log(error);
        return failure({ status: false });
    }


}