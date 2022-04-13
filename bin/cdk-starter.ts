#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CdkStarterStack} from '../lib/cdk-starter-stack';

const app = new cdk.App();
new CdkStarterStack(app, 'my-cdk-stack', {
  stackName: 'my-cdk-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
