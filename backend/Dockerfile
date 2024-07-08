# main python image
# on which the server
# will be ran on
FROM python:3.10.12

# setting up the environment variable
ENV DockerHOME=/home/app/webapp

# location of the code in container
WORKDIR $DockerHOME

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 


# install dependencies
RUN pip install --upgrade pip

# copy local reuirements into
# the docker home directory

COPY ./requirements.txt .

# istalling all libraries listed
# the requirements file
RUN pip install -r requirements.txt

COPY . .