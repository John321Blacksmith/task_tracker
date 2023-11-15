import datetime



class TasksListMixin(list):
    """
    This class represents a 
    customized list dedicated
    for the tasks

    """
    
    def append(self, task):
        self.global_id += 1
        task.id = self.global_id
        
        super().append(task)


class UserInterfaceMixin:
    """
    This class represents a
    user-side interface with
    all the involved functionality.
    """
    
    def search_task(self, pattern) -> list:
        """
        Perform the search over
        the existing tasks via
        either id or string pattern.

        :return: bool
        """
        return [task for task in self.tasks_list if task.does_exist(pattern)]
        
    def create_task(self, **kwargs) -> None:
        """
        Add a new task object.
        """
        self.tasks_list.append(Task(**kwargs))
    
    def change_task(self, **kwargs) -> None:
        """
        Change the data of the
        existing task object.
        """
        task = [task for task in self.tasks_list if task.id == int(kwargs['id'])]
        if task[0]:
            task[0].title = kwargs['title']
            task[0].description = kwargs['description']
        else:
            return None
        
        
    def delete_task(self, id) -> None:
        """
        Delete the existing task.
        """
        task = [task for task in self.tasks_list if task.id == int(id)]
        if task[0]:
            self.tasks_list.remove(task[0])
    
    
    def mark_as_completed(self, id) -> None:
        """
        Find the active task and
        deactivate it.
        """
        task = [task for task in self.tasks_list if task.id == int(id)]
        if task[0]:
            task[0].is_active = False if task[0].is_active else None


class Task:
    """
    This class represents a 
    Task object with the
    neccessary data fields.
    """
    def __init__(self, id, title, description):
        self.id = id
        self.title = title
        self.description = description
        self.date = datetime.date.today()
        self.is_active = False | True
        
    def does_exist(self, pattern) -> bool:
        """
        Verify if the task has
        any fields the pattern
        can be in.
        Args:
            pattern (_str_): the a piece of string that
                             should be consisted in the
                             object data 

        Returns:
            bool: True if pattern is in object data, else - False
        """
        return True if pattern in self.title else False