import CreateGameTitle from '../components/CreateGameTitle.js';
import CreateGameForm from '../components/CreateGameForm.js';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

const CreateGame = () => {
  return ( 
    <div className="homepage_div container-p" style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ display: 'absolute' }}>
        <Breadcrumbs size='md'>
          <BreadcrumbItem href="/pickgame">Choose Game</BreadcrumbItem>
          <BreadcrumbItem href="/quizGameLibrary">Pick Quizoot</BreadcrumbItem>
          <BreadcrumbItem>Create Game</BreadcrumbItem>
        </Breadcrumbs>
        <CreateGameTitle/>
      </div>
      <div style={{ paddingRight: '60px', paddingTop: '50px' }}>
        <CreateGameForm />
      </div>
    </div>
  );
}

export default CreateGame;