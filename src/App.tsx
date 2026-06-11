/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro";
import ObrigadoAvivah from "./ObrigadoAvivah";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/obrigado" element={<ObrigadoAvivah />} />
        <Route path="*" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
