import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #005b9f;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;

  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  a {
    text-decoration: none;
  }

  svg {
    color: #fff;
    height: 20px;
    width: 20px;

    &::hover {
      color: ${shade(0.2, '#fffe')};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  strong {
    color: #fff;
    font-weight: bold;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;

  display: flex;
`;

export const ExamList = styled.div`
  flex: 1;
  margin-right: 120px;
  strong {
    font-size: 36px;
    font-weight: bold;
  }
  h1 {
    font-size: 36px;
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  height: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  strong {
    font-weight: 400;
    font-size: 24px;
  }
  p {
    color: #999591;
  }
`;

export const ExamCard = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 16px;
  margin-right: 10px;
  border-radius: 10px;
  height: auto;
  background: #005b9f;

  #nota {
    background-color: ${shade(0.2, '#005b9f')};
    width: auto;
    height: 5vh;
    padding: 10px;
    border-radius: 10px;
  }

  span {
    margin-left: 15px;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;
  }

  div {
    flex: 1;
    background: #005b9f;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    margin-left: 24px;

    button {
      flex: 1;

      margin-right: 10px;
      margin-bottom: 10px;
      align-self: center;
      cursor: not-allowed;
    }

    strong {
      flex: 1;
      font-size: 18px;
      margin-right: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
