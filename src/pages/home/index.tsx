import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import Logo from '../../img/logo-github.svg';

import { Title, Form, Repositories, Error } from './style';

import { toast } from 'react-toastify';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Home: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInputError('');

    if(!newRepo) {
      setInputError('Digite o nome do repositório');
      toast.error('Este campo está vazio');
      return;
    }
    
    try {
    const response = await api.get(`repos/${newRepo}`);
    const repository = response.data;
    const repositoryFound = repositories.find(repo => repo.full_name === repository.full_name);
    console.log(repositoryFound);
    if(!repositoryFound) {
      setRepositories([...repositories, repository]);
      toast.success('Diretório adicionado com sucesso!!!');
    } else {
      throw inputError;
    }

    setNewRepo('');

    } catch(err) {
      setNewRepo('');
      toast.error('Ops... Algo deu errado :(');
    }
  }

  return (
    <>
      <img src={Logo} alt="Logo App" />
      <Title>Encontre repositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository} hasError={!!inputError} >
        <input 
          type="text" 
          name="" 
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => {setNewRepo(e.target.value)}}
        />
        <button type="submit">
          Pesquisar
        </button>
      </Form>
      { inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to="/repo">
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.owner.login}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={40} />
          </Link>
        ))}
      </Repositories>
    </>
  );
}

export default Home;