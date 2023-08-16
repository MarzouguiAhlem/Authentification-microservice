import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';



function createData(i, x, y, w, h,graphTypeId,data,gateway_id,user_id,dataToVisualize,date) {
 
      const itemData = {
        labels: data.map((item)=> {return item.date}),
        datasets: [
          {
            fill:true,
            label:  data[0].date + " ( "+data[0].sensor_name+" )",
            data: data.map((item)=> {return item.value}),
            borderColor: ['rgba(30, 129, 176, 0.7)'],
            backgroundColor: ['rgba(30, 129, 176, 0.7)'],
            pointBackgroundColor: 'rgba(30, 129, 176, 0.7)',
            pointBorderColor: 'rgba(30, 129, 176, 0.7)'
          }
         
        ]
      }
    return {
        i,
        x,
        y,
        w,
        h,
        graphTypeId,
        data:itemData,
        gateway_id,
        user_id,
        dataToVisualize,
        date,
    };
}

   
 

export const getChartsLayout = createAsyncThunk(
    "chartsLayout/getChartsLayout",
    async (userGatewayIds,thunkAPI) => {
      
        try {
            const resp = await axios.get(`http://localhost:5000/chartsLayout/getChartsLayout/${userGatewayIds.userId}/${userGatewayIds.gatewayId}`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });

            return resp.data.map(chartsLayout => createData(chartsLayout.i, chartsLayout.x, chartsLayout.y, chartsLayout.w, chartsLayout.h,chartsLayout.graphTypeId ,chartsLayout.data,chartsLayout.gateway_id,chartsLayout.user_id,chartsLayout.dataToVisualize,chartsLayout.date))
        } catch (error) {
            console.log(error)
        }
    })
    export const getAvailableDates = createAsyncThunk(
        "chartsLayout/getAvailableDates",
        async (dataToVisualize,thunkAPI) => {
            
            try {
                const resp = await axios.get(`http://localhost:5000/chartsLayout/getAvailableDates/${dataToVisualize}`, {
                    // headers: { 
                    //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    //     'Access-Control-Allow-Credentials' : 'true',
                    //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                    //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                    //   },
                });
    
                return resp.data
            } catch (error) {
                console.log(error)
            }
        })
export const addChartsLayout = createAsyncThunk(
    "chartsLayout/addChartsLayout",
    async (layouts, thunkAPI) => {

        try {

            const resp = await axios.post(`http://localhost:5000/chartsLayout/addChartsLayout`, layouts, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });
            
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteChartsLayout = createAsyncThunk(
    "chartsLayout/deleteChartsLayout",
    async ( userGatewayIds,thunkAPI) => {
    
        try {

            const resp = await axios.delete(`http://localhost:5000/chartsLayout/deleteChartsLayout/${userGatewayIds.userId}/${userGatewayIds.gatewayId}`, {
                // headers: { 
                //     'Access-Control-Allow-Origin' : 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials' : 'true',
                //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                //     'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                //   },
            });
            return resp.data

        } catch (error) {
            console.log(error)
        }
    })

const chartsLayoutSlice = createSlice({
    name: "chartsLayout",
    initialState: {
        chartsLayout: [],
        loading:true,
        gateway:{},
        // availableDates: [],
        // temp : [],
        // hum : [],
        // soilM : [],
    },
    reducers: {
        setGateway: (state, action) => {

            state.gateway = action.payload

        }
        
    },
    extraReducers: {
        [getChartsLayout.pending]: (state, action) => {
          

        },
        [getChartsLayout.fulfilled]: (state, action) => {
            state.chartsLayout = action.payload;
            state.loading = false
        
        },
        [getChartsLayout.rejected]: (state, action) => {

        },
        [addChartsLayout.pending]: (state, action) => {
           

        },
        [addChartsLayout.fulfilled]: (state, action) => {
            
            
                state.chartsLayout=action.payload
        },
        [addChartsLayout.rejected]: (state, action) => {
     
        },
        [deleteChartsLayout.pending]: (state, action) => {

        },
        [deleteChartsLayout.fulfilled]: (state, action) => {
           
        },
        [deleteChartsLayout.rejected]: (state, action) => {
           
        },
    }
});



export const { setGateway } = chartsLayoutSlice.actions
export const ChartsLayoutReducer = chartsLayoutSlice.reducer;