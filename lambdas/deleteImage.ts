import { SNSHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDDbDocClient();

export const handler: SNSHandler = async (event: any) => {
    console.log("Event ", event);
  for (const record of event.Records) {    
    console.log("Record ", record)
    const snsMessage = JSON.parse(record.Sns.Message);

    if (snsMessage.Records) {
      console.log("message body ", JSON.stringify(snsMessage));
      for (const messageRecord of snsMessage.Records) {

        const eventType: string = messageRecord.eventName
        console.log("event type ", eventType)
        if (eventType.includes('ObjectRemoved')) {                                
          console.log("delete event recieved")                                    
          const s3e = messageRecord.s3;                                          

          const srcKey = decodeURIComponent(s3e.object.key.replace(/\+/g, " "));
          console.log('srcKey ', JSON.stringify(srcKey))

          console.log("deleting from dynamoDB")

          const commandOutput = await ddbDocClient.send(
            new DeleteCommand({
              TableName: process.env.TABLE_NAME,
              Key: {
                "ImageName": srcKey
              }
            })
          )
          console.log("DynamoDB response: ", commandOutput)
        }else{
          console.log("non-delete event recieved, ignoring...")
        } 
    }
    }
}
}

function createDDbDocClient() {
    const ddbClient = new DynamoDBClient({ region: process.env.REGION });
    const marshallOptions = {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    };
    const unmarshallOptions = {
      wrapNumbers: false,
    };
    const translateConfig = { marshallOptions, unmarshallOptions };
    return DynamoDBDocumentClient.from(ddbClient, translateConfig);
  }