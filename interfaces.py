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
        
    def create_task(self, dataset: dict[str, set], **kwargs) -> None:
        """
        Add a new task object.
        """
        task = Task(**kwargs)
        task.category = self.categorize(task.literal_fields, dataset)
        self.tasks_list.append(task)
    
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
    
    def categorize(self, literal_data: list[str], datasets: dict[str, set]) -> str | None:
        """
        Take an object's literal data and a category dataset
        and find the most accurate category.

        Args:
            literal_data (list[str]): All the task fields of the str type
            datasets (dict[str, set]): a hash table with word collections with associated categories

        Returns:
            tuple[str, int]: A pair of category name and the number of common words
        """
        # take each dataset and count the common words, record the
        # pairs of category and common words number
        frequency = {k: len({val for val in literal_data} & v) for k, v in datasets.items()}
        
        # couple the category name and num of common words
        # the list is empty if there are no matches at all
        tups = [(k, v) for k, v in frequency.items() if v > 0]
        
        # go through the list of tuples
        # and find one with the greatest
        # num of common words
        if len(tups) > 0:
            most_possible = tups[0]
            for i in range(len(tups)):
                if tups[i][1] > most_possible[1]:
                    most_possible = tups[i]
            return most_possible[0]
        else:
            return None


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
    def literal_fields(self) -> list[str]:
        """
        Hold the string 
        values of the task.
        """
        complete_list = []
        for l in [val.split(' ') for val in self.__dict__.values() if isinstance(val, str)]:
            for w in l:
                complete_list.append(w)
        return complete_list
    
    @property
    def category(self):
        return self._category
    
    @category.setter
    def category(self, category: str):
        self._category = category if isinstance(category, str) else None
        
    def does_exist(self, pattern: str) -> bool:
        """
        Verify if the task has
        any fields the pattern
        can be in.
        """
        return True if True in [(pattern in val) for val in self.literal_fields] else False