import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import TestCasesList from './listOfCases/TestCasesList';
import TestCaseDetail from './tetsCaseDetailedView/TestCaseDetail';
import CreateTestCase from './createTestCase/CreateTestCase';
import Header from './components/Header';
import TestSuitesList from './testSuites/list/listOftestSuites'
import TestSuiteDetails from "./testSuites/detailedView/TestSuiteDetails";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/testcases" element={<TestCasesList />} />
                        <Route path="/testcases/:id" element={<TestCaseDetail />} />
                        <Route path="/create" element={<CreateTestCase />} />
                        <Route path="/test-suites" element={<TestSuitesList/>} />
                        <Route path="/test-suite" element={<TestSuiteDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
