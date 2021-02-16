import React from 'react';

import { Container, RepositoryInfo} from './style';

import Logo from '../../img/logo-github.svg';

const Repository: React.FC = () => {
  return (
    <>
      <img src={Logo} alt="Logo App" />
      <Container>
        <img src="https://via.placeholder.com/384" alt="avatar"/>
        <RepositoryInfo>
          <h1>Title Repo</h1>
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi! Delegadis gente finis, bibendum egestas augue arcu ut est. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Manduma pindureta quium dia nois paga.
          </p>
        </RepositoryInfo>
      </Container>
    </>
  );
}

export default Repository;