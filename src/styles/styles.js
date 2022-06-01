import styled from "styled-components";

export const Screen = styled.div`
  background-color: dark-grey;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const FightContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
`;

export const CharacterContainer = styled.div`
  display: flex;
  width: 100%;
  background-size: cover;
  background-position: center;
  margin-top: 5.5rem;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
`;

export const BossContainer = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: space-around;
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  margin-top: 10rem;
`;

export const FightStartedContainer = styled.div`
  width: 100%;
  color: yellow;
  margin-top: 12rem;
  background-size: cover;
  background-position: center;
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
`;

export const TextTitle = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  text-color: white;
`;

export const FightTitle = styled.p`
  color: #fcba03;
  font-size: 2rem;
  font-weight: 500;
  text-color: white;
`;

export const BossTitle = styled.p`
  color: #e6330b;
  font-size: 2rem;
  font-weight: 500;
  text-color: white;
  align-self: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button1 = styled.button`
  background-color: #FFB533;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

export const Button2 = styled.button`
  background-color: #33FFF9;
  color: black;
  font-size: 20px;
  padding: 10px 50px;
  border-radius: 5px;
  margin: 1rem 0px 0px 1rem;
  cursor: pointer;
`;

export const Button3 = styled.button`
  background-color: #42FF33;
  color: black;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 5px;
  margin: 10px 0px;
  width: 100%;
  cursor: pointer;
`;

export const Button4 = styled.button`
  background-color: orange;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 1rem 0px 0px 1rem;
  cursor: pointer;
`;

export const Button5 = styled.button`
  background-color: #e04428;
  color: black;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 5px;
  margin: 10px 0px;
  width: 100%;
  cursor: pointer;
  display: ${({ disabled }) => (disabled ? disabled : "disabled")};
`;

export const Button6 = styled.button`
  background-color: #9d4ed9;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  margin-left: 1rem;
`;

export const Button7 = styled.button`
  background-color: #e04428;
  color: black;
  font-size: 15px;
  padding: 10px 50px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

export const Button8 = styled.button`
  background-color: orange;
  margin-top: 0.5rem;
  color: black;
  font-size: 15px;
  padding: 10px 50px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

export const Button9 = styled.button`
  background-color: #7532a8;
  color: black;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 5px;
  margin: 10px 0px;
  width: 100%;
  cursor: pointer;
  display: ${({ disabled }) => (disabled ? disabled : "disabled")};
`;

export const TextSubTitle = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export const TextDescription = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const nameTitle = styled.p`
  color: orange;
  font-size: 14px;
  font-weight: 600;
  align-self: center;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;
