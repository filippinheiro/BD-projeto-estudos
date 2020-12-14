import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock, FiPlus } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { Content, Container, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface CreateTaskFormData {
  description: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateTaskFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Digite uma descrição da tarefa'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/tasks', data);

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro nao criar a tarefa',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Nova Tarefa</h1>
            <Input
              icon={FiPlus}
              name="description"
              placeholder="Descricao"
              type="text"
            />
            <Button type="submit">Criar</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
