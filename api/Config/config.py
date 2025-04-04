from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MODEL_NAME = os.environ.get('MODEL_NAME')
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

settings = Settings() 