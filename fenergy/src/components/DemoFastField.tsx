import { FastField } from "formik";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { DateField, type DateFieldProps } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
type FFFieldProps = TextFieldProps & { name: string };
type FFDateField = DateFieldProps & { name: string };

export function FFTextField({ name, helperText, ...props }: FFFieldProps) {
  return (
    <FastField name={name}>
      {({ field, meta }: any) => (
        <TextField
          {...field}
          {...props}
          error={Boolean(meta.touched && meta.error)}
          helperText={
            meta.touched && meta.error ? meta.error : (helperText ?? " ")
          }
        />
      )}
    </FastField>
  );
}

export function FFDateField({ name, helperText, ...props }: FFDateField) {
  return (
    <FastField name={name}>
      {({ field, meta, form }: any) => {
        const value = field.value ? dayjs(field.value) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              {...props}
              value={value}
              onChange={(newValue) => {
                // salva in formik come "YYYY-MM-DD" (o null)
                form.setFieldValue(
                  name,
                  newValue ? newValue.format("YYYY-MM-DD") : null
                );
              }}
              onBlur={() => form.setFieldTouched(name, true)}
              slotProps={{
                textField: {
                  error: Boolean(meta.touched && meta.error),
                  helperText:
                    meta.touched && meta.error
                      ? meta.error
                      : (helperText ?? " "),
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    </FastField>
  );
}
