import React, { createContext, useEffect, useState } from 'react';
import HomePage from './pages/home/HomePage';
import NavBar from './components/nav-bar/NavBar';
import { Route, Routes,Navigate } from 'react-router-dom';
// import SingleCoursePage from './pages/single-course-page/SingleCoursePage';
import PageNotFound from './components/page-not-found/PageNotFound';
import Footer from './components/footer/Footer';
import CoursesPage from './components/Course-Page/CoursesPage';
import Login from './components/Login/login';
import Signup from './components/Login/signup';
import Leaderboard from './components/leaderboard/leaderboard';
import Quiz from './components/quiz/Quiz';
import PreQuizForm from './components/PreQuiz/PreQuiz';
import Compiler from './components/compiler/complier';
import EditorPage from './components/Editor/EditorPage';
import About from './components/About/About';


export const Data = createContext();
export const FetchState = createContext();
export const SearchTermContext = createContext();
export const SetSearchTermContext = createContext();

const App = () => {
    const [coursesData, setCoursesData] = useState({});
    const [fetched, setAsFetched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const getData = () => {
            fetch('https://api.npoint.io/97d7e0d71e507947a59f')
                .then((response) => response.json())
                .then((jsonFile) => {
                    setCoursesData(jsonFile['data']);
                    setAsFetched(true);
                });
        };
        getData();
    }, []);
    return (
        <div className='App'>
            <Data.Provider value={coursesData}>
                <FetchState.Provider value={fetched}>
                    <SearchTermContext.Provider value={searchTerm}>
                        <SetSearchTermContext.Provider value={setSearchTerm}>
                            <NavBar />
                            <Routes>
                            <Route exact path="/" element={<Navigate replace to="/homepage" />} />
                                <Route path='/HomePage' element={<HomePage />} />
                                
                                <Route path='/courses' element={<CoursesPage />} />

                                <Route path="/login" element={<Login/>} />
                                
                                <Route path="/signup" element={<Signup/>} />

                                <Route path="/leaderboard" element={<Leaderboard />} />

                                <Route path="/quiz" element={<Quiz/>} />

                                <Route path="/PreQuiz" element={<PreQuizForm/>} />

                                <Route path="/compiler" element={<Compiler/>} />

                                <Route path="/EditorPage" element={<EditorPage/>} />

                                <Route path="/About" element={<About/>} />

                                <Route path='*' element={<PageNotFound />} />
                            </Routes>
                            <Footer />
                        </SetSearchTermContext.Provider>
                    </SearchTermContext.Provider>
                </FetchState.Provider>
            </Data.Provider>
        </div>
    );
};

export default App;