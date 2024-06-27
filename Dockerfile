# main python image
# on which the server
# will be ran on
FROM python:3.10.12

# setting up the environment variable
ENV DockerHOME=/home/app/webapp

# create a working directory
RUN mkdir -p $DockerHOME

# location of the code in container
WORKDIR $DockerHOME


ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1 

# install dependencies
RUN pip install --upgrade pip

# copy my backend into
# the docker home directory
COPY . $DockerHOME

# istalling all libraries listed
# the requirements file
RUN pip install -r requirements.txt

# define what port the
# server will be ran on
EXPOSE 8000

# launching the server
CMD ["python", "manage.py", "runserver", "8000"]