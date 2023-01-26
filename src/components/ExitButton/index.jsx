import styles from './exit.module.css';
import { AiOutlineLogout } from 'react-icons/ai';

export function ExitButton() {
  function handleSubmit() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <div className={styles.buttonContainer}>
      <form onSubmit={handleSubmit} action="/">
        <button className={styles.exitButton}>
          <AiOutlineLogout size={30} />
        </button>
      </form>
    </div>
  );
}
