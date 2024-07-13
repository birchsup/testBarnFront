import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TestCaseDetail.css';

const TestCaseDetail = () => {
    const { id } = useParams();
    const [testCase, setTestCase] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/testcases/${id}`)
            .then(response => response.json())
            .then(data => setTestCase(data))
            .catch(error => console.error('Error fetching test case:', error));
    }, [id]);

    if (!testCase) {
        return <p>Loading...</p>;
    }

    const preconditions = testCase.test.preconditions ? testCase.test.preconditions : 'NONE';
    const isAutomated = testCase.test.is_automated ? 'Yes' : 'No';

    return (
        <div className="test-case-container">
            <div className="test-case-detail">
                <h1 className="test-case-title">{testCase.test.name}</h1>
                <div><strong>Preconditions:</strong> {preconditions}</div>
                <table className="test-case-table">
                    <thead>
                    <tr>
                        <th>Step Number</th>
                        <th>Action</th>
                        <th>Expected Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {testCase.test.steps.map(step => (
                        <tr key={step.step}>
                            <td>{step.step}</td>
                            <td>{step.action}</td>
                            <td>{step.expected_result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="test-case-meta">
                <div className="meta-item"><strong>Created by:</strong> {testCase.test.created_by}</div>
                <div className="meta-item"><strong>Created at:</strong> {testCase.test.created_at}</div>
                <div className="meta-item"><strong>Is automated:</strong> {isAutomated}</div>
                <div className="meta-item"><strong>Test suite title:</strong> {testCase.test.test_suite_title}</div>
                <div className="meta-item"><strong>Priority:</strong> {testCase.test.priority}</div>
                <div className="meta-item"><strong>Status:</strong> {testCase.test.status}</div>
                <div className="meta-item"><strong>Tags:</strong> {testCase.test.tags}</div>
                <div className="meta-item"><strong>Estimated Time:</strong> {testCase.test.estimated_time}</div>
                <div className="meta-item"><strong>Actual Time:</strong> {testCase.test.actual_time}</div>
                <div className="meta-item"><strong>Assigned to:</strong> {testCase.test.assigned_to}</div>
                <div className="meta-item"><strong>Last Updated:</strong> {testCase.test.last_updated}</div>
            </div>
        </div>
    );
};

export default TestCaseDetail;
