package todo.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import todo.backend.model.TaskList;

@Repository
public interface TaskListRepository extends CrudRepository<TaskList, Long> {

}