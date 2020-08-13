import os
import io
import boto3
import json
import csv

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    data = json.dumps(event)
    print(data)
    #payload = data['features']
    #print(payload)
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='application/json',
                                       Body=data)
    print(response)
    result = json.loads(response['Body'].read().decode())
    print(result)
    pred = int(result['predictions'][0]['predicted_label'])
    predicted_label = 'Future Intubation Likely' if pred == 0 else 'Future Intubation Unlikely'
    
    return result
