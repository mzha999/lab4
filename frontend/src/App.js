
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import { AppBar, makeStyles, Tab, Tabs, Toolbar, Typography, CssBaseline, Container } from '@material-ui/core';
import LoadingPage from './pages/LoadingPage';
import Footer from './components/Footer';
import TodoPage from './pages/TodoPage';
import NewTodoPage from './pages/NewTodoPage';
import dayjs from 'dayjs';
import EditTodo from './components/EditTodo';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    alignItem: 'space-btween',
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    marginRight: theme.spacing(3)
  },
  main: {
    marginTop: theme.spacing(3)
  }
}));


const navbarTabs = [
  { title: 'Todos', path: '/todos' },
  { title: 'Add-Todos', path: '/newTodo' }
];


function useTabIndex() {
  const { pathname } = useLocation();
  for (let i = 0; i < navbarTabs.length; i++) {
    if (pathname.startsWith(navbarTabs[i].path))
      return i;
  }
  return 0;
}

function App() {
  const {todoLoading} = useContext(AppContext);
  const classes = useStyles();
  const tabIndex = useTabIndex();
  //console.log(todos)
  
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">

          <Typography variant="h6" className={classes.title}>
            TodoApp
          </Typography>

          <Tabs value={tabIndex} aria-label="main navigation tabs">
            {navbarTabs.map((tab, index) => (
              <Tab key={index} label={tab.title} component={Link} to={tab.path} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={classes.main}>

        <Toolbar variant="dense" />

        {todoLoading ? (
          <LoadingPage title="Loading todos..." />
        ) : (

          <Switch>
            <Route path="/todos">
              <TodoPage />
            </Route>
            <Route path="/newTodo">
              <NewTodoPage />
            </Route>
            <Route path="/editTodo">
                <EditTodo />        
             </Route>       
            <Route path="*">
              <Redirect to="/todos" />
            </Route>
          </Switch>

        )}
      </Container>

      <Footer title="TodoApp" description={`Meeting all your blogging needs since ${dayjs().get('year')}`} />
    </div>
  );
}

export default App;