import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegisterForm.css';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен'),
    password: yup
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .required('Пароль обязателен'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
      .required('Подтверждение пароля обязательно'),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label>Повторите пароль:</label>
        <input type="password" {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
