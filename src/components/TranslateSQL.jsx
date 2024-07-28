import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getTranslateLanguageToSQL } from "../Openai/index.config";
import { EditorView, basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";

export const TranslateSQL = () => {
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const editorCreate = new EditorView({
      doc: response,
      extensions: [basicSetup, sql()],
      parent: editorRef.current,
    });
    setEditor(editorCreate);
    return () => {
      editorCreate.destroy();
    };
  }, [response]);

  const handleTranslateSQL = async () => {
    if (query != "") {
      setResponse("");
      setQuery("");
      let stream = await getTranslateLanguageToSQL(query);
      console.log("stream: ", stream);
      setResponse(stream.choices[0]?.message?.content || "");
    }
  };

  return (
    <VStack width={"100%"} height={"100%"} justifyContent={'center'} alignItems={'center'} mt={200}>
      <VStack spacing={5} mt={100} width={{base: "100%", md: "60%"}}>
        <Box>
          <Heading textAlign={'center'}>Traductor de Lenguaje natural a SQL</Heading>
        </Box>
        <Text>Ingresa tu consulta en lenguaje natural</Text>
        <Textarea
          id="editor"
          placeholder="Ejemplo: Muestrame todos los usuario con el nombre Fainner"
          cols={20}
          rows={7}
          onChange={(e) => setQuery(e.target.value)}
        ></Textarea>
        <Button
          onClick={handleTranslateSQL}
          bg={"#000000"}
          color={"#ffffff"}
          _hover={{ backgroundColor: "#000000" }}
        >
          Generar Consulta SQL
        </Button>
      </VStack>
      <VStack spacing={5} padding={20}>
        <Text>Consulta SQL generada</Text>
        <Box ref={editorRef} width={{base: "100%", md: 700}} height={{ base: "100%", md: 400}}></Box>
      </VStack>
    </VStack>
  );
};