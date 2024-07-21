import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TestSuiteDetails.css';

const TestSuiteDetails = () => {
    const [testSuite, setTestSuite] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [allTestCases, setAllTestCases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newTestCaseName, setNewTestCaseName] = useState('');

    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id');

    const fetchTestSuiteDetails = () => {
        fetch(`http://localhost:8080/test-suite?id=${id}`)
            .then(response => response.json())
            .then(data => setTestSuite(data))
            .catch(error => console.error('Error fetching test suite details:', error));
    };

    useEffect(() => {
        fetchTestSuiteDetails();
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/testcases`)
            .then(response => response.json())
            .then(data => setAllTestCases(data))
            .catch(error => console.error('Error fetching all test cases:', error));
    }, []);

    const handleDeleteTestCase = (suiteId, caseId) => {
        fetch(`http://localhost:8080/test-suite/remove-case?suite_id=${suiteId}&case_id=${caseId}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchTestSuiteDetails(); // Refresh test suite details after deletion
            })
            .catch(error => console.error('Error deleting test case:', error));
    };

    const handleAddTestCase = (suiteId, caseId) => {
        fetch(`http://localhost:8080/test-suites/add-cases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ suite_id: suiteId, case_ids: [caseId] })
        })
            .then(() => {
                fetchTestSuiteDetails(); // Refresh test suite details after adding test case
            })
            .catch(error => console.error('Error adding test case:', error));
    };

    const handleCreateAndAddTestCase = (suiteId, testCaseName) => {
        fetch(`http://localhost:8080/testcases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                test: {
                    name: testCaseName,
                    preconditions: "",
                    priority: "",
                    isAutomated: false,
                    steps: [],
                    created_by: "",
                    created_at: new Date().toISOString().split('T')[0]
                }
            })
        })
            .then(response => response.json())
            .then(newTestCase => {
                handleAddTestCase(suiteId, newTestCase.id);
            })
            .catch(error => console.error('Error creating test case:', error));
    };

    if (!testSuite) {
        return <p>Loading...</p>;
    }

    const filteredTestCases = allTestCases.filter(testCase =>
        testCase.test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="test-suite-details-container">
            <h1>{testSuite.name}</h1>
            <p>{testSuite.description}</p>
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Done' : 'Edit'}
            </button>
            <table className="test-cases-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {editMode && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {testSuite.test_cases.map(testCase => (
                    <tr key={testCase.id}>
                        <td>{testCase.id}</td>
                        <td>{testCase.test.name}</td>
                        {editMode && (
                            <td>
                                <button onClick={() => handleDeleteTestCase(testSuite.id, testCase.id)}>
                                    Delete
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                {editMode && (
                    <tr>
                        <td colSpan="3">
                            <input
                                type="text"
                                placeholder="Search or create new test case"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <ul>
                                {filteredTestCases.map(testCase => (
                                    <li key={testCase.id}>
                                        {testCase.test.name}
                                        <button onClick={() => handleAddTestCase(testSuite.id, testCase.id)}>
                                            Add
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {searchQuery && filteredTestCases.length === 0 && (
                                <button onClick={() => handleCreateAndAddTestCase(testSuite.id, searchQuery)}>
                                    Create and Add New Test Case
                                </button>
                            )}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TestSuiteDetails;
