from os import getenv
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()
env_path = BASE_DIR/'.env'
load_dotenv(dotenv_path=env_path)


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = getenv("SECRET_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(getenv("DEBUG", default=0))
ALLOWED_HOSTS = getenv("DJANGO_ALLOWED_HOSTS").split(" ")

if getenv("PROD") == "false":
    DATABASES = {
        'default': {
            'ENGINE': "django.db.backends.sqlite3",
            'NAME': BASE_DIR / "db.sqlite3",
            }  
        }

    
    
elif getenv("PROD") == "true":
    DATABASES = {
    'default': {
        'ENGINE': getenv("SQL_ENGINE"),
        'NAME': getenv("SQL_DATABASE"),
        'USER': getenv("SQL_USER", "user"),
        'PASSWORD': getenv("SQL_PASSWORD", "password"),
        'HOST': getenv("SQL_HOST", "localhost"),
        'PORT': getenv("SQL_PORT", "5432")
    }
 
}