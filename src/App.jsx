// dependencies
import { useState } from "react";
import "./App.css";
import useFormInput from "./hooks/useFormInput";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  // genAI API
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API
  );

  // simple reply state
  const [replies, setReply] = useState([]);

  // const simple reply state
  const { input, handleInputChange, handleFormReset } = useFormInput({
    simple_text_prompt: "",
  });


  async function run() {
    // show loader
    setLoaderImg(true);

    // add the search query in the state
    setReply((prevState) => [...prevState, input.simple_text_prompt]);

    // reset form
    handleFormReset();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // search query from the search form
    const prompt = input.simple_text_prompt;

    // Use streaming with text-only input
    const result = await model.generateContentStream(prompt);

    // streaming reply 
    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;

      setTempResponse({status: true, data: text});
    }

    setTempResponse({status: false, data: ''});

    // add the search result in the state
    setReply((prevState) => [...prevState, text]);

    // hide loader img
    setLoaderImg(false);
  }

  // loader image state
  const [loaderImg, setLoaderImg] = useState(false);

  // temp reponse state 
  const [tempResponse, setTempResponse] = useState({status: false, data: ''});

  return (
    <>
      <div className="container mt-2">
        <div className="ai_container border p-2 rounded">
          {/* <div className="ai_header">
            <ul className="list-inline">
              <li className="list-inline-item active">Simple Reply</li>
              <li className="list-inline-item">Image Reply</li>
              <li className="list-inline-item">Chat</li>
            </ul>
          </div> */}

          

          <div className="ai_reply_n_questions">
            <ul className="ai_reply_list">
              {replies.length > 0
                ? replies.map((item, index) => {
                    return (
                      <li key={index}>
                        <pre dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    );
                  })
                : ""}

                {tempResponse.status && <li>{tempResponse.data}</li>}

              {loaderImg && (
                <div className="loader_div mt-2">
                  <img
                    src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
                    className="loader_img"
                  />
                </div>
              )}
            </ul>
          </div>

          <div className="ai_body">
            <div className="mb-2">
              <input
                type="text"
                name="simple_text_prompt"
                className="form-control"
                placeholder="write your query..."
                value={input.simple_text_prompt}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2">
              <button className="btn btn-primary" onClick={run}>
                Get Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
