import sys
from interfaces import UserInterfaceMixin #, TasksListMixin


class Menu(UserInterfaceMixin):
    """
    This class represents a 
    commamd line interface
    with imported methods.
    """
    def __init__(self):
        self.global_id = 0
        self.choices = {
            '1': self.create,
            '2': self.delete,
            '3': self.change,
            '4': self.search,
            '5': self.show_tasks,
            '6': self.close_the_task,
            'q': self.quit
        }
        self.tasks_list = [] # a storage of the tasks
    
    def show_tasks(self):
        """
        Allow the user to see
        a list of tasks.
        """
        if self.tasks_list:
            for task in self.tasks_list:
                print(f'Task #{task.id}:\nDate: {task.date}\nTitle: \'{task.title}\'\nDescription: {task.description}\nIs active: {task.is_active}\n\n\n')
    
    def create(self):
        """
        Allow the user to 
        inter the values
        and create a task
        """
        self.global_id += 1
        title = input('Name your task: ')
        description = input('Specify some info: ')
        self.create_task(id=self.global_id, title=title, description=description)

    def delete(self):
        """
        Allow the user to delete
        a particular task.
        """
        id = input('Enter the task id: ')
        if self.delete_task(id):
            print(f'The task #{id} has been deleted.')
        else:
            print('No such task found')

    def change(self):
        """
        Allow the user to change
        the task info.
        """
        id = input('Enter the task id: ')
        title = input('Update title: ')
        description = input('Update info: ')
        if self.change_task(id=id, title=title, description=description):
            print(f'The task #{id} has been changed.')
        else:
            print('No such task found')
            
    def close_the_task(self):
        """
        Alow the user to remove the
        tasks from the active list.
        """
        id = input('Enter the task id: ')
        if self.mark_as_completed(id):
            print(f'The task #{id} has been deactivated')
        else:
            print('No such task found')
        
    def search(self):
        """
        Allow the user to see
        all the tasks that meet
        his seeking requirements.
        """
        pattern = input('Enter a word that is related to the task: ')
        
        result = self.search_task(pattern)
        if not result:
            print('No tasks found')
        else:
            print(result)
            
    def quit(self):
        """
        Stop the program.
        """
        sys.exit()
        
    def show_menu(self):
        print(
            """
                Prompt '1' to create tasks,
                Prompt '2' to delete tasks,
                Prompt '3' to change tasks,
                Prompt '4' to search tasks,
                Prompt '5' to show_tasks,
                Prompt '6' to deactivate tasks
            """
        )
    
    def run(self):
        self.show_menu()
        while True:
            option = input('')
            if option in self.choices.keys():
                action = self.choices[option]
                action()
            else:
                print('No such option found')


if __name__ == '__main__':
    Menu().run()