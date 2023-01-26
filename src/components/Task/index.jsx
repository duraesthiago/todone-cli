import styles from './task.module.css';
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export function Task({ task, onComplete, onDelete }) {
  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.idtasks)}
      >
        {task.task_done ? <BsFillCheckCircleFill /> : <div />}
      </button>
      <p className={task.task_done ? styles.textCompleted : ''}>
        {task.task_text}
      </p>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task.idtasks)}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
