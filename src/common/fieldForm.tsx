import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

interface Props {
  liveValue: string;
  onSubmit(value: string): void;
}

export function FieldForm(props: Props) {
  const [value, setValue] = useState<string | undefined>();
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (value) {
      props.onSubmit(value);
      setValue(undefined);
    }
  }, [props.onSubmit, value]);
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === props.liveValue) {
      setValue(undefined);
    } else {
      setValue(e.currentTarget.value);
    }
  }, [])
  return <form onSubmit={handleSubmit}>
    <input value={value === undefined ? props.liveValue : value} onChange={handleInputChange} />
    <button type="submit" disabled={value === undefined}>Save</button>
  </form>
}