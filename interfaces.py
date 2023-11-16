import datetime



class TasksListMixin(list):
    """
    This class represents a 
    customized list dedicated
    for the tasks

    """
    ...


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
    
    def get_task(self, id):
        """
        Return a task object
        via id for further usage.
        """
        try:
            for i in range(0, len(self.tasks_list)):
                if self.tasks_list[i].id == int(id):
                    return self.tasks_list[i]
        except IndexError:
            return None
        
    
    def change_task(self, **kwargs) -> None:
        """
        Change the data of the
        existing task object.
        """
        task = self.get_task(kwargs['id'])
        if task:
            task.title = kwargs['title']
            task.description = kwargs['description']
        else:
            return None
        
        
    def delete_task(self, id) -> None:
        """
        Delete the existing task.
        """
        task = self.get_task(id)
        if task:
            self.tasks_list.remove(task)
    
    
    def mark_as_completed(self, id) -> None:
        """
        Find the active task and
        deactivate it.
        """
        task = self.get_task(id)
        if task:
            task.is_active = False if task.is_active else None


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