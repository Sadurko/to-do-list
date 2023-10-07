import { Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import TaskList from './components/TaskList';
import React, { useMemo, useState } from 'react';
import usePageTitle from './hooks/usePageTitle';

interface ITask {
  task: string;
  done: boolean;
}


const App = () => {

  usePageTitle();

  let list: ITask[];

  const [mode, setMode] = useState< 'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  )

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode
      }
    }),
    [mode]
  )


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
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Button onClick={() => colorMode.toggleMode()}>
        Dark mode
      </Button>

      <div className="App">
        <TaskList array={list}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
