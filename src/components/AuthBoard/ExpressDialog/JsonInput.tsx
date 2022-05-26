import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";

export const JsonInput = (props: {
  value: any;
  onChange: (value: any) => void;
}) => {
  const { value, onChange } = props;

  const [valueString, setValueString] = useState(
    JSON.stringify(value || {}, null, 2)
  );
  const theme = useTheme();

  const handleChange = (valueStr: string) => {
    setValueString(valueStr);
  };

  useEffect(() => {
    setValueString(JSON.stringify(value, null, 2));
  }, [value]);

  const handleEditorDidMount = (monaco: any) => {
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  };

  return (
    <MonacoEditor
      language="json"
      theme={theme.palette.mode === "light" ? "vs" : "vs-dark"}
      value={valueString}
      editorDidMount={handleEditorDidMount}
      onChange={handleChange}
    />
  );
};
