import React from "react";
import { Basic, Combined } from "../shared/styles";
const Home: React.FC = () => (
  <div>
    <Basic>Cool Styles</Basic>
    <Combined>
      With <code>:hover</code>.
    </Combined>
  </div>
);

export default Home;
