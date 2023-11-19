import datetime
from exceptions import NonActiveTask


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
        tasks = [task for task in self.tasks_list if task.does_exist(pattern)]
        return tasks if len(tasks) != 0 else None
        
    def create_task(self, **kwargs) -> None:
        """
        Add a new task object.
        """
        self.tasks_list.append(Task(**kwargs))
    
    def get_task(self, id):
        """
        Return a task object
        via id for further usage.
        """
        try:
            for i in range(0, len(self.tasks_list)):
                if self.tasks_list[i].id == int(id):
                    return self.tasks_list[i]
        except (IndexError, ValueError):
            return False
        
    
    def change_task(self, **kwargs) -> bool:
        """
        Change the data of the
        existing task object.
        """
        task = self.get_task(kwargs['id']) if not kwargs['task'] else kwargs['task']
        if task:
            task.title = kwargs['title']
            task.description = kwargs['description']
            
            return True
        else:
            return False
        
        
    def delete_task(self, id) -> bool:
        """
        Delete the existing task.
        """
        task = self.get_task(id)
        if task:
            self.tasks_list.remove(task)
            return True
        else:
            return False
    
    
    def mark_as_completed(self, id) -> bool:
        """
        Find the active task and
        deactivate it. The True
        is only returned when 
        the result is successful.
        """
        task = self.get_task(id)
        if task:
            if task.is_active:
                task.is_active = False
            else:
                raise NonActiveTask(task.title, task)
            return True
        else:
            return False


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
        
    @property
    def task_features(self) -> list[str]:
        """
        Hold the values of the
        task fields.
        """
        return [val for val in self.__dict__.values() if isinstance(val, str)]
        
    def does_exist(self, pattern: str) -> bool:
        """
        Verify if the task has
        any fields the pattern
        can be in.
        """
        return True if True in [(pattern in val) for val in self.task_features] else False