import React, { useCallback, useState, useEffect } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import { useHistory, Link } from 'react-router-dom';

import { FiPower, FiClock } from 'react-icons/fi';

import 'react-day-picker/lib/style.css';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Appointment,
} from './styles';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

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

const Dashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api.get<User>('/profile').then((response) => {
      setSubjects(response.data.subjects);
    });
    console.log('called');
  }, []);

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
        <Schedule>
          <Section>
            {subjects.map((item) => (
              <Appointment key={item.id}>
                <span>{item.classroom}</span>
                <div>
                  <strong>{item.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
