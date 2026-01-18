import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class DemoServerlessStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const defaultLambdaProps = {
            runtime: lambda.Runtime.JAVA_17,
            memorySize: 512,
            timeout: cdk.Duration.seconds(10),
        };

        /* ---------------- DynamoDB ---------------- */
        const table = new dynamodb.Table(this, 'HelloTable', {
            tableName: 'demo-hello-table',
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: 'id',
                type: dynamodb.AttributeType.STRING
            }
        });

        //Just for demo
        table.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

        /* ---------------- Lambda: API ---------------- */
        const apiLambda = new lambda.Function(this, 'HelloApiFunction', {
            ...defaultLambdaProps,
            functionName: 'demo-hello-api',
            handler: 'com.lucas.demoawsserverless.HelloApiHandler::handleRequest',
            code: lambda.Code.fromAsset('../target/demo-aws-serverless-1.0-SNAPSHOT.jar'),
            environment: {
                TABLE_NAME: table.tableName
            }
        });

        table.grantReadWriteData(apiLambda);

        /* ---------------- HTTP API ---------------- */
        const httpApi = new apigwv2.HttpApi(this, 'HelloHttpApi');

        httpApi.addRoutes({
            path: '/hello',
            methods: [apigwv2.HttpMethod.POST],
            integration: new integrations.HttpLambdaIntegration(
                'HelloIntegration',
                apiLambda
            )
        });

        /* ---------------- Lambda: S3 Event ---------------- */
        const s3Lambda = new lambda.Function(this, 'S3EventFunction', {
            ...defaultLambdaProps,
            functionName: 'demo-s3-event',
            handler: 'com.lucas.demoawsserverless.S3EventHandler::handleRequest',
            code: lambda.Code.fromAsset('../target/demo-aws-serverless-1.0-SNAPSHOT.jar')
        });

        /* ---------------- S3 Bucket ---------------- */
        const bucket = new s3.Bucket(this, 'UploadBucket', {
            bucketName: `demo-upload-bucket-${this.account}`,
            removalPolicy: cdk.RemovalPolicy.DESTROY,//Just for Demo
            autoDeleteObjects: true //Just for demo
        });

        bucket.addEventNotification(
            s3.EventType.OBJECT_CREATED,
            new s3n.LambdaDestination(s3Lambda)
        );

        /* ---------------- Outputs ---------------- */
        new cdk.CfnOutput(this, 'ApiUrl', {
            value: `${httpApi.apiEndpoint}/hello`
        });

        new cdk.CfnOutput(this, 'UploadBucketName', {
            value: bucket.bucketName
        });
    }
}
