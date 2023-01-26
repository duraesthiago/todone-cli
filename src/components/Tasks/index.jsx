import { Task } from '../Task';
import styles from './tasks.module.css';

export function Tasks({ tasks, onComplete, onDelete }) {
  const tasksQuantity = tasks.length;
  const tasksCompleted = tasks.filter(
    (task) => task.task_done
  ).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{tasksQuantity}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completas</p>
          <span>
            {tasksCompleted} of {tasksQuantity}
          </span>
        </div>
      </header>
      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.idtasks}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
