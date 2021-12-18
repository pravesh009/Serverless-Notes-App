import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});

//us-east-1
//7i9mb0uqg898fb4doot3na98kq

// npx aws-api-gateway-cli-test \
// --username='admin@example.com' \
// --password='Passw0rd!' \
// --user-pool-id='us-east-1_bBEm2C1lP' \
// --app-client-id='7i9mb0uqg898fb4doot3na98kq' \
// --cognito-region='us-east-1' \
// --identity-pool-id='us-east-1:86d6ffa9-d404-457e-904b-5061c627dd79' \
// --invoke-url='https://61y2n2lf1f.execute-api.us-east-1.amazonaws.com' \
// --api-gateway-region='us-east-1' \
// --path-template='/billing' \
// --method='POST' \
// --body='{"source":"tok_visa","storage":21}'
