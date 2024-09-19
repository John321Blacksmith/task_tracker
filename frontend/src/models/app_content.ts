export interface ICategory {
    id: number | string
    title: string
}

export type SimpleTask = {
  id?: number | string;
  title: string
  category: number | string;
  created_at?: string;
  is_completed?: boolean;
  priority: "high" | "moderate" | "minor" | string;
}


export interface SimpleTaskDetails extends SimpleTask {
    due_date: string;
    description: string,
    categories?: ICategory[]
  };


export type SimpleTaskForm = {
    title: string;
    description?: string | number | string[];
    category: number | string;
    due_date: string;
    is_completed?: boolean;
    priority?: "high" | "moderate" | "minor" | string;
  };

export type SimpleTasksResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: SimpleTask[];
};