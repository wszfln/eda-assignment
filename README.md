## EDA Assignment - Distributed Systems.

__Name:__ Yingying Lu

__YouTube Demo link__ - https://youtu.be/3FEBoLzf4_s


### Phase 1.

[ List the Lambda functions in this phase's architecture and state their working status.]

+ Confirmation Mailer - Fully implemented.
  + Function is directly subscribed to SNS Topic 
+ Rejection Mailer - Fully implemented.
  + Accepts messages from Dead Letter Queue
  + Sends Email notifying of processing error
+ Process Image - Fully implemented.
  + Only accepts '.jpeg' or '.png' files
  + Rejected messages sent to Dead Letter Queue
  + Writes uploaded image name to DynamoDB table as object primary key

### Phase 2 (if relevant).

[ List the Lambda functions in this phase's architecture and state their working status.]

+ Confirmation Mailer - Fully implemented.
+ Rejection Mailer - Fully implemented.
+ Process Image - Fully implemented.
+ Update Table - Fully implemented.
  + Updates DynamoDB entry for ImageName with Description defined in message.json
  + Filter on Topic 2 - Only trigger the lambda function (delete image) to delete related items in the table
+ Delete Image - Fully implemented
  + Deletes DynamoDB entry for corresponding deleted S3 object
  + Filter on Topic 2 - Only trigger the lambda function (update table) to update related items in the table

### Phase 3 (if relevant).

[ List the Lambda functions in this phase's architecture and state their working status.]

+ Confirmation Mailer - Fully implemented.
+ Process Image - Fully implemented.
  + Image Process Queue now directly subscribed to one singular Topic
+ Delete Image - Fully implemented
  + Subscribed to singular Topic - Only trigger the lambda function (delete image) to delete related items in the table
+ Update Table - Fully implemented.
  + Subscribed to singular Topic - Only trigger the lambda function (update table) to update related items in the table
+ Delete Mailer - Not implemented.