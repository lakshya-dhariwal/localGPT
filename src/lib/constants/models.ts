import { IModel } from "@src/types";

export const MODELS: IModel[] = [
  {
    requiredRAM: "7",
    name: "Mistral 7B",
    id: "Llama-7B",
    description:
      "The Mistral-7B-v0.1 Large Language Model (LLM) is a pretrained generative text model with 7 billion parameters. Mistral-7B-v0.1 outperforms Llama 2 13B on all benchmarks we tested.",
    downloadURL:
      "https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF/resolve/main/mistral-7b-v0.1.Q4_K_M.gguf",
    fileSize: "7",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AMeta-Logo.png&psig=AOvVaw1lvBV3uEI20GHYpi7Mki2G&ust=1694033895184000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCID6y7aulIEDFQAAAAAdAAAAABAJ",
  },
  {
    requiredRAM: "7",
    name: "Llama 7B",
    id: "Llama-7B",
    description:
      "The Llama 7B model is a large language model (LLM) developed by Meta AI. It has 7 billion parameters, which is smaller than other LLMs such as GPT-3, but it is still capable of generating text, translating languages, writing different kinds of creative content, and answering your questions in an informative way.",
    downloadURL:
      "https://huggingface.co/TheBloke/Llama-2-7B-GGML/resolve/main/llama-2-7b.ggmlv3.q4_1.bin",
    fileSize: "4",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AMeta-Logo.png&psig=AOvVaw1lvBV3uEI20GHYpi7Mki2G&ust=1694033895184000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCID6y7aulIEDFQAAAAAdAAAAABAJ",
  },
  {
    requiredRAM: "13",
    name: "Llama 13B",
    id: "Llama-13B",
    description:
      "The Llama 13B model is a large language model (LLM) developed by Meta AI. It has 7 billion parameters, which is smaller than other LLMs such as GPT-3, but it is still capable of generating text, translating languages, writing different kinds of creative content, and answering your questions in an informative way.",
    downloadURL:
      "https://huggingface.co/TheBloke/Llama-2-7B-GGML/resolve/main/llama-2-7b.ggmlv3.q4_1.bin",
    fileSize: "4",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AMeta-Logo.png&psig=AOvVaw1lvBV3uEI20GHYpi7Mki2G&ust=1694033895184000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCID6y7aulIEDFQAAAAAdAAAAABAJ",
  },
  {
    requiredRAM: "6",
    name: "Liberty",
    id: "liberty",
    description:
      "Liberty is known for being very direct and unreserved. She answers questions honestly without judging your question. Her capabilities are very similar to ChatGPT 3 without censorship. Because this model runs locally on your computer for best performance we recommend closing other windows and applications while using.",
    downloadURL:
      "https://huggingface.co/TheBloke/Luna-AI-Llama2-Uncensored-GGML/resolve/main/luna-ai-llama2-uncensored.ggmlv3.q5_1.bin",
    fileSize: "4",
    image:
      "https://firebasestorage.googleapis.com/v0/b/freedom-gpt.appspot.com/o/000freedomgpt_models%2Fliberty.png?alt=media&token=03541774-0e50-4626-88dd-08a66092ad4e",
  },
  {
    description:
      "Scarlett is an AI designed with emotional intelligence to help you with various tasks such as answering questions, providing recommendations, philosophical discussions, personal relationships and helping with decision making.",
    requiredRAM: "6",
    name: "Scarlett",
    fileSize: "4",
    downloadURL:
      "https://huggingface.co/TheBloke/Scarlett-7B-GGML/resolve/main/scarlett-7b.ggmlv3.q5_1.bin",

    id: "scarlett",
    image:
      "https://firebasestorage.googleapis.com/v0/b/freedom-gpt.appspot.com/o/000freedomgpt_models%2Fscarlet.png?alt=media&token=dace8ba3-bf88-43d8-8ceb-6f379e42c1df",
  },
];
