import { _getQuestions,
    _getUsers, 
    _saveQuestion,
    // _saveQuestionAnswer 
} from "./_DATA";

export function getInitialData() {
    return Promise.all([
        _getUsers(), 
        _getQuestions()
    ]).then(([users, questions]) => {

        // console.log(questions);

        // console.log(Object.values(questions).sort((a,b)=>{
        //     return a.timestamp - b.timestamp;
        // }));

        
       
        return {
            users,
            questions
        }
    })
}


export function saveQuestion(question) {
    // console.log("question from api", question);
    return Promise.all([
        _saveQuestion(question)
    ]).then((res) => {
        // console.log("response", res);
    }).catch(()=>{
        alert("Error saving question. Please try again!");
    })
}