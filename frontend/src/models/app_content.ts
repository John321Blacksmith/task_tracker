export interface SimpleTask {
    pk: string
    category: string
    title: string
    description: string
    created_at: Date
    due_date: Date | string
    is_completed: boolean
}

export interface TasksResponse {
    results: SimpleTask[]
}


export interface SimpleTaskForm {
    category?: string
    title?: string
    description?: string 
    due_date: Date | string
    is_completed?: boolean 
}