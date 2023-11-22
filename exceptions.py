class NonActiveTask(Exception):
    def __init__(self, message, task=None):
        super().__init__(message)
        self.message = message
        self.task = task
    