"use client"; // Adicione isso no topo do arquivo para usar hooks do React

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Nota {
  _id: string;
  titulo: string;
  conteudo: string;
}

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");

  // Busca as notas ao carregar a página
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notas`)
      .then((response) => {
        setNotas(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar notas", err);
      });
  }, []);

  // Publica uma nova nota
  const publicarNota = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/notas`, { titulo, conteudo })
      .then((response) => {
        setNotas([response.data, ...notas]); // Adiciona a nova nota no início da lista
        setTitulo(""); // Limpa o campo de título
        setConteudo(""); // Limpa o campo de conteúdo
      })
      .catch((err) => {
        console.error("Erro ao publicar nota", err);
      });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Minhas Notas</h1>

        {/* Formulário para publicar uma nova nota */}
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Conteúdo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
            rows={4}
          />
          <button
            onClick={publicarNota}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publicar Nota
          </button>
        </div>

        {/* Lista de notas */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notas.map((nota) => (
            <div
              key={nota._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                {nota.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {nota.conteudo.slice(0, 100)}...
              </p>
              <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
