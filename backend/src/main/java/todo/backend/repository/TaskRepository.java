package todo.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import todo.backend.model.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

}