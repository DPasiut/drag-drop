namespace App {
    //Project State Managment
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instanace: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instanace) {
        return this.instanace;
      }
      this.instanace = new ProjectState();
      return this.instanace;
    }

    addListener(listenerFn: Listener<Project>) {
      this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.ACTIVE
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}