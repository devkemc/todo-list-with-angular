import { Component, DoCheck } from "@angular/core";
import { TaskList } from "../../model/task-list";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> =
    JSON.parse(localStorage.getItem("list") || '');

  constructor() {}
  ngDoCheck() {
    this.setLocalStorage()
  }

  public deleteItemTaskList(index: number) {
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList() {
    this.taskList = [];
  }

  public addItemTaskList(taskAdd: string) {
    this.taskList.push({ task: taskAdd, checked: false });
  }

  public validationInput(task: string, index: number) {
    if (!task.length) {
      const confirm = window.confirm("Task vazia, deseja Deletar?");
      if (confirm) this.deleteItemTaskList(index);
    }
  }
  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
