import unittest
from interfaces import Task, UserInterfaceMixin
from dataset import categories


class TestMenu(unittest.TestCase):
    def setUp(cls):
        cls.user_interface = UserInterfaceMixin()
        cls.task = Task(id=1, title='go to gym', description='do some pull-up exercises')
        cls.task1 = Task(id=2, title='finish the project', description='help the collegues finish the project the boss assigned')
        cls.task2 = Task(id=3, title='make dinner for my family', description='cook something tasty')
        
        cls.task.category = cls.user_interface.categorize(cls.task.literal_fields, categories)
        cls.task1.category = cls.user_interface.categorize(cls.task1.literal_fields, categories)
        cls.task2.category = cls.user_interface.categorize(cls.task2.literal_fields, categories)
    
    
    def test_tasks_have_right_category(self):
        category_names = ['sport', 'work', 'cooking']
        tasks = [self.task, self.task1, self.task2]
        for i in range(len(tasks)):
            self.assertEqual(tasks[i].category, category_names[i])