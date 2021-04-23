import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 parameter of type Number
    const databasePort = new cdk.CfnParameter(this, 'databasePort', {
      type: 'Number',
      description: 'The database port to open for ingress connections',
      minValue: 1,
      maxValue: 10000,
      default: 5432,
      allowedValues: ['1000', '3000', '5000', '5432'],
    });
    console.log('database port 👉', databasePort.valueAsString);

    // 👇 parameter of type String
    const tableName = new cdk.CfnParameter(this, 'tableName', {
      type: 'String',
      description: 'The name of the Dynamodb table',
    });
    console.log('tableName 👉 ', tableName.valueAsString);

    const myTable = new dynamodb.Table(this, 'my-table', {
      // 👇 set the tableName property to the parameter value
      tableName: tableName.valueAsString,
      partitionKey: {name: 'todoId', type: dynamodb.AttributeType.NUMBER},
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const myFunction = new NodejsFunction(this, id, {
      // setting environment variables from params 👇
      environment: {
        databasePort: databasePort.valueAsString,
        tableName: tableName.valueAsString,
      },
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-function/index.js`),
    });

    // 👇 parameter of type CommaDelimitedList
    const favoriteRegions = new cdk.CfnParameter(this, 'favoriteRegions', {
      type: 'CommaDelimitedList',
      description: 'An array of regions',
    });
    console.log('favoriteRegions 👉 ', favoriteRegions.valueAsList);
  }
}
