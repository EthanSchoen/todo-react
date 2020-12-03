package todo.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import todo.backend.model.Task;
import todo.backend.model.TaskList;
import todo.backend.repository.TaskListRepository;
import todo.backend.repository.TaskRepository;
import todo.backend.service.ITaskListService;
import todo.backend.service.ITaskService;

@RestController
public class BackendController {

  @Autowired
  private ITaskService taskService;

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private ITaskListService listService;

  @Autowired
  private TaskListRepository listRepository;

// GET calls
  // @GetMapping("/")
  // public Task index(){
  //   return new Task((long) 123987, "test", false);
  // }

  @GetMapping("/lists")
  public List<TaskList> taskLists(@RequestParam(name="user") String user) {
    return listService.findAllUser(user);
  }

// POST calls
  // List calls
  @PostMapping(value = "/addList")
  public void addList(@RequestBody TaskList list) {
    listRepository.save(new TaskList(list.getName(), list.getUser()));
  }

  @PostMapping(value = "/removeList")
  public void removeList(@RequestBody TaskList list) {
    listRepository.delete(list);
  }

  @PostMapping(value = "/editList")
  public void editList(@RequestBody TaskList list) {
    Optional<TaskList> target = listRepository.findById(list.getListId());
    target.ifPresent(t -> {
      t.setName(list.getName());
      listRepository.save(t);
    });
  }
  // Task calls
  @PostMapping(value = "/tasks")
  public List<Task> findTasks(@RequestBody TaskList list) {
    return taskService.findAllInList(list);
  }
  @PostMapping(value = "/addTask")
  public void addTask(@RequestBody Task task) {
    taskRepository.save(new Task(task.getTask(), false, task.getList()));
  }
  
  @PostMapping(value = "/removeTask")
  public void removeTask(@RequestBody Task task) {
    taskRepository.delete(task);
  }

  @PostMapping(value = "/editTask")
  public void editTask(@RequestBody Task task) {
    Optional<Task> target = taskRepository.findById(task.getTaskId());
    target.ifPresent(t -> {
      t.setTask(task.getTask());
      taskRepository.save(t);
    });
  }

  @PostMapping(value = "/toggleTask")
  public void toggleTask(@RequestBody Task task) {
    Optional<Task> target = taskRepository.findById(task.getTaskId());
    target.ifPresent(t -> {
      t.setComplete(!t.getComplete());
      taskRepository.save(t);
    });
  }
}
