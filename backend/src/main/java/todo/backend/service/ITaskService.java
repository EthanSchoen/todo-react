package todo.backend.service;

import java.util.List;

import todo.backend.model.Task;
import todo.backend.model.TaskList;

public interface ITaskService {
    List<Task> findAll();
    List<Task> findAllInList(TaskList list);
}