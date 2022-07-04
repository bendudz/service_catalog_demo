import {CfnParameter, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CloudFormationProduct, CloudFormationTemplate, Portfolio, ProductStack} from "aws-cdk-lib/aws-servicecatalog";
import {Bucket} from "aws-cdk-lib/aws-s3";


// Trying
export class ScCdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const portfolio = new Portfolio(this, 'myportfolio', {
      displayName: 'Test Portfolio',
      providerName: 'Acme Corp'
    });

    const bucketCFProduct = new CloudFormationProduct(this, 'SCProduct_bucket', {
      productName: 'S3WithParam',
      owner: 'Ben Dudley',
      productVersions: [{
        cloudFormationTemplate: CloudFormationTemplate.fromProductStack(new myS3StackProduct(this, 'S3WithParam')),
        productVersionName: 'v1',
        description: 'Quick S3 Bucket'
      }]
    });

    portfolio.addProduct(bucketCFProduct);

  }
}

interface bucketProps extends StackProps {
  readonly bucketName: string
}

class myS3Stack extends Stack {
  constructor(scope: Construct, id: string, props: bucketProps) {
    super(scope, id, props);
    const bucket = new Bucket(this, 'mybucket', {
      bucketName: props.bucketName
    });
  }
}

class myS3StackProduct extends ProductStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const uploadBucketName = new CfnParameter(this, 'bucketNameParam', {
      type: 'String',
      description: 'Name of S3 Bucket',
    });

    const deployStack = new myS3Stack(this, 's3StackProduct', {
      bucketName: uploadBucketName.valueAsString
    })
  }
}
