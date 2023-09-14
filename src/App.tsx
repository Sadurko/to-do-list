import './App.css';
import ItemList from './components/ItemList';

interface ITask {
  task: string;
  done: boolean;
}


const App = () => {

  let list: ITask[] = [
    { task: 'Pridavanie taskov', done: false },
    { task: 'Odstranenie taskov', done: false},
    { task: 'Dorob to do aplikaciu', done: false}
  ];

  // let emptyList: ITask[] = [];


  return (
    <div className="App">
      <ItemList array={list}/>
    </div>
  );
}

export default App;
