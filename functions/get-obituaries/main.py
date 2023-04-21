# add your get-obituaries function here

import boto3
import json
from boto3.dynamodb.conditions import Key

dynamodb_resource = boto3.resource("dynamodb")

table = dynamodb_resource.Table("the-last-show-30112955")

def handler(event, context):
    id = event["queryStringParameters"]["id"]
    try:
        res = table.query(KeyConditionExpression = Key("id").eq(id))
        return{
            "statusCode":200,
            "body": json.dumps(res["Items"])
        }
    except Exception as e:
        print(f"exception: {e}")
        return {
            "statusCode":500,
            "body": json.dumps({
            "message": str(e)
            })
            
        }

