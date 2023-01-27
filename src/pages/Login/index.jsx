import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const navigate = useNavigate();

  // Initial Definitions
  const urlBase = 'https://todone-api.fly.dev/auth/login';
  const headers = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
  const intialValues = { email: '', password: '' };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    let responseLogin = axios
      .post(
        urlBase,
        {
          email: formValues.email,
          password: formValues.password,
        },
        headers
      )
      .then(function (response) {
        switch (response.status) {
          case 200:
            // Get token
            let responseContent = response.data;

            // Save token (sessionStorage)
            sessionStorage.setItem('token', responseContent.token);
            sessionStorage.setItem(
              'user',
              JSON.stringify(responseContent.userLogged)
            );
            navigate('/task');
            break;

          default:
            alert(`Erro inesperado: ${response.status}`);
            break;
        }
      })
      .catch(function (error) {
        let err = error.response.data.err;
        switch (error.response.status) {
          case 409:
            setResponseErrors({ msg: err });
            break;

          default:
            setResponseErrors({ msg: 'Erro inesperado' });
            break;
        }
      });
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Digite um e-mail válido';
    } else if (!regex.test(values.email)) {
      errors.email = 'Formato inválido';
    }

    if (!values.password) {
      errors.password = 'Senha não preenchida';
    } else if (values.password.length < 4) {
      errors.password = 'Senha deve ter mais de 4 caracteres';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className={styles.login}>
      <img className={styles.img} src={logo} alt="" />
      <h1 className={styles.formInput}>
        Faça login para continuar...
      </h1>
      {Object.keys(responseErrors).length !== 0 && (
        <span>{responseErrors.msg}</span>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.formLogin}
      >
        <div className={styles.formInput}>
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o seu email..."
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>

        <div className={styles.formInput}>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a sua senha..."
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <span>{formErrors.password}</span>}
        </div>
        <div className={styles.formInput}>
          <button type="submit">Entrar</button>
        </div>
      </form>
      <div className={styles.formInput}>
        <h3>Não possui um usuário?</h3>
        <Link to="/createUser">Registre-se aqui!</Link>
      </div>
    </div>
  );
}
