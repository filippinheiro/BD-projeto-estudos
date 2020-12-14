import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { FiPlus, FiPower } from 'react-icons/fi';

import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  SubjectList,
  Section,
  Subject,
  Subscribe,
  TaskList,
} from './styles';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

interface Subject {
  name: string;
  teacher: string;
  observations: string;
  classroom: string;
  id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  birth: Date;
  subjects: Subject[];
}

interface Task {
  id: string;
  description: string;
  complete: boolean;
}

const Dashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [checked, setChecked] = React.useState<string[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const { signOut, user } = useAuth();

  useEffect(() => {
    async function load(): Promise<void> {
      api.get<User>('/users/profile').then((response) => {
        setSubjects(response.data?.subjects);
      });
    }

    load();
  }, []);

  useEffect(() => {
    async function load(): Promise<void> {
      api.get<Task[]>('/users/tasks').then((response) => {
        setTasks(response.data);
      });
    }

    load();
  }, []);

  const handleToggle = useCallback(
    (value: string) => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    },
    [checked],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo(a), </span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <SubjectList>
          <strong>Matérias</strong>
          <Section>
            {subjects?.length === 0 && (
              <strong>Você ainda não se inscreveu em nenhuma matéria</strong>
            )}
            {subjects.map((item) => (
              <Link
                to={{
                  pathname: `/subject/${item.id}`,
                }}
                key={item.id}
                style={{
                  textDecoration: 'none',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
              >
                <Subject>
                  <span>{item.classroom}</span>
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                </Subject>
              </Link>
            ))}

            <Subscribe>
              <div>
                <Link to="/subscribe">
                  <strong>Inscreva-se</strong>
                </Link>
              </div>
            </Subscribe>
          </Section>
        </SubjectList>

        <TaskList>
          <strong>Tarefas</strong>
          <Link to="/create">
            <FiPlus size={20} />
          </Link>
          {tasks.map((item) => (
            <ListItem key={item.id}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item.id) !== -1}
                  onClick={() => {
                    handleToggle(item.id);
                  }}
                />
              </ListItemIcon>
              <ListItemText id={item.id} primary={item.description} />
            </ListItem>
          ))}
        </TaskList>
      </Content>
    </Container>
  );
};

export default Dashboard;
