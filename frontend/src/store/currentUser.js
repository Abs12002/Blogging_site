import {createSlice} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';



const userSlice = createSlice({
    name:'auth',
    initialState:{isloggedIn:false},
    reducers:{
        login:(state)=>{
            state.isloggedIn=true;
        },
        logout:(state)=>{
            state.isloggedIn=false;
                        }

    }
})
const nameSlice = createSlice({
    name:'blog',
    initialState:{name:""},
    reducers:{
        idProvider:(state,action)=>{
            const id=action.payload;
            state.name=id;
            }

    }
})



export  const allActions =userSlice.actions;
export  const blogActions =nameSlice.actions;

export   const store =configureStore({
    reducer: {user:userSlice.reducer,
        blog:nameSlice.reducer
    }
}
)

