package todo.backend.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import todo.backend.model.Task;
import todo.backend.model.TaskList;
import todo.backend.repository.TaskRepository;

@Service
public class TaskService implements ITaskService {

    @Autowired
    private TaskRepository repository;

    @Override
    public List<Task> findAll() {
        return (List<Task>) repository.findAll();
    }

    @Override
    public List<Task> findAllInList(TaskList list) {
        List<Task> tasks = (List<Task>) repository.findAll();
        for( Iterator<Task> it = tasks.iterator(); it.hasNext(); ){
            Task t = it.next();
            if( !t.getList().equals(list) ){
                it.remove();
            }
        }
        return tasks;
    }
}