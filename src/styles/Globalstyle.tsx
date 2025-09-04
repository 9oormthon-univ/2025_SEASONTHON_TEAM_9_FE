import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
html, body, #root {
  width: 100%;
  height:100%;
  margin: 0;
  padding: 0;
}
   /* Firefox */
  * {
    scrollbar-width: none;          /* FF */
    -ms-overflow-style: none;       /* IE/old Edge */
  }
  /* Chrome, Safari, Opera, Edge(Chromium) */
  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

export default Globalstyle