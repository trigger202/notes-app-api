import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";


export async function main(event, context) {

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result) {
            console.log(result);
            return success(result.item);
        }
        else {
            return failure({ status: false, error: "Item not found." });
        }
    }
    catch (error) {
        console.log(error);
        return failure({ status: false });
    }
}