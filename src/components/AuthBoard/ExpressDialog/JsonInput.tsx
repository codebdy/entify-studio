import { useTheme } from "@mui/material";
import MonacoEditor from "react-monaco-editor";

export const JsonInput = (props: {
  expression?: string;
  onChange: (expression: any) => void;
}) => {
  const { expression, onChange } = props;

  const theme = useTheme();

  const handleChange = (valueStr: string) => {
    onChange(valueStr);
  };

  const handleEditorDidMount = (monaco: any) => {
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  };

  return (
    <MonacoEditor
      language="json"
      theme={theme.palette.mode === "light" ? "vs" : "vs-dark"}
      value={expression||"{\n\n}"}
      editorDidMount={handleEditorDidMount}
      onChange={handleChange}
    />
  );
};
