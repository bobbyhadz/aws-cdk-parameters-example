# How to use Parameters in AWS CDK - Complete Guide

A repository for an article on
[bobbyhadz.com](https://bobbyhadz.com/blog/aws-cdk-parameters-example)

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create the CDK stack

```bash
npx aws-cdk deploy my-cdk-stack \
  --parameters databasePort=1000 \
  --parameters tableName=cool-table \
  --parameters favoriteRegions="us-east-1,us-east-2,us-east-3"
```

4. Open the AWS CloudFormation Console and the stack should be created in your
   default region

5. Cleanup

```bash
npx aws-cdk destroy
```
