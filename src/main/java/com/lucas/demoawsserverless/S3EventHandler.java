package com.lucas.demoawsserverless;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;

public class S3EventHandler
        implements RequestHandler<S3Event, Void> {

    @Override
    public Void handleRequest(S3Event event, Context context) {

        event.getRecords().forEach(record -> {
            String bucket = record.getS3().getBucket().getName();
            String key = record.getS3().getObject().getKey();
            Long size = record.getS3().getObject().getSizeAsLong();

            context.getLogger().log(
                    "New file uploaded - bucket: " + bucket +
                    ", key: " + key +
                    ", size: " + size
            );
        });

        return null;
    }
}
