import sys
from interfaces import UserInterfaceMixin
from exceptions import NonActiveTask


categories = {
    'sport': {'run', 'water', 'go', 'exercise', 'rest', 'muscle', 'gym'},
    'home': {'clean', 'family', 'care', 'cook', 'room', 'flat', 'home', 'house', 'children', 'child', 'son', 'daughter'},
    'work': {'collegues', 'weekday' 'work', 'boss', 'director', 'office', 'hour', 'tommorow', 'yesterday', 'deadline', 'finish'},
    'cooking': {'water', 'cook', 'dinner', 'breakfast', 'lunch', 'meal', 'tasty', 'family', 'kitchen'},
    'study': {'project', 'learn', 'library', 'information', 'by', 'heart'}
}


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
            '5': self.show_all_tasks,
            '6': self.close_the_task,
            '7': self.split_by_cats,
            'q': self.quit
        }
        self.tasks_list = [] # a storage of the tasks(Still for the program runtime)
    
    def show_all_tasks(self):
        """
        Allow the user to see
        a list of all tasks.
        """
        if self.tasks_list:
            for task in self.tasks_list:
                print(self.get_task_label(task))
                
    def get_task_label(self, task):
        """
        Form an ordinary card for
        a task.
        """
        return f"""Task #{task.id}:\n
                        Date: {task.date}\n
                        Title: \'{task.title}\'\n
                        Description: {task.description}\n
                        Is active: {task.is_active}\n
                        Category: {task.category}\n\n\n
                        """
    
    def split_by_cats(self):
        """
        Show the tasks related
        to a particular category.
        """
        if len(self.tasks_list) > 0:
            cats = [task.category for task in self.tasks_list]
            for cat in cats:
                category_tasks = [task for task in self.tasks_list if task.category == cat]
                print(f'###{cat.upper()}###')
                for i in range(len(category_tasks)):
                    print(self.get_task_label(category_tasks[i]))
    
    def create(self):
        """
        Allow the user to 
        inter the values
        and create a task
        """
        self.global_id += 1
        title = input('Name your task: ')
        description = input('Specify some info: ')
        self.create_task(categories, id=self.global_id, title=title, description=description)

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
        task = self.get_task(id)
        if task:
            title = input('Update title: ')
            description = input('Update info: ')
            if self.change_task(task=task, title=title, description=description):
                print(f'The task #{id} has been changed.')
            else:
                print('Cannot change the task.')
        else:
            print('No such task found')
                
    def close_the_task(self):
        """
        Alow the user to remove the
        tasks from the active list.
        """
        id = input('Enter the task id: ')
        try:
            if self.mark_as_completed(id):
                print(f'The task #{id} has been deactivated')
            else:
                print('No such task found')
        except NonActiveTask as ex:
            print(f'The task #{ex.task.id} has already been closed.')
        
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
                Prompt '5' to show all tasks,
                Prompt '6' to deactivate tasks,
                Prompt '7' to show tasks of a category
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