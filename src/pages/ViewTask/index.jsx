import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Tasks } from '../../components/Tasks';
import axios from 'axios';

const urlBase = 'https://todone-api.fly.dev';

export function ViewTask() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let userLogged = JSON.parse(sessionStorage.user);

    const savedTasks = axios
      .get(`${urlBase}/tasks/${userLogged.idusers}`, {
        headers: headers,
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return savedTasks;
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskText) {
    let userLogged = JSON.parse(sessionStorage.user);

    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let newTask = axios
      .post(
        `${urlBase}/tasks/`,
        {
          task_text: taskText,
          users_idusers: userLogged.idusers,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setTasksAndSave([...tasks, response.data.task]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function toggleTaskCompletedById(taskId) {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let taskToToggle = tasks.find((task) => {
      return task.idtasks == taskId;
    });

    let indexToToggle = tasks.findIndex((task) => {
      return task.idtasks == taskId;
    });

    taskToToggle.task_done == false
      ? (taskToToggle.task_done = true)
      : (taskToToggle.task_done = false);

    let toggleTask = axios
      .post(
        `${urlBase}/tasks/done`,
        {
          ...taskToToggle,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        tasks[indexToToggle].task_done = taskToToggle.task_done;
        setTasksAndSave([...tasks]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function deleteTaskById(taskId) {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let newTasks = tasks.filter((task) => {
      return task.idtasks != taskId;
    });

    let deletedTask = await axios
      .post(
        `${urlBase}/tasks/delete`,
        {
          idtasks: taskId,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setTasksAndSave(newTasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onComplete={toggleTaskCompletedById}
        onDelete={deleteTaskById}
      />
    </>
  );
}
