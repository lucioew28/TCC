import json
import boto3
import os

import numpy as np
import joblib

# Initialize S3 client
s3 = boto3.client("s3")

# Define S3 bucket and model file name
S3_BUCKET_NAME = "avalia"
MODEL_FILE_NAME = "modelo_random_forest.pkl"

def load_model_from_s3():
    print("Loading model from S3...")
    local_model_path = f"/tmp/{MODEL_FILE_NAME}"

    try:
        # Download the model file from S3
        s3.download_file(S3_BUCKET_NAME, MODEL_FILE_NAME, local_model_path)
        print(f"Model downloaded to {local_model_path}")

        # Load the model using joblib
        model = joblib.load(local_model_path)
        print("Model loaded successfully.")
        return model
    except boto3.exceptions.S3UploadFailedError as e:
        print(f"Failed to download the model from S3: {e}")
        raise Exception("Model download failed.") from e
    except FileNotFoundError as e:
        print(f"Model file not found: {e}")
        raise Exception("Model file not found.") from e
    except Exception as e:
        print(f"Failed to load model: {e}")
        raise Exception("Model loading failed.") from e


# Lambda handler function
def handler(event, context):
    print("----------START----------")
    # Parse the JSON body to get input features
    try:
        body = json.loads(event["body"])
        print(f"body: {body}")
        
        features = [
            body.get("cidade", 0),
            body.get("modalidade_venda", 0),
            body.get("tipo_imovel", 0),
            body.get("area_total", 0.0),
            body.get("area_privativa", 0.0),
            body.get("area_terreno", 0.0),
            body.get("numero_quartos", 0),
            body.get("numero_salas", 0),
            body.get("numero_vagas_garagem", 0)
        ]
    except (KeyError, TypeError) as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Invalid input data", "error": str(e)}),
        }

    # Load the model from S3
    try:
        model = load_model_from_s3()
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to load model", "error": str(e)}),
        }

    # Perform prediction
    try:
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)
        response_body = {"prediction": prediction[0]}
        return {"statusCode": 200, "body": json.dumps(response_body)}
        print("----------END----------")
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Prediction failed", "error": str(e)}),
        }
