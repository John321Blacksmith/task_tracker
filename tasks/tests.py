from django.test import TestCase
from .models import Category, Task

# Create your tests here.


class TestTaskLifeSpan(TestCase):
    """
    Test basic data manipulation.
    """
    @classmethod
    def setUp(cls):
        [Category.objects.create(title=title) for title in ['home', 'готовка', 'study']]
        cls.study_task = Task.objects.create(
            title='Prepare for lessons',
            description='Take the book from the library and give it back today by 19pm',
        )
        cls.home_task = Task.objects.create(
            title='Go for a walk with my pets',
            description='Let my dad know I\'ll go out with our dog'
        )
        cls.cooking_task = Task.objects.create(
            title='Приготовить что нибудь',
            description='Было бы круто пожарить мясца сегодня вечером'
        )
        cls.cat_titles = [cat_title for cat_title in Category.objects.values('title')]
        
    def test_tasks_have_right_category(self):
        self.assertEqual(self.study_task.category.title, 'study')
        self.assertEqual(self.home_task.category.title, 'home')
        self.assertEqual(self.cooking_task.category.title, 'готовка')
        self.assertNotIn('other', self.cat_titles)
    

class TestSerializationProcess(TestCase):
    @classmethod
    def setUp(cls):
        ...