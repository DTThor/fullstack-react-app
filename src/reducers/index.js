import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //redux form docs are amazing. Explore
import PostsReducer from './reducer_posts';


const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
