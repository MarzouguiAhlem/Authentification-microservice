import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice' ;
import appReducer from './appSlice' ;
import adminDashboardReducer from './adminDashboardSlice';
import GovernorateReducer from './governorateSlice';
import GatewayReducer from './gatewaySlice';
import LocalityReducer from './localitySlice';
import {ChartsLayoutReducer} from './chartsLayoutSlice';
import SensorReducer from './sensorValueSlice';
import { tempReducer } from './tempSlice';
import {humReducer} from './humSlice'
import {soilMoistureReducer} from './SoilMoistureSlice'

export const store = configureStore({
    reducer :{
        user : userReducer,
        app : appReducer,
        adminDashboard : adminDashboardReducer,
        gateway : GatewayReducer,
        sensor : SensorReducer ,
        temp : tempReducer,
        hum: humReducer,
        SoilMoisture : soilMoistureReducer,
        governorate : GovernorateReducer,
        locality : LocalityReducer,
        chartsLayout : ChartsLayoutReducer
    },
})