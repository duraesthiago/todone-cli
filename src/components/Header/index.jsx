import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useState } from 'react';

export function Header({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask(taskText);
    setTaskText('');
  }

  function onChangeTaskText(event) {
    setTaskText(event.target.value);
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="" />

      <form
        onSubmit={handleSubmit}
        className={styles.newTaskForm}
        action="#"
      >
        <input
          placeholder="Adicione uma tarefa..."
          type="text"
          value={taskText}
          onChange={onChangeTaskText}
        />
        <button>
          <AiFillPlusCircle size={30} />
        </button>
      </form>
    </header>
  );
}
