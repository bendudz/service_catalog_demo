#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ScCdkDemoStack } from '../lib/sc_cdk_demo-stack';
import {ScConstructDemoStack} from "../lib/sc_product_from_construct";

const app = new cdk.App();
new ScConstructDemoStack(app, 'ConstructDemoStack', {});
new ScCdkDemoStack(app, 'StackDemoStack', {});
