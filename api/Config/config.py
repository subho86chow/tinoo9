from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MODEL_NAME_1 = os.environ.get('MODEL_NAME_1')
    MODEL_NAME_2 = os.environ.get('MODEL_NAME_2')
    MODEL_NAME_3 = os.environ.get('MODEL_NAME_3')
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

settings = Settings() 