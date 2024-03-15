import { app, InvocationContext } from "@azure/functions";
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

export async function TopicManager(message: unknown, context: InvocationContext): Promise<void> {

context.warn('Service bus topic function processed message:', message);

const hub = "createAccount";
let service = new WebPubSubServiceClient(process.env.WebPubSubConnectionString, hub);

// by default it uses `application/json`, specify contentType as `text/plain` if you want plain-text
let x = service.sendToAll(message, { contentType: "text/plain" });
context.warn('Topic Processed, published to front:', x);

}

app.serviceBusTopic('TopicManager', {
    connection: 'ficohsapubsubpoc_SERVICEBUS',
    topicName: 'create-account',
    subscriptionName: 'create-topic-listen',
    handler: TopicManager
});

 