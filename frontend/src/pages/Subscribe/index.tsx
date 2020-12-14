import React, { useCallback, useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  SubjectList,
  Section,
  Subject,
} from './styles';

interface Subject {
  teacher: string;
  class: string;
  id: string;
  name: string;
}

const Subscribe: React.FC = () => {
  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const { push } = useHistory();

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    async function loadSubjects(): Promise<void> {
      const response = await api.get<Subject[]>('subjects');

      setSubjects(response.data);
    }

    loadSubjects();
  }, []);

  const handleSubscription = useCallback(
    async (id: string) => {
      try {
        await api.post('/subjects/subscribe', {
          idSubject: id,
        });

        addToast({
          type: 'success',
          title: 'Inscrição confirmada',
        });

        push('/');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Inscrição existente',
          description: 'Você já está inscrito nessa materia',
        });
      }
    },
    [addToast, push],
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
          <Section>
            {subjects.map((item) => (
              <Button
                type="button"
                onClick={() => handleSubscription(item.id)}
                key={item.id}
                style={{
                  textDecoration: 'none',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
              >
                <span>{item.teacher}</span>
                <div>
                  <strong>{item.name}</strong>
                </div>
              </Button>
            ))}
          </Section>
        </SubjectList>
      </Content>
    </Container>
  );
};

export default Subscribe;
