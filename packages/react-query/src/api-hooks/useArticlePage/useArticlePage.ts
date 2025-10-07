import { useQuery } from "@tanstack/react-query";

const article = [
  {
    sentence: [
      { word: "Ich", translation: "I" },
      {
        word: "ziehe",
        translation: "change my clothes / change myself",
        insight: "reflexive verb - sich umziehen: *to change clothes*",
      },
      { word: "mich", refIndex: 1 },
      { word: "um", refIndex: 1 },
      { word: ",", punctuationMark: true },
      { word: "weil", translation: "because" },
      { word: "ich", translation: "I" },
      { word: "gleich", translation: "soon / in a moment / shortly" },
      {
        word: "ins",
        translation: "in the",
        insight: "Short form for *in das*",
      },
      { word: "Fitnessstudio", translation: "gym" },
      {
        word: "gehe",
        translation: "go",
        insight: "infinitive - **gehen**: *to go* ",
      },
      { word: ".", punctuationMark: true },
    ],
    translation:
      "I’m changing clothes because I’m going to the gym in a moment.",
    insight: "this is the insight of the sentence.",
    illustration: "sd",
  },
  {
    sentence: [
      { word: "Kannst", translation: "can", insight: "Modal verb - *Können*" },
      { word: "du", translation: "you" },
      { word: "bitte", translation: "please" },
      {
        word: "auf",
        expression: "warten auf",
        translation: "waiting for",
        insight: "Infinitive mit artikle - **warten auf**: *wait for*",
      },
      { word: "mich", translation: "me" },
      { word: "warten", refIndex: 3 },
    ],
    translation: "Can you please wait for me",
    sentenceBaloonDirection: "left",
    sentenceBaloonType: "speech",
    character: "Emma",
    avatar: "",
    expression: "talk",
  },
  {
    sentence: [
      { word: "Okay", translation: "Ok" },
      { word: ",", punctuationMark: true },
      { word: "beeil", expression: "beeilen", translation: "to hurry" },
      { word: "dich", translation: "you" },
      { word: "!", punctuationMark: true },
    ],
    translation: "Ok, hurry up",
    sentenceBaloonDirection: "right",
    sentenceBaloonType: "speech",
    character: "Theo",
    avatar: "",
    expression: "smile",
  },
  {
    sentence: [
      { word: "Wo", translation: "Where" },
      { word: "sind", translation: "are" },

      { word: "meine", translation: "my" },
      { word: "Sportklamotten", translation: "gym clothes / sportswear" },
      { word: ".", punctuationMark: true },
    ],
    translation: "Where are my workout clothes",
    sentenceBaloonDirection: "left",
    sentenceBaloonType: "thought",
    character: "Emma",
    avatar: "",
    expression: "think",
  },
  {
    sentence: [
      { word: "Sie", translation: "Then" },
      { word: "sind", translation: "are" },
      { word: "beide", translation: "both" },
      { word: "zusammen", translation: "together" },
      { word: "ins", translation: "in the", insight: "in das" },
      { word: "Fitnessstudio", translation: "gym" },
      { word: "gegangen", ranslation: "to go / went", insight: "gehen" },
      { word: ".", punctuationMark: true },
    ],
    translation: "They both went to the gym together",
  },
  {
    sentence: [
      { word: "Wo", translation: "Where" },
      { word: "sind", translation: "are" },
      { word: "meine", translation: "my" },
      { word: "Sportklamotten", translation: "gym clothes / sportswear" },
      { word: ".", punctuationMark: true },
    ],
    translation: "Where are my workout clothes",
    sentenceBaloonDirection: "right",
    sentenceBaloonType: "thought",
    character: "Theo",
    avatar: "",
    expression: "think",
  },
];

const fetchArticlePage = async () => {
  return article;
};

export const useArticlePage = () => {
  return useQuery({
    queryKey: ["articlePage"],
    queryFn: fetchArticlePage,
  });
};
