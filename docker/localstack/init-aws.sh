#!/bin/bash

echo "🚀 Creating S3 bucket: zonke-drivers-bucket"
awslocal s3 mb s3://zonke-drivers-bucket || true
