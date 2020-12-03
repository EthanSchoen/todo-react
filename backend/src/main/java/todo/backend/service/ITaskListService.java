package todo.backend.service;

import java.util.List;

import todo.backend.model.TaskList;


public interface ITaskListService {
    List<TaskList> findAll();
    List<TaskList> findAllUser(String usr);
    // TaskList validateUserAndGetList(String listId);
}