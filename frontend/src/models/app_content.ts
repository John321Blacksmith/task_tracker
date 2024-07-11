export interface SimpleTask {
    pk: string
    category_id: string
    title: string
    description: string
    created_at: Date
    due_date: Date
    is_completed: boolean
}

export interface TasksResponse {
    results: SimpleTask[]
}