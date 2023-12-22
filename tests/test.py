import unittest
from interfaces import Task, UserInterfaceMixin


categories = {
    'sport': {'run', 'water', 'go', 'exercise', 'rest', 'muscle', 'gym'},
    'home': {'clean', 'family', 'care', 'cook', 'room', 'flat', 'home', 'house', 'children', 'child', 'son', 'daughter'},
    'work': {'collegues', 'weekday' 'work', 'boss', 'director', 'office', 'hour', 'tommorow', 'yesterday', 'deadline', 'finish'},
    'cooking': {'water', 'cook', 'dinner', 'breakfast', 'lunch', 'meal', 'tasty', 'family', 'kitchen'},
    'study': {'project', 'learn', 'library', 'information', 'by', 'heart'}
}


class TestMenu(unittest.TestCase):
    def setUp(cls):
        cls.user_interface = UserInterfaceMixin()
        cls.task = Task(id=1, title='go to gym', description='do some pull-up exercises')
        cls.task1 = Task(id=2, title='finish the project', description='help the collegues finish the project the boss assigned')
        cls.task2 = Task(id=3, title='make dinner for my family', description='cook something tasty')
        
        cls.task.category = cls.user_interface.categorize(cls.task.literal_fields, categories)
        cls.task1.category = cls.user_interface.categorize(cls.task1.literal_fields, categories)
        cls.task2.category = cls.user_interface.categorize(cls.task2.literal_fields, categories)
    
    def test_tasks_have_right_literal_fields(self):
        self.assertEqual(self.task.title.split(' ') + self.task.description.split(' ') + [self.task.category], self.task.literal_fields)
        self.assertEqual(self.task1.title.split(' ') + self.task1.description.split(' ') + [self.task1.category], self.task1.literal_fields)
        self.assertEqual(self.task2.title.split(' ') + self.task2.description.split(' ') + [self.task2.category], self.task2.literal_fields)
    
    def test_tasks_have_right_category(self):
        category_names = ['sport', 'work', 'cooking']
        tasks = [self.task, self.task1, self.task2]
        for i in range(len(tasks)):
            self.assertEqual(tasks[i].category, category_names[i])