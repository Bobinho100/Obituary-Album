import boto3
import requests
from requests_toolbelt.multipart import decoder
import base64
import os
import time
import hashlib
import json
import random
import string






client = boto3.client('ssm')
dynamob_resource = boto3.resource("dynamodb")
table = dynamob_resource.Table("the-last-show-30112955")

response = client.get_parameters_by_path(
    Path='/the-last-show/',
    Recursive=True,
    WithDecryption=True,
)
response = {key["Name"]: key["Value"] for key in response["Parameters"]}

def get_keys(key_path):
    return response[key_path]

def generate_id():
    # Get current timestamp in milliseconds
    timestamp_ms = int(time.time() * 1000)
    
    # Generate a random 6-character string using uppercase letters and digits
    rand_str = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=6))
    
    # Concatenate timestamp and random string to form the ID
    return f'{timestamp_ms}-{rand_str}'


def handler(event, context):
    """try:
        body = json.loads(event['body'])
        print(body)
    except KeyError:
        body = {}
        
    if "isBase64Encoded" in event and event["isBase64Encoded"]:
        body = base64.b64decode(event['body'])
        print("this mis a body", body)
    else:
         return{
            'statusCode':200,
            "body" : json.dumps({
            "message": "Note added successfully"
            }
            )
        }"""
    if 'body' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Bad Request: Missing body in request.'})
        }
        
    try:
        if "isBase64Encoded" in event and event["isBase64Encoded"]:
            body = base64.b64decode(event['body'])
            print("this is a body", body)
        else:
            body = json.loads(event['body'])
            print(body)
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            "body": json.dumps({
                "message": f"Bad Request: Invalid JSON format in request. {e.msg}"
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            "body": json.dumps({
                "message": f"Internal Server Error: {str(e)}"
            })
        }

     

    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    name = binary_data[1].decode()
    born = binary_data[2].decode()
    died = binary_data[3].decode()

    file_name = os.path.join("/tmp", "obituary.png")
    with open(file_name, "wb") as f:
        f.write(binary_data[0])


    res = upload_to_cloudinary(file_name, resource_type="image")
    #print(res)
    image_url = res
    #print(image_url)
    #print("today is nice")

    Item = {
        "id": generate_id(),
        "image_url": image_url,
        "name": name,
        "born": born,
        "died": died
    }

    table.put_item(Item= Item)

    return {
        'statusCode': 200,
        "body": "Success"
    }
   



def upload_to_cloudinary(filename, resource_type = "image"):
    api_key = str(get_keys("/the-last-show/cloudinary-key"))
    cloud_name = "dmijdquwx"
    api_secret = str(get_keys("/the-last-show/cloudinary-secret"))
    timestamp = int(time.time())

    body = {
        "timestamp": timestamp,
        "api_key": api_key
    }
    files = {
        "file" : open(filename, "rb")
    }
    body["signature"] = create_signature(body, api_secret)
    url = f"http://api.cloudinary.com/v1_1/{cloud_name}/{resource_type}/upload"
    res = requests.post(url, files= files, data=body )
    return res.json()


def create_signature(body, api_secret):
    exclude = ["api_key", "resource_type", "cloud_name"]
    timestamp = int(time.time())
    body["timestamp"] = timestamp
    sorted_body = sort_dictionary(body, exclude)
    query_string = create_query_string(sorted_body)
    query_string_appended = f"{query_string}{api_secret}"
    hashed = hashlib.sha1(query_string_appended.encode())
    signature = hashed.hexdigest()

    return signature


def sort_dictionary(dictionary, exclude):
    return {k:v for k, v in sorted(dictionary.items(), key= lambda item:item[0]) if k not in exclude}

def create_query_string(body):
    query_string = ""

    for idx, (k,v) in enumerate(body.items()):
        query_string = f"{k}={v}" if idx == 0 else f"{query_string}{k}={v}"

    return query_string





