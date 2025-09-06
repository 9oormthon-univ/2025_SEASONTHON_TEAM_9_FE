import styled from "styled-components";
import defaultImg from "@/assets/profile.jpg";

const Bg = styled.div<{ src?: string }>`
  width: 100%;
  height: 400px;
  background: ${({ src }) =>
    src
      ? `url(${src}) center/cover no-repeat`
      : `url(${defaultImg}) center/cover no-repeat`};
`;

export default Bg;
