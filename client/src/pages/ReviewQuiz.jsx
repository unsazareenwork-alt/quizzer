import Navbar from "../components/Navbar";
import "../styles/PlayQuiz.css";

export default function ReviewQuiz() {

    const questions = JSON.parse(
        localStorage.getItem("reviewQuiz")
    ) || [];

    const title =
        localStorage.getItem("reviewTitle");

    return (
        <>
            <Navbar />

            <div className="playquiz-page">

                <div className="quiz-top">

                    <div className="subject-tag">
                        📄 {title}
                    </div>

                </div>

                {questions.map((q, index) => (

                    <div
                        className="quiz-card"
                        key={index}
                        style={{marginBottom:"30px"}}
                    >

                        <div className="question-title">

                            <div className="question-number">
                                Q{index+1}
                            </div>

                            <h2>{q.question}</h2>

                        </div>

                        <div className="options">

                            {q.options.map((option,i)=>{

                                let className="option-card";

                                if(option===q.correctAnswer)
                                    className+=" correct";

                                if(
                                    option===q.selectedAnswer &&
                                    option!==q.correctAnswer
                                )
                                    className+=" wrong";

                                return(

                                    <div
                                        key={i}
                                        className={className}
                                    >

                                        <div className="option-letter">
                                            {String.fromCharCode(65+i)}
                                        </div>

                                        <span>{option}</span>

                                    </div>

                                );

                            })}

                        </div>

                        <div className="explanation-box">

                            <h3>Explanation</h3>

                            <p>{q.explanation}</p>

                        </div>

                    </div>

                ))}

            </div>

        </>
    );
}