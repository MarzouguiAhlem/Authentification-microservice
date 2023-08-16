import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import LineChart from "./LineChart";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import {
  addChartsLayout,
  deleteChartsLayout,
  getChartsLayout,
  getAvailableDates,
} from "../features/redux/chartsLayoutSlice";
import { getTempData } from "../features/redux/tempSlice";
import { getHumidityData } from "../features/redux/humSlice";
import { getMoistureData } from "../features/redux/SoilMoistureSlice";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const dataToVisualizeList = [
  { id: 1, name: "Temperature" },
  { id: 2, name: "Humidity" },
  { id: 3, name: "Soil Moisture" },
];
const graphTypes = [
  { id: 1, name: "Pie" },
  { id: 2, name: "Area" },
  { id: 3, name: "Bar" },
];

const timeChoices = [
  { id: 1, choice: "specific day" },
  { id: 2, choice: "specific month" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const itemData = {
  labels: ["Jan", "Feb", "Mar", "April", "May"],
  datasets: [
    {
      fill: true,
      label: "Sales 2020 (M)",
      data: [3, 2, 2, 1, 4],
      borderColor: ["rgba(255, 206, 86, 0.2)"],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      pointBackgroundColor: "rgba(255, 206, 86, 0.2)",
      pointBorderColor: "rgba(255, 206, 86, 0.2)",
    },
    {
      fill: true,
      label: "Sales 2019 (M)",
      data: [1, 3, 2, 2, 3],
      borderColor: ["rgba(54, 162, 235, 0.2)"],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
      pointBorderColor: "rgba(54, 162, 235, 0.2)",
    },
  ],
};

const Dashboard = () => {
  const { chartsLayout, loading, gateway, availableDates, sensorData } =
    useSelector((state) => state.chartsLayout);

  const [newCounter, setNewCounter] = useState(0);
  const [graphTypeId, setGraphTypeId] = useState("");
  const [date, setDate] = useState("");
  const [dataToVisualize, setDataToVisualize] = useState("");

  const [breakpoint, setBreakpoint] = useState(0);
  const [cols, setCols] = useState(0);
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const userGatewayIds = { userId: 1, gatewayId: gateway.id };

  React.useEffect(() => {
    dispatch(getChartsLayout(userGatewayIds));
  }, []);

  // React.useEffect(() => {
  //   if (loading === false)
  //     if (chartsLayout.length === 0) {
       
  //       // setItems([ { i: 0, x: 0, y: Infinity, w: 2, h: 2, graphTypeId: 1, data: itemData, gateway_id: gateway.id, user_id: userGatewayIds.userId },
  //       //   { i: 1, x: 2, y: Infinity, w: 2, h: 2, graphTypeId: 2, data: itemData, gateway_id: gateway.id, user_id: userGatewayIds.userId }]);
  //       setNewCounter(0);
  //     } else {
  //       setItems(chartsLayout);
  //       setNewCounter(Math.max(...chartsLayout.map((c) => c.i)) + 1);
  //     }
  // }, [gateway, loading]);

  const getTemperatureSensorData = (sensorId, date) => {
    const data = { sensorId: sensorId, date: date };
    dispatch(getTempData(data));
  };

  const getHumiditySensorData = (sensorId, date) => {
    const data = { sensorId: sensorId, date: date };

    dispatch(getHumidityData(data));
  };

  const handleSaveDashboard = () => {
    const layouts = { items: items };

    dispatch(deleteChartsLayout(userGatewayIds));

    dispatch(addChartsLayout(layouts));
  };

  const defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 4, sm: 3, xs: 2, xxs: 1 },
    rowHeight: 200,
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const itemData = {
      labels: ["Jan", "Feb", "Mar", "April", "May"],
      datasets: [
        {
          label: "Sales 2020 (M)",
          data: [3, 2, 2, 1, 4],
          borderColor: ["rgba(255, 206, 86, 0.2)"],
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          pointBackgroundColor: "rgba(255, 206, 86, 0.2)",
          pointBorderColor: "rgba(255, 206, 86, 0.2)",
        },
        {
          label: "Sales 2019 (M)",
          data: [1, 3, 2, 2, 3],
          borderColor: ["rgba(54, 162, 235, 0.2)"],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
          pointBorderColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };

    const chartType = () => {
      switch (el.graphTypeId) {
        case 1:
          return <PieChart chartData={el.data} />;
        case 2:
          return <LineChart chartData={el.data} />;
        case 3:
          return <BarChart chartData={el.data} />;
      }
    };

    return (
      <div key={el.i} data-grid={el}>
        {chartType()}
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(el.i)}
        >
          x
        </span>
      </div>
    );
  };

  const onAddItem = () => {
    const itemData = {
      labels: sensorData.map((item) => {
        return item.date;
      }),
      datasets: [
        {
          fill: true,
          label: sensorData[0].date + " ( " + sensorData[0].sensor_name + " )",
          data: sensorData.map((item) => {
            return item.value;
          }),
          borderColor: ["rgba(30, 129, 176, 0.7)"],
          backgroundColor: ["rgba(30, 129, 176, 0.7)"],
          pointBackgroundColor: "rgba(30, 129, 176, 0.7)",
          pointBorderColor: "rgba(30, 129, 176, 0.7)",
        },
      ],
    };

    setItems(
      items.concat({
        i: newCounter,
        x: (items.length * 2) % (cols || 12),
        y: Infinity,
        w: 2,
        h: 2,
        graphTypeId: graphTypeId,
        data: itemData,
        gateway_id: gateway.id,
        user_id: userGatewayIds.userId,
        dataToVisualize: dataToVisualize,
        date: date,
      })
    );

    setNewCounter(newCounter + 1);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  };

  const onLayoutChange = (layout, layouts) => {
    const newState = items.map((item) => {
      let t;
      for (var l in layout) {
        if (item.i === parseInt(layout[l].i)) {
          t = {
            ...item,
            x: layout[l].x,
            y: layout[l].y,
            w: layout[l].w,
            h: layout[l].h,
          };
          break;
        }
      }

      return t;
    });

    setItems(newState);
  };

  const onRemoveItem = (i) => {
    setItems(_.reject(items, { i: i }));
  };
  const setDataToVisualizeAndDate = (e) => {
    setDataToVisualize(e);
    dispatch(getAvailableDates(e));
  };
  const setDateAndGetSensorValues = (e) => {
    setDate(e);
    let sensors = [];
    switch (dataToVisualize) {
      case 1:
        sensors = gateway.sensors.filter((sensor) => {
          return sensor.type === "temperature";
        });
        getTemperatureSensorData(sensors[0].id, e);

        break;
      case 2:
        sensors = gateway.sensors.filter((sensor) => {
          return sensor.type === "humidity";
        });
        getHumiditySensorData(sensors[0].id, e);
        break;
    }
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <FormControl required style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Graph Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            style={{ marginBottom: 15 }}
            name="graphType"
            value={graphTypeId}
            fullWidth
            label="Graph Type"
            onChange={(e) => setGraphTypeId(e.target.value)}
          >
            {graphTypes.map((graphType) => (
              <MenuItem key={graphType.id} value={graphType.id}>
                {graphType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Data To Visualize
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            style={{ marginBottom: 15 }}
            name="dataToVisualize"
            value={dataToVisualize}
            fullWidth
            label="Data To Visualize"
            onChange={(e) => setDataToVisualizeAndDate(e.target.value)}
          >
            {dataToVisualizeList.map((dataToVisualize) => (
              <MenuItem key={dataToVisualize.id} value={dataToVisualize.id}>
                {dataToVisualize.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl required style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            style={{ marginBottom: 15 }}
            name="Date"
            value={date}
            fullWidth
            label="Date"
            onChange={(e) => setDateAndGetSensorValues(e.target.value)}
          >
            {availableDates.map((availableDate) => (
              <MenuItem key={availableDate.date} value={availableDate.date}>
                {availableDate.date}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Button
          color="primary"
          size="large"
          onClick={() => onAddItem()}
          variant="contained"
        >
          Add Graph
        </Button>
        <Button
          color="primary"
          fullWidth
          size="large"
          onClick={() => handleSaveDashboard()}
          variant="contained"
        >
          Save Dashboard
        </Button>
      </div>
      <ResponsiveReactGridLayout
        className="layout"
        onBreakpointChange={() => onBreakpointChange()}
        layouts={{ lg: items }}
        onLayoutChange={(layout, layouts, i) => onLayoutChange(layout, layouts)}
        {...defaultProps}
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Dashboard;
