import {CfnParameter, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CloudFormationProduct, CloudFormationTemplate, Portfolio, ProductStack} from "aws-cdk-lib/aws-servicecatalog";
import {Bucket} from "aws-cdk-lib/aws-s3";

export class ScConstructDemoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const portfolio = new Portfolio(this, 'myportfolio', {
            displayName: 'Test Portfolio',
            providerName: 'Acme Corp'
        });

        const bucketConstructCFProduct = new CloudFormationProduct(this, 'SCProduct_construct_bucket', {
            productName: 'S3FromConstructWithParam',
            owner: 'Ben Dudley',
            productVersions: [{
                cloudFormationTemplate: CloudFormationTemplate.fromProductStack(new myS3ConstructProduct(this, 'S3FromConstructWithParam')),
                productVersionName: 'v1',
                description: 'Quick S3 Bucket'
            }]
        });

        portfolio.addProduct(bucketConstructCFProduct);

    }
}

class myS3ConstructProduct extends ProductStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const uploadBucketName = new CfnParameter(this, 'bucketNameParam', {
            type: 'String',
            description: 'Name of S3 Bucket',
        });

        const bucket = new Bucket(this, 'construct-bucket', {
            bucketName: uploadBucketName.valueAsString
        });
    }
}
