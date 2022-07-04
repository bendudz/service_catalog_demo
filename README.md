# Parameters in Service Catalog

Trying to add CloudFormation Parameters to a Service Catalog portfolio product. This seems to work when passing them to a Construct, but not a Stack. I don't understand why! (Probably missed some docs somewhere)

This contains 2 stacks:
 - ConstructDemoStack: This demonstrates that you can pass a CfnParameter to an AWS CDK Construct when built into a Service Catalog Product
 - StackDemoStack: This demonstrates the error whn trying to pass a CfnParameter to a Stack built into a Product.

I can't seem to execute `cdk synth` for a single stack. It always tries to synthesise bt stacks (shrug). 

Comment out each stack in turn `bin/sc_cdk_demo.ts` & run `cdk synth`.

When synthing the StackDemoStack, an error occurs:
```text
/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-artifact.js:1
"use strict";var _a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.CloudArtifact=void 0;const jsiiDeprecationWarnings=require("../../.warnings.jsii.js"),JSII_RTTI_SYMBOL_1=Symbol.for("jsii.rtti"),cxschema=require("../../cloud-assembly-schema"),metadata_1=require("./metadata");class CloudArtifact{constructor(assembly,id,manifest){this.assembly=assembly,this.id=id;try{jsiiDeprecationWarnings.aws_cdk_lib_cx_api_CloudAssembly(assembly),jsiiDeprecationWarnings.aws_cdk_lib_cloud_assembly_schema_ArtifactManifest(manifest)}catch(error){throw process.env.JSII_DEBUG!=="1"&&error.name==="DeprecationError"&&Error.captureStackTrace(error,CloudArtifact),error}this.manifest=manifest,this.messages=this.renderMessages(),this._dependencyIDs=manifest.dependencies||[]}static fromManifest(assembly,id,artifact){try{jsiiDeprecationWarnings.aws_cdk_lib_cx_api_CloudAssembly(assembly),jsiiDeprecationWarnings.aws_cdk_lib_cloud_assembly_schema_ArtifactManifest(artifact)}catch(error){throw process.env.JSII_DEBUG!=="1"&&error.name==="DeprecationError"&&Error.captureStackTrace(error,this.fromManifest),error}throw new Error("Implementation not overridden yet")}get dependencies(){return this._deps?this._deps:(this._deps=this._dependencyIDs.map(id=>{const dep=this.assembly.tryGetArtifact(id);if(!dep)throw new Error(`Artifact ${this.id} depends on non-existing artifact ${id}`);return dep}),this._deps)}findMetadataByType(type){const result=new Array;for(const path of Object.keys(this.manifest.metadata||{}))for(const entry of(this.manifest.metadata||{})[path])entry.type===type&&result.push({path,...entry});return result}renderMessages(){const messages=new Array;for(const[id,metadata]of Object.entries(this.manifest.metadata||{}))for(const entry of metadata){let level;switch(entry.type){case cxschema.ArtifactMetadataEntryType.WARN:level=metadata_1.SynthesisMessageLevel.WARNING;break;case cxschema.ArtifactMetadataEntryType.ERROR:level=metadata_1.SynthesisMessageLevel.ERROR;break;case cxschema.ArtifactMetadataEntryType.INFO:level=metadata_1.SynthesisMessageLevel.INFO;break;default:continue}messages.push({level,entry,id})}return messages}get hierarchicalId(){return this.manifest.displayName??this.id}}exports.CloudArtifact=CloudArtifact,_a=JSII_RTTI_SYMBOL_1,CloudArtifact[_a]={fqn:"aws-cdk-lib.cx_api.CloudArtifact",version:"2.30.0"};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ^
Error: Artifact StackDemoStackS3WithParams3StackProduct88DBCA37 depends on non-existing artifact StackDemoStackS3WithParamDFB09CA4
    at /Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-artifact.js:1:1310
    at Array.map (<anonymous>)
    at CloudFormationStackArtifact.get dependencies [as dependencies] (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-artifact.js:1:1244)
    at CloudAssembly.validateDeps (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-assembly.js:1:3861)
    at new CloudAssembly (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-assembly.js:1:1219)
    at CloudAssemblyBuilder.buildAssembly (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/cx-api/lib/cloud-assembly.js:1:6098)
    at Object.synthesize (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/core/lib/private/synthesis.js:1:800)
    at App.synth (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/core/lib/stage.js:1:1866)
    at process.<anonymous> (/Users/ben/code/sc_cdk_demo/node_modules/aws-cdk-lib/core/lib/app.js:1:1164)
    at Object.onceWrapper (node:events:642:26)

Subprocess exited with error 1
```

Executed with cdk v2.30.0.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
