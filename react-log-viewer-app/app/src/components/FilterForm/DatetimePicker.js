import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const DatetimePicker = (props) => {
    const [value, setValue] = useState(moment.now());

    useEffect(() => {
        switch (props.filterType) {
            case "start":
                setValue(moment.now());
                break;

            case "end":
                setValue(moment().add(30, "minute"));
                break;

            default:
                setValue(moment.now());
                break;
        }
    }, []);

    useEffect(() => {
        const date = moment(value).format("YYYY-MM-DDTHH:mm:ss");
        console.log("Value: ", date);
        props.setDateHandler(date);
    }, [value]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"koKR"}>
            <DateTimePicker
                value={value}
                onChange={handleChange}
                inputFormat={"YYYY-MM-DD HH:mm"}
                ampm={false}
                renderInput={(params) => <TextField {...params} sx={{ background: "#fff", borderRadius: "5px" }} size="small" />}
            />
        </LocalizationProvider>
    );
};

export default DatetimePicker;
