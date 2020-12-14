import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ExamCard,
  Section,
  ExamList,
} from './styles';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import Button from '../../components/Button';

interface Exam {
  id: string;
  title: string;
  grade: number;
}

interface RouteParams {
  idSubject: string;
}

const Subject: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  const { signOut, user } = useAuth();
  const { idSubject } = useParams<RouteParams>();

  useEffect(() => {
    api.get<Exam[]>(`/users/exams/${idSubject}`).then((response) => {
      setExams(response.data);
    });
  }, [idSubject]);

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
        <ExamList>
          <strong>Simulados</strong>
          <Section>
            {exams.length === 0 && (
              <strong>Essa materia nao possui simulados</strong>
            )}
            {exams.map((item) => (
              <ExamCard key={item.id}>
                <span>nota</span>
                <span id="nota">{item.grade}</span>
                <div>
                  <strong>{item.title}</strong>
                  <Button type="button" disabled>
                    Começar
                  </Button>
                </div>
              </ExamCard>
            ))}
          </Section>
        </ExamList>
      </Content>
    </Container>
  );
};

export default Subject;
