import { tasksApi as api } from "./api_init";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    projectsList: build.query<ProjectsListApiResponse, ProjectsListApiArg>({
      query: (queryArg) => ({
        url: `/projects/`,
        params: {
          created_at: queryArg.createdAt,
          limit: queryArg.limit,
          offset: queryArg.offset,
        },
      }),
    }),
    projectsCreate: build.mutation<
      ProjectsCreateApiResponse,
      ProjectsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/`,
        method: "POST",
        body: queryArg.project,
      }),
    }),
    projectsRead: build.query<ProjectsReadApiResponse, ProjectsReadApiArg>({
      query: (queryArg) => ({ url: `/projects/${queryArg.id}/` }),
    }),
    projectsUpdate: build.mutation<
      ProjectsUpdateApiResponse,
      ProjectsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.project,
      }),
    }),
    projectsPartialUpdate: build.mutation<
      ProjectsPartialUpdateApiResponse,
      ProjectsPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.project,
      }),
    }),
    projectsDelete: build.mutation<
      ProjectsDeleteApiResponse,
      ProjectsDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.id}/`,
        method: "DELETE",
      }),
    }), 
    getSimpleTasks: build.query<
      SimpleTasksResponse,
      SimpleTaskArgs
    >({
      query: (queryArg) => ({
        url: `/tasks/simple-tasks/`,
        params: {
          title: queryArg.title,
          due_date: queryArg.dueDate,
          category: queryArg.category,
          priority: queryArg.priority,
          is_completed: queryArg.isCompleted,
          limit: queryArg.limit,
          offset: queryArg.offset,
        },
      }),
    }),
    postSimpleTasks: build.mutation<
      PostSimpleTasksApiResponse,
      PostSimpleTasksApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/simple-tasks/`,
        method: "POST",
        body: queryArg.simpleTaskFormData,
      }),
    }),
    getSimpleTasksById: build.query<
      GetSimpleTasksByIdApiResponse,
      GetSimpleTasksByIdApiArg
    >({
      query: (queryArg) => ({ url: `/tasks/simple-tasks/${queryArg.id}/` }),
    }),
    putSimpleTasksById: build.mutation<
      PutSimpleTasksByIdApiResponse,
      PutSimpleTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/simple-tasks/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.simpleTasksList,
      }),
    }),
    patchSimpleTasksById: build.mutation<
      PatchSimpleTasksByIdApiResponse,
      PatchSimpleTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/simple-tasks/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.simpleTasksList,
      }),
    }),
    deleteSimpleTasksById: build.mutation<
      DeleteSimpleTasksByIdApiResponse,
      DeleteSimpleTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/simple-tasks/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    getSprintTasks: build.query<
      GetSprintTasksApiResponse,
      GetSprintTasksApiArg
    >({
      query: (queryArg) => ({
        url: `/sprint-tasks/`,
        params: {
          title: queryArg.title,
          description: queryArg.description,
          created_at: queryArg.createdAt,
          priority: queryArg.priority,
          is_completed: queryArg.isCompleted,
          limit: queryArg.limit,
          offset: queryArg.offset,
        },
      }),
    }),
    postSprintTasks: build.mutation<
      PostSprintTasksApiResponse,
      PostSprintTasksApiArg
    >({
      query: (queryArg) => ({
        url: `/sprint-tasks/`,
        method: "POST",
        body: queryArg.sprintTask,
      }),
    }),
    getSprintTasksById: build.query<
      GetSprintTasksByIdApiResponse,
      GetSprintTasksByIdApiArg
    >({
      query: (queryArg) => ({ url: `/sprint-tasks/${queryArg.id}/` }),
    }),
    putSprintTasksById: build.mutation<
      PutSprintTasksByIdApiResponse,
      PutSprintTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/sprint-tasks/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.sprintTask,
      }),
    }),
    patchSprintTasksById: build.mutation<
      PatchSprintTasksByIdApiResponse,
      PatchSprintTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/sprint-tasks/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.sprintTask,
      }),
    }),
    deleteSprintTasksById: build.mutation<
      DeleteSprintTasksByIdApiResponse,
      DeleteSprintTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/sprint-tasks/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    sprintsList: build.query<SprintsListApiResponse, SprintsListApiArg>({
      query: (queryArg) => ({
        url: `/sprints/`,
        params: {
          started_at: queryArg.startedAt,
          ends_at: queryArg.endsAt,
          limit: queryArg.limit,
          offset: queryArg.offset,
        },
      }),
    }),
    sprintsCreate: build.mutation<
      SprintsCreateApiResponse,
      SprintsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/sprints/`,
        method: "POST",
        body: queryArg.sprint,
      }),
    }),
    sprintsRead: build.query<SprintsReadApiResponse, SprintsReadApiArg>({
      query: (queryArg) => ({ url: `/sprints/${queryArg.id}/` }),
    }),
    sprintsUpdate: build.mutation<
      SprintsUpdateApiResponse,
      SprintsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/sprints/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.sprint,
      }),
    }),
    sprintsPartialUpdate: build.mutation<
      SprintsPartialUpdateApiResponse,
      SprintsPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/sprints/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.sprint,
      }),
    }),
    sprintsDelete: build.mutation<
      SprintsDeleteApiResponse,
      SprintsDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/sprints/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as appApi };
export type ProjectsListApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ProjectRead[];
};
export type ProjectsListApiArg = {
  /** created_at */
  createdAt?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
};
export type ProjectsCreateApiResponse = /** status 201  */ ProjectRead;
export type ProjectsCreateApiArg = {
  project: Project;
};
export type ProjectsReadApiResponse = /** status 200  */ ProjectRead;
export type ProjectsReadApiArg = {
  /** A unique integer value identifying this Project. */
  id: number;
}; 
export type ProjectsUpdateApiResponse = /** status 200  */ ProjectRead;
export type ProjectsUpdateApiArg = {
  /** A unique integer value identifying this Project. */
  id: number;
  project: Project;
};
export type ProjectsPartialUpdateApiResponse = /** status 200  */ ProjectRead;
export type ProjectsPartialUpdateApiArg = {
  /** A unique integer value identifying this Project. */
  id: number;
  project: Project;
};
export type ProjectsDeleteApiResponse = unknown;
export type ProjectsDeleteApiArg = {
  /** A unique integer value identifying this Project. */
  id: number;
};
export type SimpleTasksResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: sTasksDataset;
};

export type sTasksDataset = {
  tasks:  SimpleTask[];
  categories: {pk: number | string , title: string}[];
};

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
  isCompleted?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
};
export type PostSimpleTasksApiResponse = /** status 201  */ SimpleTask;
export type PostSimpleTasksApiArg = {
  simpleTaskFormData: SimpleTaskForm;
};
export type GetSimpleTasksByIdApiResponse =
  /** status 200  */ SimpleTask;
export type GetSimpleTasksByIdApiArg = {
  /** A unique integer value identifying this Simple Tasks. */
  id: number;
};
export type PutSimpleTasksByIdApiResponse =
  /** status 200  */ SimpleTask;
export type PutSimpleTasksByIdApiArg = {
  /** A unique integer value identifying this Simple Tasks. */
  id: number;
  simpleTasksList: SimpleTaskForm;
};
export type PatchSimpleTasksByIdApiResponse =
  /** status 200  */ SimpleTask;
export type PatchSimpleTasksByIdApiArg = {
  /** A unique integer value identifying this Simple Tasks. */
  id: number;
  simpleTasksList: SimpleTaskForm;
};
export type DeleteSimpleTasksByIdApiResponse = unknown;
export type DeleteSimpleTasksByIdApiArg = {
  /** A unique integer value identifying this Simple Tasks. */
  id: number;
};
export type GetSprintTasksApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: SprintTaskRead[];
};
export type GetSprintTasksApiArg = {
  /** title */
  title?: string;
  /** description */
  description?: string;
  /** created_at */
  createdAt?: string;
  /** priority */
  priority?: "high" | "moderate" | "minor";
  /** is_completed */
  isCompleted?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
};
export type PostSprintTasksApiResponse = /** status 201  */ SprintTaskRead;
export type PostSprintTasksApiArg = {
  sprintTask: SprintTask;
};
export type GetSprintTasksByIdApiResponse = /** status 200  */ SprintTaskRead;
export type GetSprintTasksByIdApiArg = {
  /** A unique integer value identifying this Sprint Task. */
  id: number;
};
export type PutSprintTasksByIdApiResponse = /** status 200  */ SprintTaskRead;
export type PutSprintTasksByIdApiArg = {
  /** A unique integer value identifying this Sprint Task. */
  id: number;
  sprintTask: SprintTask;
};
export type PatchSprintTasksByIdApiResponse = /** status 200  */ SprintTaskRead;
export type PatchSprintTasksByIdApiArg = {
  /** A unique integer value identifying this Sprint Task. */
  id: number;
  sprintTask: SprintTask;
};
export type DeleteSprintTasksByIdApiResponse = unknown;
export type DeleteSprintTasksByIdApiArg = {
  /** A unique integer value identifying this Sprint Task. */
  id: number;
};
export type SprintsListApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: SprintRead[];
};
export type SprintsListApiArg = {
  /** started_at */
  startedAt?: string;
  /** ends_at */
  endsAt?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
};
export type SprintsCreateApiResponse = /** status 201  */ SprintRead;
export type SprintsCreateApiArg = {
  sprint: Sprint;
};
export type SprintsReadApiResponse = /** status 200  */ SprintRead;
export type SprintsReadApiArg = {
  /** A unique integer value identifying this Sprint. */
  id: number;
};
export type SprintsUpdateApiResponse = /** status 200  */ SprintRead;
export type SprintsUpdateApiArg = {
  /** A unique integer value identifying this Sprint. */
  id: number;
  sprint: Sprint;
};
export type SprintsPartialUpdateApiResponse = /** status 200  */ SprintRead;
export type SprintsPartialUpdateApiArg = {
  /** A unique integer value identifying this Sprint. */
  id: number;
  sprint: Sprint;
};
export type SprintsDeleteApiResponse = unknown;
export type SprintsDeleteApiArg = {
  /** A unique integer value identifying this Sprint. */
  id: number;
};
export type Project = {
  title: string;
};
export type ProjectRead = {
  id?: number;
  title: string;
  created_at?: string;
};
export type SimpleTaskForm = {
  title: string;
  description?: string | number | string[];
  category: number | string;
  due_date: string;
  is_completed?: boolean;
  priority: "high" | "moderate" | "minor" | string;
};
export type SimpleTask = {
  id?: number;
  title: string;
  description?: string | number | string[] | undefined;
  category: {pk: number, title: string};
  created_at?: string;
  due_date: string;
  is_completed?: boolean;
  priority: "high" | "moderate" | "minor";
};
export type SprintTask = {
  title: string;
  description?: string | null;
  is_completed?: boolean;
  priority: "high" | "moderate" | "minor";
  sprint: number;
};
export type SprintTaskRead = {
  id?: number;
  title: string;
  description?: string | null;
  created_at?: string;
  is_completed?: boolean;
  priority: "high" | "moderate" | "minor";
  sprint: number;
};
export type Sprint = {
  started_at: string;
  ends_at: string;
  project: number;
};
export type SprintRead = {
  id?: number;
  started_at: string;
  ends_at: string;
  project: number;
};
export const {
  useProjectsListQuery,
  useLazyProjectsListQuery,
  useProjectsCreateMutation,
  useProjectsReadQuery,
  useLazyProjectsReadQuery,
  useProjectsUpdateMutation,
  useProjectsPartialUpdateMutation,
  useProjectsDeleteMutation,
  useGetSimpleTasksQuery,
  useLazyGetSimpleTasksQuery,
  usePostSimpleTasksMutation,
  useGetSimpleTasksByIdQuery,
  useLazyGetSimpleTasksByIdQuery,
  usePutSimpleTasksByIdMutation,
  usePatchSimpleTasksByIdMutation,
  useDeleteSimpleTasksByIdMutation,
  useGetSprintTasksQuery,
  useLazyGetSprintTasksQuery,
  usePostSprintTasksMutation,
  useGetSprintTasksByIdQuery,
  useLazyGetSprintTasksByIdQuery,
  usePutSprintTasksByIdMutation,
  usePatchSprintTasksByIdMutation,
  useDeleteSprintTasksByIdMutation,
  useSprintsListQuery,
  useLazySprintsListQuery,
  useSprintsCreateMutation,
  useSprintsReadQuery,
  useLazySprintsReadQuery,
  useSprintsUpdateMutation,
  useSprintsPartialUpdateMutation,
  useSprintsDeleteMutation,
} = injectedRtkApi;
