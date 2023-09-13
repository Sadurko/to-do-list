import './App.css';
import ItemList from './components/ItemList';

interface ITask {
  task: string;
  done: boolean;
}


const App = () => {

  let newList: ITask[] = [
    { task: 'Najdi si pracu', done: false },
    { task: 'Umy riad', done: false},
    { task: 'Dorob to do aplikaciu', done: false}
  ];

  // let emptyList: ITask[] = [];


  return (
    <div className="App">
      <ItemList array={newList}/>
    </div>
  );
}

export default App;
