import * as cdk from 'aws-cdk-lib';
import { DemoServerlessStack } from './DemoServerlessStack';

const app = new cdk.App();

new DemoServerlessStack(app, 'DemoAwsServerlessStack');
