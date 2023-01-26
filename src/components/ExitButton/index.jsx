import styles from './exit.module.css';
import { SlLogout } from 'react-icons/sl';

export function ExitButton() {
  function handleSubmit() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <div className={styles.buttonContainer}>
      <form onSubmit={handleSubmit} action="/">
        <button className={styles.exitButton}>
          <SlLogout size={30} />
        </button>
      </form>
    </div>
  );
}
