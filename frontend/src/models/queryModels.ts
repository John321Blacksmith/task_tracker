export interface STasksFilterQuery {
    priority: string
    isCompleted: boolean | string
}

export type SimpleTaskArgs = {
    /** title */
    title?: string;
    /** due_date */
    dueDate?: string;
    /** category */
    category?: string;
    /** priority */
    priority?: "high" | "moderate" | "minor" | string;
    /** is_completed */
    is_completed?: string;
    /** Number of results to return per page. */
    limit?: number;
    /** The initial index from which to return the results. */
    offset?: number;
  };