Simple application which allows a worker or a whole team
to track incoming tasks.

# Setup
1) Clone the repository:
```
git clone https://github.com/John321Blacksmith/task_tracker.git
```
2) Go to the server and install all the neccessary dependencies:
```
python -m venv .venv
.venv\Scripts\activate
pip nstall -r requirements.txt
```
3) In the backend folder, create te **.env** file
and specify secret variables like that:
```
SECRET_KEY='django proguct key'
DEBUG='1'
DJANGO_ALLOWED_HOSTS='127.0.0.1 localhost'
PROD='false'
```
4) Apply the migrations:
```
python manage.py migrate
```

5) Activate the server:
```
cd ./backend && python manage.py 
```
6) Open up a new **cmd** window and enter the frontent server:
```
cd ./frontend
```
7) Install all the node modules:
```
npm install
```
7) Launch up the frontend server