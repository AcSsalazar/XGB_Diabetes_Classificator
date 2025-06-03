from django.core.management.base import BaseCommand
import os
import boto3
from pathlib import Path

class Command(BaseCommand):
    help = 'Descarga los modelos desde S3 a backend/models/'

    def handle(self, *args, **kwargs):
        bucket = os.getenv("AWS_STORAGE_BUCKET_NAME", "diabetes-models")
        region = os.getenv("AWS_REGION", "us-east-1")

        s3 = boto3.client("s3", region_name=region)
        model_dir = Path(__file__).resolve().parent.parent.parent / "models"
        model_dir.mkdir(parents=True, exist_ok=True)

        archivos = [
            "xgb_scale_pos_weight.pkl",
            "xgb_smote_gridsearch.pkl",
            "Model03.pkl",
            "RFC.pkl",
        ]

        for file in archivos:
            dest_path = model_dir / file
            try:
                s3.download_file(bucket, file, str(dest_path))
                self.stdout.write(self.style.SUCCESS(f"✔ {file} descargado en {dest_path}"))
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"❌ Error descargando {file}: {e}"))
