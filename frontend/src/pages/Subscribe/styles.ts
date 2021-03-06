import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  align-content: center;
  height: 100vh;
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

  a {
    text-decoration: none;
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

export const SubjectList = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  strong {
    font-size: 36px;
    font-weight: bold;
  }
`;

export const Section = styled.section`
  height: 100%;

  strong {
    font-weight: 400;
    font-size: 24px;
  }

  display: grid;
  font-weight: 400;
  grid-template-columns: 1fr;
`;

export const Subscribe = styled.div`
  background: #005b9f;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  place-content: center;
  height: 100%;
  margin-left: 10px;
  flex: 1;
  margin-top: 10px;

  height: auto;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 10px;

  a {
    flex: 1;
    text-decoration: none;
    color: #fff;
    font-weight: bold;

    margin-top: 30px;

    strong {
      margin-top: 16px;
    }
  }
`;

export const Subject = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 16px;
  margin-right: 10px;
  border-radius: 10px;
  height: 100%;
  background: #005b9f;

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
    align-content: center;
    border-radius: 10px;

    margin-left: 24px;

    strong {
      flex: 1;
      font-size: 18px;
      margin-right: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
