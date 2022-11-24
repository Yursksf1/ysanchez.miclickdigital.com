import Table from './Table';

function Tables(){
  return(
    <div className="row"> 
    <div className="col col-6">
      <Table/>
    </div>
    <div className="col col-6">
      <Table/>
    </div>
  </div>
  )
}

function Game() {
  return (
    <div className="container">
        <div className="row"> 
            <div className="col">
                <div className="position-relative">
                    <div className="position-absolute end-0">
                    </div>
                </div>
            </div>
            <div className="col">
                <button id='myBtn' className="btn btn-info"> Enviar Intento</button>
            </div>
        </div>
        <Tables/>
    </div>
  );
}

export default Game;