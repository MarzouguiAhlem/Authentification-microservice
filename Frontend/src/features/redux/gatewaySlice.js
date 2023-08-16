import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios';
import { data } from 'jquery';
import { useEffect, useState } from 'react';


//const url = "//localhost:5000";

function createData(id, gateway_name,ip_address, address, reference,sensors, enabled) {
    return {
        id,
        gateway_name,
        ip_address,
        address,
        reference,
        sensors,
        enabled,
        //sensors:[{id:3,type:'temperature'},{id:4,type:'humidity'}]

    };
}


export const getAllGateways = createAsyncThunk(
    "gateway/getAllGateways",
    async (thunkAPI) => {
        try {
            const resp = await axios.get(`http://localhost:5000/getGateways`
            , {
                headers: { 
                    'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    'Access-Control-Allow-Credentials' : 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                  },
            }
            );
            // console.log(resp.data);
                return resp.data;
            } catch (error) {
                console.log(error)
            }
    })
    export const getGateway = createAsyncThunk(
        "gateway/getGateway",
        async (gateway_id , thunkAPI) => {
            try {
                const resp = await axios.get(`http://localhost:5000/getGateway/${gateway_id}`
                , {
                    headers: { 
                        'Access-Control-Allow-Origin' : 'http://localhost:3000',
                        'Access-Control-Allow-Credentials' : 'true',
                        'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                        'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                      },
                }
                );
                // console.log(resp.data);
                    return resp.data;
                } catch (error) {
                    console.log(error)
                }
        })    

export const addGateway = createAsyncThunk(
    "gateway/addGateway",
    async (gateway, thunkAPI) => {

        try {
            console.log(gateway);
            const resp = await axios.post(`http://localhost:5000/addGateway`, gateway
            // , {
            //     headers: { 
            //         'Access-Control-Allow-Origin' : 'http://localhost:3000',
            //         'Access-Control-Allow-Credentials' : 'true',
            //         'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            //         'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
            //       },
            // }
            );
            
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
)



export const updateGateway = createAsyncThunk(
    "gateway/updateGateway",
    async (gateway, thunkAPI) => {
        try {
            console.log();
            const resp = await axios.put(`http://localhost:5000/updateGateway/${gateway.gateway_id}`, gateway
            , {
                headers: { 
                    'Content-Type': 'application/json'
                    // 'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    // 'Access-Control-Allow-Credentials' : 'true',
                    // 'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS , PUT',
                    // 'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                  },
            }
            );
            console.log(resp.data);
            return resp.data ;
            
        } catch (error) {
            console.log(error)
        }
    })
export const deleteGateway = createAsyncThunk(
    "gateway/deleteGateway",
    async (gateway_id, thunkAPI) => {
        try {
            const resp = await axios.delete(`http://localhost:5000/deleteGateway/${gateway_id}`, {
                headers: { 
                    'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    'Access-Control-Allow-Credentials' : 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                  },
            });
            return resp.data

        } catch (error) {
            console.log(error)
        }
    })

const gatewaySlice = createSlice({
    name: "gateway",
    initialState: {
        gateways: [],
        gatewayToEdit: {}
    },
    reducers: {
        setGatewayToEdit: (state, action) => {

            state.gatewayToEdit = action.payload

        }
    },
    extraReducers: {
        [getAllGateways.pending]: (state, action) => {

        },
        [getAllGateways.fulfilled]: (state, action) => {
            state.gateways = action.payload;
        },
        [getAllGateways.rejected]: (state, action) => {
          
        },
        [addGateway.pending]: (state, action) => {

        },
        [addGateway.fulfilled]: (state, action) => {
           
        },
        [addGateway.rejected]: (state, action) => {
           
        },
        [deleteGateway.fulfilled]: (state, action) => {
            if (!Array.isArray(state.gateways)) {
                state.gateways = [state.gateways];
              }
            // Call the filter method on the array
            state.gateways = state.gateways.filter((gateway) => gateway.id !== action.payload.id);
            //state.gateways = updatedGateways
          
        },
        [updateGateway.pending]: (state, action) => {
           
        },
        [updateGateway.fulfilled]: (state, action) => {
           
        },
        [updateGateway.rejected]: (state, action) => {
           
        },
        

    }
});
export const { setGatewayToEdit } = gatewaySlice.actions
export default gatewaySlice.reducer;