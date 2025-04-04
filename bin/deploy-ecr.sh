#!/bin/bash

# .envから環境変数を読み込む
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# AWS Account IDが環境変数にない場合はエラー
if [ -z "$AWS_ACCOUNT_ID" ]; then
  echo "Error: AWS_ACCOUNT_ID environment variable is not set"
  exit 1
fi

IMAGE_NAME="nextjs-with-turbo-aws-sample"
AWS_REGION="ap-northeast-1"

docker build --no-cache -t $IMAGE_NAME -f apps/web/Dockerfile .
docker tag $IMAGE_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:latest
