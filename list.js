import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoDbLib.call("query", params);
        if (result) {
            return success(result.Items);
        }
        else {
            return failure({ status: false, error: "No records found." });
        }
    }
    catch (error) {
        console.log(error);
        return failure({ status: false });
    }

}