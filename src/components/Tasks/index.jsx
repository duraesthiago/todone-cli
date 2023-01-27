import { Task } from '../Task';
import styles from './tasks.module.css';
import { ExitButton } from '../../components/ExitButton';

export function Tasks({ tasks, onComplete, onDelete }) {
  const tasksQuantity = tasks.length;
  const tasksCompleted = tasks.filter(
    (task) => task.task_done
  ).length;

  return (
    <div className={styles.tasks}>
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
      <footer className={styles.footerContainer}>
        <div className={styles.footer}>
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
        </div>
        <ExitButton />
      </footer>
    </div>
  );
}
