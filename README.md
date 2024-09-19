Simple application which allows a worker or a whole team
to track incoming tasks.

# Setup
1) Clone the repository:
```
git clone https://github.com/John321Blacksmith/task_tracker/tree/review-branch
```
2) Go to the server and install all the neccessary dependencies:
```
python -m venv .venv
.venv\Scripts\activate
pip nstall -r requirements.txt
```
3) Apply the migrations:
```
python manage.py migrate
```

4) Activate the server:
```
cd ./backend && python manage.py 
```
5) Open up a new **cmd** window and enter the frontent server:
```
cd ./frontend
```
6) Install all the node modules:
```
npm install
```
7) Launch up the frontend server