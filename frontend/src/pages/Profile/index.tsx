import React, { useCallback, useRef } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
  FiCalendar,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Content, Container } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { user, updateUser } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          birth: Yup.date().required('Data de nascimento obrigatoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/users', data);

        history.push('/');

        addToast({
          title: 'Perfil atualizado',
          type: 'success',
          description:
            'As informações do seu perfil foram atualizadas com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro ao alterar os dados da sua conta',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            birt: user.birth,
          }}
          onSubmit={handleSubmit}
        >
          <h1>Meu perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" type="text" />
          <Input
            icon={FiCalendar}
            name="birth"
            placeholder="Data de Nascimento"
            type="date"
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
