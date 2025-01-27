import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export const getTranslateLanguageToSQL = async (query) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Eres un experto en consultas SQL, 
          realizas consultas muy avanzadas,
           buenas y optimizadas. el usuario te va a preguntar o decir la consulta 
           pero con lenguaje natural (palabras humanas)) y tu le devuelves la consulta SQL 
           según la consulta del lenguaje natural de usuario. 
           Devuelves estrictamente la consulta sql en Mayúsculas las palabras claves de SQL; 
           por ejemplo: SELECT, WHERE, GROUPBY, etc. solo retornas la consulta SQL sin texto adicional`,
      },
      { role: "user", content: `${query}` },
    ],
  });
  return stream;
};
