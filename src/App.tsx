import './App.css';
import ItemList from './components/ItemList';

interface ITask {
  task: string;
  done: boolean;
}


const App = () => {

  let list: ITask[];


  /*
  let list: ITask[] = [
    { task: 'Pridavanie taskov', done: false },
    { task: 'Odstranenie taskov', done: false},
    { task: 'Dorob to do aplikaciu', done: false}
  ];
  */

  // localStorage.setItem('list', JSON.stringify(list));

  if (localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list') || '{}');
  }



  return (
    <div className="App">
      <ItemList array={list}/>
    </div>
  );
}

export default App;
