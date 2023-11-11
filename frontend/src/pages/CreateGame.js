import CreateGameTitle from '../components/CreateGameTitle.js';
import CreateGameForm from '../components/CreateGameForm.js';

const CreateGame = () => {
  return ( 
    <div className="homepage_div container-p" style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ display: 'absolute' }}>
        <CreateGameTitle/>
      </div>
      <div style={{ paddingRight: '60px', paddingTop: '0px' }}>
        <CreateGameForm />
      </div>
    </div>
  );
}

export default CreateGame;