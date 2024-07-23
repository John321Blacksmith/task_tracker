export interface ICategory {
    pk: string
    title: string
}


export interface ISimpleTask {
    pk: string
    category: string
    title: string
    description: string
    created_at: Date | string
    due_date: Date | string
    is_completed: boolean,
    priority: string
}

export interface TasksResponse {
    results: ISimpleTask[]
}


export interface SimpleTaskForm {
    category?: string
    title?: string
    description?: string 
    due_date: Date | string
    is_completed?: boolean
    priority: string
}