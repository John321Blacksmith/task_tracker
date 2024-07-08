from django.test import TestCase
from .models import Category, Task
from .serializers import TasksListSerializer, TaskCreationSerializer

# Create your tests here.


class FixtureData(TestCase):
    """
    This class delivers its fixture
    to other cases.
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


class TestTaskLifeSpan(FixtureData):
    """
    Test basic data manipulation.
    """
    def test_tasks_have_right_category(self):
        self.assertEqual(self.study_task.category.title, 'study')
        self.assertEqual(self.home_task.category.title, 'home')
        self.assertEqual(self.cooking_task.category.title, 'готовка')
        self.assertNotIn('other', self.cat_titles)
    

class TestSerializationProcess(FixtureData):
    """
    Test either data (de-)searilization.
    """
       
        
    def test_tasks_list_is_represented(self):
        result = [
           {
               'pk': 1,
               'category': 'study',
               'title': 'Prepare for lessons',
               'status': 'active'
           },
           {
               'pk': 2,
               'category': 'home',
               'title': 'Go for a walk with my pets',
               'status': 'active'
           },
           {
               'pk': 3,
               'category': 'готовка',
               'title': 'Приготовить что нибудь',
               'status': 'active'
           }
            
        ]
        tasks_list = Task.objects.all()
        self.assertNotEqual(len(tasks_list), 0)
        serializer = TasksListSerializer(tasks_list, many=True)
        self.assertIn(result[0]['title'], [data['title'] for data in serializer.data])
    
    def test_task_object_is_created(self):
        raw_data = {
            'title': 'clean up the flat',
            'description': 'mom told me to make dinner and order the thing in our room'
        }
        serializer = TaskCreationSerializer(data=raw_data)
        self.assertIs(serializer.is_valid(), True)
        serializer.save()
        task = Task.objects.get(title=raw_data['title'])
        self.assertEqual(task.category.title, 'home')
        
        