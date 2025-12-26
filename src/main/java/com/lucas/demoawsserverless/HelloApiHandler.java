package com.lucas.demoawsserverless;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class HelloApiHandler
        implements RequestHandler<Map<String, Object>, Map<String, Object>> {

    private static final DynamoDbClient dynamoDb = DynamoDbClient.create();
    private static final String TABLE_NAME = System.getenv("TABLE_NAME");

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> input, Context context) {
        String body = (String) input.get("body");
        if (body != null && body.contains("\"forceError\"")) {
            context.getLogger().log("Forced error for demo purpose");
            throw new RuntimeException("FORCED_ERROR_DEMO");
        }

        String id = UUID.randomUUID().toString();

        Map<String, AttributeValue> item = new HashMap<>();
        item.put("id", AttributeValue.fromS(id));
        item.put("source", AttributeValue.fromS("API"));
        item.put("payload", AttributeValue.fromS(input.toString()));

        dynamoDb.putItem(PutItemRequest.builder()
                .tableName(TABLE_NAME)
                .item(item)
                .build());

        return Map.of(
                "id", id,
                "status", "SAVED",
                "table", TABLE_NAME
        );
    }
}
